import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import { useLang } from '../context/LanguageContext.jsx';

// Load Font Awesome
if (typeof document !== 'undefined' && !document.getElementById('fa-cdn')) {
  const link = document.createElement('link');
  link.id = 'fa-cdn';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
  document.head.appendChild(link);
}

const G = 'var(--brand-green)';

export default function Root() {
  const { T } = useLang();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden', transition: 'background 0.5s, color 0.5s' }}>

      {/* Global background glows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'var(--bg-gradient)', transition: 'background 0.5s'
      }} />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

      {/* Floating CTA button */}
      <button
        onClick={() => {
          const el = document.getElementById('contact');
          el ? el.scrollIntoView({ behavior: 'smooth' }) : window.location.href = '/#contact';
        }}
        className="liquid-glass-droplet"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 400,
          padding: '.85rem 1.7rem', borderRadius: 50, display: 'flex', alignItems: 'center', gap: '.7rem',
          fontWeight: 900, fontSize: '.88rem', textTransform: 'uppercase', letterSpacing: '1.5px',
          background: 'var(--brand-green)', color: 'var(--btn-text)', border: '1px solid var(--glass-border)', cursor: 'pointer',
          boxShadow: `0 12px 30px rgba(12,230,89,0.35), inset 0 2px 3px rgba(255,255,255,0.4)`,
          fontFamily: "'Outfit', sans-serif",
          animation: 'ctaPulse 3s ease-in-out infinite',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.45), box-shadow 0.4s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'; e.currentTarget.style.animation = 'none'; e.currentTarget.style.boxShadow = `0 20px 40px rgba(12,230,89,0.5), inset 0 2px 3px rgba(255,255,255,0.5)`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.animation = 'ctaPulse 3s ease-in-out infinite'; e.currentTarget.style.boxShadow = `0 12px 30px rgba(12,230,89,0.35), inset 0 2px 3px rgba(255,255,255,0.4)`; }}>
        <i className="fas fa-graduation-cap" />
        <span>{T('cta_float')}</span>
      </button>

      {/* Custom cursor */}
      <div id="cursor-dot" style={{ position: 'fixed', top: 0, left: 0, width: 6, height: 6, background: G, borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, marginLeft: -3, marginTop: -3, boxShadow: `0 0 10px ${G}`, transition: 'opacity .3s' }} />
      <div id="cursor-ring" style={{ position: 'fixed', top: 0, left: 0, width: 36, height: 36, border: `1.5px solid rgba(12,230,89,0.6)`, borderRadius: '50%', pointerEvents: 'none', zIndex: 9998, marginLeft: -18, marginTop: -18, transition: 'width .15s, height .15s, opacity .15s, margin .15s' }} />

      <CursorScript />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap');
        
        :root {
          --bg-primary: #060608;
          --bg-gradient: radial-gradient(ellipse 70% 50% at 15% -10%, rgba(12,230,89,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 100%, rgba(12,230,89,0.07) 0%, transparent 60%), #060608;
          --text-primary: #f0f0f0;
          --text-secondary: rgba(240,240,240,0.55);
          --glass-bg: rgba(255, 255, 255, 0.045);
          --glass-border: rgba(255, 255, 255, 0.16);
          --glass-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 4px 12px -3px rgba(0, 0, 0, 0.45), inset 0 3px 5px rgba(255, 255, 255, 0.26), inset 0 -3px 5px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          --glass-hover-shadow: 0 32px 64px -16px rgba(12, 230, 89, 0.42), 0 12px 28px -10px rgba(12, 230, 89, 0.25), 0 0 0 2px rgba(12, 230, 89, 0.5), inset 0 3px 6px rgba(255, 255, 255, 0.35), inset 0 -2px 5px rgba(0, 0, 0, 0.4);
          --hero-overlay: linear-gradient(135deg, rgba(6,6,8,0.94) 0%, rgba(6,6,8,0.72) 60%, rgba(6,6,8,0.88) 100%);
          --brand-green: #0ce659;
          --card-glow: rgba(12,230,89,0.13);
          --input-bg: rgba(255,255,255,0.05);
          --input-border: rgba(255,255,255,0.1);
          --section-border: rgba(255,255,255,0.07);
          --course-bg: linear-gradient(-45deg, #060608, #0a0b0e, rgba(12,230,89,0.03), #060608);
          --nav-scroll-bg: rgba(6, 6, 8, 0.7);
          --btn-text: #000;
        }

        [data-theme="light"] {
          --bg-primary: #eef2f6;
          --bg-gradient: radial-gradient(circle at 15% 0%, rgba(16,185,129,0.15) 0%, transparent 40%), radial-gradient(circle at 85% 100%, rgba(16,185,129,0.1) 0%, transparent 40%), linear-gradient(135deg, #eef2f6 0%, #f8fafc 100%);
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --glass-bg: rgba(255, 255, 255, 0.55);
          --glass-border: rgba(255, 255, 255, 0.85);
          --glass-shadow: 0 12px 32px -8px rgba(100, 116, 139, 0.12), 0 4px 12px -3px rgba(100, 116, 139, 0.08), inset 0 3px 5px rgba(255, 255, 255, 0.95), inset 0 -2px 3px rgba(0, 0, 0, 0.03), inset 0 0 0 1px rgba(255, 255, 255, 0.6);
          --glass-hover-shadow: 0 30px 60px -15px rgba(16, 185, 129, 0.28), 0 10px 24px -10px rgba(16, 185, 129, 0.15), 0 0 0 2px rgba(16, 185, 129, 0.55), inset 0 3px 6px rgba(255, 255, 255, 0.98), inset 0 -1px 3px rgba(0, 0, 0, 0.02);
          --hero-overlay: linear-gradient(135deg, rgba(238,242,246,0.85) 0%, rgba(248,250,252,0.6) 50%, rgba(238,242,246,0.8) 100%);
          --brand-green: #10b981;
          --card-glow: rgba(16,185,129,0.12);
          --input-bg: rgba(255,255,255,0.7);
          --input-border: rgba(0,0,0,0.06);
          --section-border: rgba(0,0,0,0.06);
          --course-bg: linear-gradient(-45deg, #eef2f6, #f8fafc, rgba(16,185,129,0.06), #eef2f6);
          --nav-scroll-bg: rgba(255, 255, 255, 0.6);
          --btn-text: #fff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; background: var(--bg-primary) !important; color: var(--text-primary); transition: background 0.5s, color 0.5s; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-primary); }
        ::-webkit-scrollbar-thumb { background: rgba(150,150,150,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--brand-green); }
        @keyframes ctaPulse {
          0%,100% { box-shadow: 0 0 30px var(--brand-green), 0 8px 20px rgba(0,0,0,0.2); }
          50%      { box-shadow: 0 0 50px var(--brand-green), 0 8px 20px rgba(0,0,0,0.2); }
        }
        .ibrat-reveal { will-change: opacity, transform; }
        a, button { font-family: 'Outfit', sans-serif; }
        @media(max-width:768px) {
          #cursor-dot, #cursor-ring { display: none; }
        }

        .liquid-glass-droplet {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(24px) saturate(1.85);
          -webkit-backdrop-filter: blur(24px) saturate(1.85);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.45), 
                      box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1), 
                      background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.45s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .liquid-glass-droplet:hover {
          transform: translateY(-5px) scale(1.025) !important;
          backdrop-filter: blur(28px) saturate(2.1) !important;
          -webkit-backdrop-filter: blur(28px) saturate(2.1) !important;
          box-shadow: var(--glass-hover-shadow) !important;
        }
        .liquid-glass-droplet:active {
          transform: translateY(-2px) scale(0.975) !important;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.45) !important;
        }
        .liquid-glass-droplet::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 52%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 60%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        [data-theme="light"] .liquid-glass-droplet::after {
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 60%, transparent 100%);
        }
        .liquid-glass-droplet::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
          transform: translateX(-160%) rotate(25deg);
          pointer-events: none;
          z-index: 2;
        }
        [data-theme="light"] .liquid-glass-droplet::before {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
        }
        .liquid-glass-droplet:hover::before {
          animation: glassSheen 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes glassSheen {
          0% { transform: translateX(-160%) rotate(25deg); }
          100% { transform: translateX(160%) rotate(25deg); }
        }

        /* iOS 26 Liquid Glass Card Style (Volumetric Larger Containers) */
        .liquid-glass-card {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(28px) saturate(1.95);
          -webkit-backdrop-filter: blur(28px) saturate(1.95);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          background-color: var(--glass-bg);
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.45), 
                      box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1), 
                      background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.45s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .liquid-glass-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          backdrop-filter: blur(32px) saturate(2.2) !important;
          -webkit-backdrop-filter: blur(32px) saturate(2.2) !important;
          box-shadow: var(--glass-hover-shadow) !important;
          border-color: var(--brand-green) !important;
        }
        .liquid-glass-card:active {
          transform: translateY(-2px) scale(0.985) !important;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.45) !important;
        }
        .liquid-glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 48%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 60%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        [data-theme="light"] .liquid-glass-card::after {
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.12) 60%, transparent 100%);
        }
        .liquid-glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          transform: translateX(-160%) rotate(25deg);
          pointer-events: none;
          z-index: 2;
        }
        [data-theme="light"] .liquid-glass-card::before {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
        }
        .liquid-glass-card:hover::before {
          animation: glassSheen 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

function CursorScript() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let rx = 0, ry = 0;
    let dx = 0, dy = 0;

    const move = (e) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    let raf;
    const lerp = () => {
      rx += (dx - rx) * 0.12;
      ry += (dy - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    const onEnter = () => { ring.style.width = '54px'; ring.style.height = '54px'; ring.style.marginLeft = '-27px'; ring.style.marginTop = '-27px'; ring.style.opacity = '.3'; };
    const onLeave = () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.marginLeft = '-18px'; ring.style.marginTop = '-18px'; ring.style.opacity = '1'; };

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', move);
    };
  }, []);

  return null;
}
