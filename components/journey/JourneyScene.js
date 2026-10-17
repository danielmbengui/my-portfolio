import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid, Html, Line, OrbitControls, Sparkles, Stars, Text } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { JOURNEY_ERAS, JOURNEY_REGIONS } from '@/_mocks_/_journey_items_';

const GROUND_Y = -6;
const CAMERA_OFFSET = new THREE.Vector3(9, 5, 13);

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
      const c = (t > activeT + 1e-6 ? pathFuture : pathActive).clone();
      if (t > activeT + 1e-6 && theme.scene.pathFutureMix > 0) {
        c.lerp(background, theme.scene.pathFutureMix);
      }
      cols.push(c);
    }
    return { points: pts, colors: cols };
  }, [curve, stops, activeIndex, theme]);

  const lineWidth = theme.scene.pathLineWidth ?? 2.5;
  return <Line points={points} vertexColors={colors} lineWidth={lineWidth} toneMapped={false} />;
}

function Comet({ curve, stops, activeIndex, color }) {
  const ref = useRef();
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
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.28, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function StopNode({ stop, label, position, active, visited, onSelect, theme, showFloatingLabel = true }) {
  const [hovered, setHovered] = useState(false);
  const group = useRef();
  const ring = useRef();
  const color = eraColor(stop);
  const baseScale = stop.placeholder ? 0.55 : 1;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const pulse = active ? 1.35 + Math.sin(clock.elapsedTime * 4) * 0.12 : hovered ? 1.25 : 1;
    const s = THREE.MathUtils.lerp(group.current.scale.x, baseScale * pulse, 1 - Math.exp(-delta * 8));
    group.current.scale.setScalar(s);
    if (ring.current) {
      ring.current.rotation.x += delta * 0.9;
      ring.current.rotation.y += delta * 0.6;
    }
  });

  const boost = theme.scene.stopEmissiveBoost ?? 1;
  const intensity = (active ? 4 : visited ? 2.2 : stop.placeholder ? 0.6 : 1.2) * boost;

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
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={intensity}
            roughness={0.25}
            metalness={0.4}
            toneMapped={false}
            wireframe={stop.placeholder && !active}
          />
        </mesh>
        {!stop.placeholder && (
          <mesh ref={ring}>
            <torusGeometry args={[1.05, 0.04, 8, 64]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={active ? 1 : 0.55} />
          </mesh>
        )}
      </group>

      {active && (
        <mesh position={[0, (GROUND_Y - position.y) / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, Math.abs(GROUND_Y - position.y), 8]} />
          <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.7} />
        </mesh>
      )}

      {showFloatingLabel && (hovered || active) && (
        <Html position={[0, 1.6, 0]} center distanceFactor={14} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 12px',
              borderRadius: 999,
              border: `1px solid ${color}`,
              background: theme.scene.labelBg,
              color: theme.scene.labelText,
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              boxShadow: `0 0 18px ${color}`,
            }}
          >
            <strong style={{ color }}>{label.year}</strong> · {label.title}
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
  return (
    <group>
      <Grid
        position={[region.x, GROUND_Y, centerZ]}
        args={[22, length]}
        cellSize={1}
        cellThickness={0.6}
        cellColor={theme.scene.gridCell}
        sectionSize={5}
        sectionThickness={1.2}
        sectionColor={theme.scene.gridSection}
        fadeDistance={90}
        fadeStrength={1.5}
      />
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

  return (
    <>
      <color attach="background" args={[theme.background]} />
      <fog attach="fog" args={[theme.background, theme.scene.fogNear ?? 35, theme.scene.fogFar ?? 110]} />
      <ambientLight intensity={theme.scene.ambient} />
      <directionalLight position={[28, 42, 18]} intensity={theme.scene.directional ?? 0.4} color="#ffffff" />
      <pointLight
        position={positions[activeIndex].toArray()}
        intensity={theme.scene.pointLightIntensity ?? 60}
        distance={30}
        color={eraColor(stops[activeIndex])}
      />

      {theme.scene.stars && <Stars radius={160} depth={60} count={6000} factor={5} saturation={0.6} fade speed={0.6} />}
      <Sparkles count={260} scale={[60, 20, length]} position={[0, 2, centerZ]} size={3} speed={0.35} color={theme.scene.sparkles} />

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
      <Comet curve={curve} stops={stops} activeIndex={activeIndex} color={theme.scene.pathLine} />

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
        />
      ))}

      <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={4} maxDistance={90} maxPolarAngle={Math.PI * 0.85} />
      <CameraRig target={positions[activeIndex]} />

      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur intensity={theme.scene.bloom.intensity} luminanceThreshold={theme.scene.bloom.threshold} luminanceSmoothing={0.3} />
        <Vignette eskil={false} offset={0.15} darkness={theme.scene.vignette} />
      </EffectComposer>
    </>
  );
}

export default function JourneyScene(props) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [45, 55, 45], fov: 50, near: 0.1, far: 500 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
