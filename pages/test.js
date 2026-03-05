import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { _MY_PROFILE_ } from '@/_mocks_/_settings_items_';
import { MY_AVATAR_BLACK_AND_WHITE } from '@/constants';

// Format US carte de visite : 3,5 × 2 po = 88,9 × 50,8 mm
const CARD_MM = { w: 88.9, h: 50.8 };
const CARD_ASPECT = CARD_MM.w / CARD_MM.h;
const CARD_WIDTH = 356;
const CARD_HEIGHT = Math.round(CARD_WIDTH / CARD_ASPECT);
const PORTFOLIO_URL = 'https://danielmbengui.ch';
const QR_BASE = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=';
const RECTO_IMAGE = 'assets/cards/cover.jpeg';

function getVersoQrRow1(profile) {
  return [
    { url: PORTFOLIO_URL, label: 'Portfolio', logoImg: '/me-color.png' },
    { url: profile.socials.linkedin, label: 'LinkedIn', logoImg: '/icons/linkedin.svg' },
    { url: profile.socials.github, label: 'GitHub', logoImg: '/icons/github.svg' },
  ];
}

function getVersoQrRow2(profile) {
  return [
    { url: profile.socials.playstore, label: 'Play Store', logoImg: '/icons/playstore.svg' },
    { url: profile.socials.appstore, label: 'App Store', logoImg: '/icons/appstore.svg' },
  ];
}

export default function TestPage() {
  const [flipped, setFlipped] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const rectoRef = useRef(null);
  const versoRef = useRef(null);

  const handleDownload = async () => {
    if (!rectoRef.current || !versoRef.current || downloading) return;
    setDownloading(true);
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed; left: 0; top: 0; z-index: 99999;
      width: ${CARD_WIDTH}px; height: ${CARD_HEIGHT * 2}px;
      background: #0a0a0a;
    `;
    const rectoClone = rectoRef.current.cloneNode(true);
    const versoClone = versoRef.current.cloneNode(true);
    rectoClone.style.position = 'absolute';
    rectoClone.style.left = '0';
    rectoClone.style.top = '0';
    rectoClone.style.width = `${CARD_WIDTH}px`;
    rectoClone.style.height = `${CARD_HEIGHT}px`;
    versoClone.style.position = 'absolute';
    versoClone.style.left = '0';
    versoClone.style.top = `${CARD_HEIGHT}px`;
    versoClone.style.width = `${CARD_WIDTH}px`;
    versoClone.style.height = `${CARD_HEIGHT}px`;
    versoClone.style.transform = 'none';
    container.appendChild(rectoClone);
    container.appendChild(versoClone);
    document.body.appendChild(container);
    const waitImages = (el) => {
      const imgs = el.querySelectorAll('img');
      return Promise.all(
        Array.from(imgs).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else img.onload = resolve;
              setTimeout(resolve, 500);
            })
        )
      );
    };
    await waitImages(rectoClone);
    await waitImages(versoClone);
    await new Promise((r) => setTimeout(r, 100));
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const [canvas1, canvas2] = await Promise.all([
        html2canvas(rectoClone, { scale: 2, useCORS: true, backgroundColor: '#0a0a0a', logging: false }),
        html2canvas(versoClone, { scale: 2, useCORS: true, backgroundColor: '#0a0a0a', logging: false }),
      ]);
      if (container.parentNode) document.body.removeChild(container);
      const { w, h } = CARD_MM;
      const pdf = new jsPDF({
        unit: 'mm',
        format: [w, h],
        orientation: 'landscape',
        hotfixes: ['px_scaling'],
      });
      const img1 = canvas1.toDataURL('image/jpeg', 0.95);
      const img2 = canvas2.toDataURL('image/jpeg', 0.95);
      pdf.addImage(img1, 'JPEG', 0, 0, w, h);
      pdf.addPage([w, h], 'landscape');
      pdf.addImage(img2, 'JPEG', 0, 0, w, h);
      pdf.save('carte-de-visite-daniel-mbengui.pdf');
    } catch (err) {
      console.error(err);
      if (container.parentNode) document.body.removeChild(container);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadRectoJpeg = async () => {
    if (!rectoRef.current || downloading) return;
    setDownloading(true);
    const el = rectoRef.current.cloneNode(true);
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.width = `${CARD_WIDTH}px`;
    el.style.height = `${CARD_HEIGHT}px`;
    const container = document.createElement('div');
    container.style.cssText = `position:fixed;left:0;top:0;z-index:99999;width:${CARD_WIDTH}px;height:${CARD_HEIGHT}px;background:#0a0a0a;`;
    container.appendChild(el);
    document.body.appendChild(container);
    const waitImages = (node) => Promise.all(
      Array.from(node.querySelectorAll('img')).map(
        (img) => new Promise((resolve) => { if (img.complete) resolve(); else img.onload = resolve; setTimeout(resolve, 500); })
      )
    );
    await waitImages(el);
    await new Promise((r) => setTimeout(r, 100));
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#0a0a0a', logging: false });
      if (container.parentNode) document.body.removeChild(container);
      const link = document.createElement('a');
      link.download = 'carte-de-visite-recto-daniel-mbengui.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (err) {
      console.error(err);
      if (container.parentNode) document.body.removeChild(container);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadVersoJpeg = async () => {
    if (!versoRef.current || downloading) return;
    setDownloading(true);
    const el = versoRef.current.cloneNode(true);
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.width = `${CARD_WIDTH}px`;
    el.style.height = `${CARD_HEIGHT}px`;
    el.style.transform = 'none';
    const container = document.createElement('div');
    container.style.cssText = `position:fixed;left:0;top:0;z-index:99999;width:${CARD_WIDTH}px;height:${CARD_HEIGHT}px;background:#0a0a0a;`;
    container.appendChild(el);
    document.body.appendChild(container);
    const waitImages = (node) => Promise.all(
      Array.from(node.querySelectorAll('img')).map(
        (img) => new Promise((resolve) => { if (img.complete) resolve(); else img.onload = resolve; setTimeout(resolve, 500); })
      )
    );
    await waitImages(el);
    await new Promise((r) => setTimeout(r, 100));
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#0a0a0a', logging: false });
      if (container.parentNode) document.body.removeChild(container);
      const link = document.createElement('a');
      link.download = 'carte-de-visite-verso-daniel-mbengui.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (err) {
      console.error(err);
      if (container.parentNode) document.body.removeChild(container);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Carte de visite · Daniel Mbengui</title>
      </Head>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          fontFamily: '"Georgia", "Times New Roman", serif',
        }}
      >
        <h1
          style={{
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 28,
            fontSize: '0.9rem',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Carte de visite
        </h1>

        <div
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            perspective: '1200px',
            cursor: 'pointer',
            marginBottom: 24,
          }}
          onClick={() => setFlipped((f) => !f)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
          aria-label="Retourner la carte"
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Recto — pleine largeur/hauteur : photo N&B à gauche, données à droite */}
            <div
              ref={rectoRef}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: 0,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
              }}
            >
              {/* Gauche : photo noir et blanc, toute la hauteur */}
              <div
                style={{
                  width: '40%',
                  flexShrink: 0,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  background: '#0d0d0d',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src={MY_AVATAR_BLACK_AND_WHITE || _MY_PROFILE_.srcImage}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                />
              </div>
              {/* Droite : données */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px 20px',
                  background: '#0d0d0d',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--primary, #d4af37)',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  Mbengui Daniel Slaver
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#fff',
                    letterSpacing: '0.1em',
                    marginBottom: 14,
                    textTransform: 'uppercase',
                  }}
                >
                  Vibe Developer
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    fontSize: '0.7rem',
                    color: '#fff',
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🇨🇭</span>
                    <span>{_MY_PROFILE_.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🇦🇴</span>
                    <span>{_MY_PROFILE_.phone_ao}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>📧</span>
                    <span>{_MY_PROFILE_.mail}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🌐</span>
                    <span>danielmbengui.ch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verso — image de fond (même que recto) + grille de QR */}
            <div
              ref={versoRef}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: 0,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: '12px 8px',
                gap: 6,
              }}
            >
              {/* Image de fond (celle du recto) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${RECTO_IMAGE})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'grayscale(100%) blur(2px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '10px 12px',
                  gap: 20,
                }}
              >
                {/* Ligne 1 : Portfolio, LinkedIn, GitHub */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  {getVersoQrRow1(_MY_PROFILE_).map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'rgba(255,255,255,0.9)',
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          padding: '1px',
                          background: '#0d0d0d',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <div style={{ position: 'relative', width: 80, height: 65, flexShrink: 0 }}>
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&ecc=H&data=${encodeURIComponent(item.url)}`}
                            alt={`QR ${item.label}`}
                            width={58}
                            height={58}
                            style={{ display: 'block', width: "100%", height: "100%", objectFit: 'contain', background: '#fff', borderRadius: 2 }}
                          />
                          {item.logoImg && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                              <img src={item.logoImg} alt="" style={{ width: 16, height: 16, objectFit: 'contain', background: '#fff', borderRadius: 2, padding: 2, boxSizing: 'border-box' }} />
                            </div>
                          )}
                        </div>
                        <span style={{background:'',width:'100%',fontWeight:600, lineHeight:'1rem', fontSize: '0.6rem', textAlign: 'center', letterSpacing: '0.04em', color: 'var(--primary, #d4af37)' }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Ligne 2 : Play Store, App Store */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  {getVersoQrRow2(_MY_PROFILE_).map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'rgba(255,255,255,0.9)',
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          padding: '1px',
                          background: '#0d0d0d',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <div style={{ position: 'relative', width: 80, height: 60, flexShrink: 0 }}>
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&ecc=H&data=${encodeURIComponent(item.url)}`}
                            alt={`QR ${item.label}`}
                            width={80}
                            height={58}
                            style={{ display: 'block', width: "100%", height: "100%", objectFit: 'contain', background: '#fff', borderRadius: 2 }}
                          />
                          {item.logoImg && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                              <img src={item.logoImg} alt="" style={{ width: 16, height: 16, objectFit: 'contain', background: '#fff', borderRadius: 2, padding: 2, boxSizing: 'border-box' }} />
                            </div>
                          )}
                        </div>
                        <span style={{ background:'',width:'100%',fontWeight:600, lineHeight:'1rem', fontSize: '0.6rem', textAlign: 'center', letterSpacing: '0.04em', color: 'var(--primary, #d4af37)' }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: 16 }}>
          Clique sur la carte pour la retourner
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          <button
            type="button"
            onClick={handleDownloadRectoJpeg}
            disabled={downloading}
            style={{
              padding: '12px 20px',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: 0,
              cursor: downloading ? 'wait' : 'pointer',
              opacity: downloading ? 0.8 : 1,
            }}
          >
            {downloading ? '…' : 'Télécharger recto'}
          </button>
          <button
            type="button"
            onClick={handleDownloadVersoJpeg}
            disabled={downloading}
            style={{
              padding: '12px 20px',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: 0,
              cursor: downloading ? 'wait' : 'pointer',
              opacity: downloading ? 0.8 : 1,
            }}
          >
            {downloading ? '…' : 'Télécharger verso'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            style={{
              padding: '12px 20px',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: 0,
              cursor: downloading ? 'wait' : 'pointer',
              opacity: downloading ? 0.8 : 1,
            }}
          >
            {downloading ? 'Génération…' : 'Télécharger le PDF'}
          </button>
        </div>
      </div>
    </>
  );
}
