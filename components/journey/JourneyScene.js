import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Billboard, Grid, Html, Line, OrbitControls, Sparkles, Stars, Text } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { JOURNEY_ERAS, JOURNEY_REGIONS } from '@/_mocks_/_journey_items_';

const GROUND_Y = -6;
const CAMERA_OFFSET = new THREE.Vector3(9, 5, 13);
const REGION_WIDTH = 22;

export function getStopPositions(stops) {
  const stepZ = stops.length > 80 ? 3 : 7;
  return stops.map((stop, i) => {
    const region = JOURNEY_REGIONS[stop.region] || JOURNEY_REGIONS.suisse;
    return new THREE.Vector3(
      region.x + Math.sin(i * 1.3) * 3.5,
      1 + Math.sin(i * 0.55) * 2.2,
      -i * stepZ
    );
  });
}

function eraColor(stop) {
  return JOURNEY_ERAS[stop.era]?.color || '#ffffff';
}

/** Applique l’exposition du thème au renderer. */
function RendererSettings({ exposure }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure ?? 1;
  }, [gl, exposure]);
  return null;
}

function CameraRig({ target }) {
  const { camera, controls } = useThree();
  const desiredTarget = useRef(new THREE.Vector3());
  const desiredPosition = useRef(new THREE.Vector3());
  const flying = useRef(false);

  useEffect(() => {
    desiredTarget.current.copy(target);
    desiredPosition.current.copy(target).add(CAMERA_OFFSET);
    flying.current = true;
  }, [target]);

  useEffect(() => {
    if (!controls) return undefined;
    const stopFlying = () => { flying.current = false; };
    controls.addEventListener('start', stopFlying);
    return () => controls.removeEventListener('start', stopFlying);
  }, [controls]);

  useFrame((_, delta) => {
    if (!flying.current || !controls) return;
    const k = 1 - Math.exp(-delta * 2.2);
    camera.position.lerp(desiredPosition.current, k);
    controls.target.lerp(desiredTarget.current, k);
    controls.update();
    if (camera.position.distanceTo(desiredPosition.current) < 0.05) flying.current = false;
  });

  return null;
}

function JourneyPath({ curve, stops, activeIndex, theme }) {
  const samplesPerStop = 12;
  const { points, colors } = useMemo(() => {
    const total = (stops.length - 1) * samplesPerStop;
    const activeT = stops.length > 1 ? activeIndex / (stops.length - 1) : 0;
    const background = new THREE.Color(theme.background);
    const pathActive = new THREE.Color(theme.scene.pathLine);
    const pathFuture = new THREE.Color(theme.scene.pathLineFuture || theme.scene.pathLine);
    const pts = [];
    const cols = [];
    for (let s = 0; s <= total; s++) {
      const t = s / total;
      pts.push(curve.getPoint(t));
      const future = t > activeT + 1e-6;
      const c = (future ? pathFuture : pathActive).clone();
      if (future && theme.scene.pathFutureMix > 0) c.lerp(background, theme.scene.pathFutureMix);
      cols.push(c);
    }
    return { points: pts, colors: cols };
  }, [curve, stops, activeIndex, theme]);

  const lineWidth = theme.scene.pathLineWidth ?? 2.5;
  const haloOpacity = theme.scene.pathHaloOpacity ?? 0;

  return (
    <group>
      {haloOpacity > 0 && (
        <Line
          points={points}
          color={theme.scene.pathHalo || theme.scene.pathLine}
          lineWidth={lineWidth * 3.2}
          transparent
          opacity={haloOpacity}
          depthWrite={false}
          toneMapped={false}
        />
      )}
      <Line points={points} vertexColors={colors} lineWidth={lineWidth} toneMapped={false} />
    </group>
  );
}

function Comet({ curve, stops, activeIndex, color }) {
  const ref = useRef();
  const glow = useRef();
  const progress = useRef(0);
  const end = stops.length > 1 ? activeIndex / (stops.length - 1) : 0;

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (end <= 0) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    progress.current += delta * 0.12;
    if (progress.current > end) progress.current = 0;
    ref.current.position.copy(curve.getPoint(progress.current));
    if (glow.current) glow.current.scale.setScalar(1.6 + Math.sin(progress.current * 40) * 0.15);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function StopNode({ stop, label, position, active, visited, onSelect, theme, showFloatingLabel = true, showYear = true }) {
  const [hovered, setHovered] = useState(false);
  const group = useRef();
  const ring = useRef();
  const halo = useRef();
  const color = eraColor(stop);
  const baseScale = stop.placeholder ? 0.55 : 1;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const pulse = active ? 1.3 + Math.sin(clock.elapsedTime * 3.2) * 0.08 : hovered ? 1.22 : 1;
    const s = THREE.MathUtils.lerp(group.current.scale.x, baseScale * pulse, 1 - Math.exp(-delta * 8));
    group.current.scale.setScalar(s);
    if (ring.current) {
      ring.current.rotation.x += delta * 0.7;
      ring.current.rotation.y += delta * 0.45;
    }
    if (halo.current) {
      const target = active ? 2.3 + Math.sin(clock.elapsedTime * 2) * 0.2 : hovered ? 1.9 : 0.001;
      const h = THREE.MathUtils.lerp(halo.current.scale.x, target, 1 - Math.exp(-delta * 6));
      halo.current.scale.setScalar(h);
    }
  });

  const boost = theme.scene.stopEmissiveBoost ?? 1;
  const intensity = (active ? 3.4 : visited ? 1.9 : stop.placeholder ? 0.5 : 1.1) * boost;
  const isLight = theme.mode === 'light';

  return (
    <group position={position}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect(stop.index); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Halo doux (actif / survol) */}
      <mesh ref={halo} scale={0.001}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isLight ? 0.16 : 0.22}
          depthWrite={false}
          toneMapped={false}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={intensity}
            roughness={0.3}
            metalness={0.25}
            toneMapped={false}
            wireframe={stop.placeholder && !active}
          />
        </mesh>
        {!stop.placeholder && (
          <mesh ref={ring}>
            <torusGeometry args={[1.05, 0.035, 10, 72]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={active ? 1 : visited ? 0.7 : 0.45} />
          </mesh>
        )}
      </group>

      {/* Fil vers le sol */}
      <mesh position={[0, (GROUND_Y - position.y) / 2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, Math.abs(GROUND_Y - position.y), 6]} />
        <meshBasicMaterial
          color={active ? color : theme.scene.pathLineFuture}
          toneMapped={false}
          transparent
          opacity={active ? 0.75 : stop.placeholder ? 0.08 : 0.2}
        />
      </mesh>

      {/* Disque au sol */}
      <mesh position={[0, GROUND_Y - position.y + 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[stop.placeholder ? 0.25 : 0.45, stop.placeholder ? 0.32 : 0.6, 40]} />
        <meshBasicMaterial color={color} toneMapped={false} transparent opacity={active ? 0.9 : visited ? 0.5 : 0.25} side={THREE.DoubleSide} />
      </mesh>

      {showYear && !stop.placeholder && !active && (
        <Billboard position={[0, -1.25, 0]} follow>
          <Text
            fontSize={0.5}
            letterSpacing={0.04}
            color={theme.scene.yearLabel}
            anchorX="center"
            anchorY="top"
            outlineWidth={0.04}
            outlineColor={theme.background}
            outlineOpacity={0.9}
            material-toneMapped={false}
            fillOpacity={visited ? 0.9 : 0.55}
          >
            {label.year}
          </Text>
        </Billboard>
      )}

      {showFloatingLabel && (hovered || active) && (
        <Html position={[0, 1.7, 0]} center distanceFactor={14} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              whiteSpace: 'nowrap',
              padding: '7px 14px',
              borderRadius: 999,
              border: `1px solid ${color}`,
              background: theme.scene.labelBg,
              color: theme.scene.labelText,
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              letterSpacing: 0.2,
              boxShadow: `0 8px 24px rgba(0,0,0,${isLight ? 0.18 : 0.5}), 0 0 16px ${color}55`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <strong style={{ color }}>{label.year}</strong>
            <span style={{ opacity: 0.5, margin: '0 8px' }}>·</span>
            {label.title}
          </div>
        </Html>
      )}
    </group>
  );
}

function RegionGround({ region, label, length, centerZ, theme }) {
  const labels = [];
  for (let z = 4; z > -length; z -= 60) labels.push(z);
  const labelColor = region.id === 'angola' ? theme.scene.regionLabelAngola : theme.scene.regionLabelSuisse;
  const outerX = region.x < 0 ? region.x - REGION_WIDTH / 2 : region.x + REGION_WIDTH / 2;

  return (
    <group>
      {/* Sol plein : donne de la profondeur et du contraste */}
      <mesh position={[region.x, GROUND_Y - 0.03, centerZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[REGION_WIDTH + 1.5, length + 2]} />
        <meshStandardMaterial
          color={theme.scene.ground}
          roughness={1}
          metalness={0}
          transparent
          opacity={theme.scene.groundOpacity ?? 1}
        />
      </mesh>

      <Grid
        position={[region.x, GROUND_Y, centerZ]}
        args={[REGION_WIDTH, length]}
        cellSize={1}
        cellThickness={0.55}
        cellColor={theme.scene.gridCell}
        sectionSize={5}
        sectionThickness={1.1}
        sectionColor={theme.scene.gridSection}
        fadeDistance={110}
        fadeStrength={1.4}
      />

      {/* Rail discret à la couleur de la région, en bordure extérieure */}
      <mesh position={[outerX, GROUND_Y + 0.02, centerZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.12, length]} />
        <meshBasicMaterial color={labelColor} transparent opacity={theme.mode === 'dark' ? 0.32 : 0.5} />
      </mesh>

      {labels.map((z) => (
        <Text
          key={z}
          position={[region.x, GROUND_Y + 0.05, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={3.2}
          letterSpacing={0.3}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.9}
          material-toneMapped={false}
        >
          {label.toUpperCase()}
        </Text>
      ))}
    </group>
  );
}

function Scene({ stops, labels, regionLabels, activeIndex, onSelect, theme, showFloatingLabels = true }) {
  const positions = useMemo(() => getStopPositions(stops), [stops]);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(positions.length > 1 ? positions : [positions[0], positions[0].clone()], false, 'catmullrom', 0.5),
    [positions]
  );
  const length = Math.abs(positions[positions.length - 1].z) + 30;
  const centerZ = -length / 2 + 15;
  const s = theme.scene;

  return (
    <>
      <RendererSettings exposure={s.exposure} />
      <color attach="background" args={[theme.background]} />
      <fog attach="fog" args={[theme.background, s.fogNear ?? 35, s.fogFar ?? 110]} />

      <hemisphereLight args={[s.hemiSky, s.hemiGround, s.hemiIntensity ?? 0.5]} />
      <ambientLight intensity={s.ambient} />
      <directionalLight position={[28, 42, 18]} intensity={s.directional ?? 0.4} color="#ffffff" />
      <pointLight
        position={positions[activeIndex].toArray()}
        intensity={s.pointLightIntensity ?? 60}
        distance={32}
        decay={2}
        color={eraColor(stops[activeIndex])}
      />

      {s.stars && <Stars radius={160} depth={60} count={5000} factor={4.5} saturation={0.4} fade speed={0.5} />}
      <Sparkles
        count={220}
        scale={[60, 18, length]}
        position={[0, 3, centerZ]}
        size={2.6}
        speed={0.3}
        color={s.sparkles}
        opacity={s.sparklesOpacity ?? 0.4}
      />

      {Object.values(JOURNEY_REGIONS).map((region) => (
        <RegionGround
          key={region.id}
          region={region}
          label={regionLabels[region.id]}
          length={length}
          centerZ={centerZ}
          theme={theme}
        />
      ))}

      <JourneyPath curve={curve} stops={stops} activeIndex={activeIndex} theme={theme} />
      <Comet curve={curve} stops={stops} activeIndex={activeIndex} color={s.comet || s.pathLine} />

      {stops.map((stop, i) => (
        <StopNode
          key={stop.id}
          stop={stop}
          label={labels[i]}
          position={positions[i]}
          active={i === activeIndex}
          visited={i < activeIndex}
          onSelect={onSelect}
          theme={theme}
          showFloatingLabel={showFloatingLabels}
          showYear={showFloatingLabels}
        />
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={90}
        maxPolarAngle={Math.PI * 0.85}
        enablePan={false}
      />
      <CameraRig target={positions[activeIndex]} />

      <EffectComposer disableNormalPass>
        <Bloom
          mipmapBlur
          intensity={s.bloom.intensity}
          luminanceThreshold={s.bloom.threshold}
          luminanceSmoothing={s.bloom.smoothing ?? 0.3}
        />
        <Vignette eskil={false} offset={0.2} darkness={s.vignette} />
      </EffectComposer>
    </>
  );
}

export default function JourneyScene(props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [45, 55, 45], fov: 46, near: 0.1, far: 500 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
