import { useEffect, useState, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import logoImage from '../../publish/image.png';

export default function HeroSection() {
  const { lang } = useLang();
  const [vis, setVis]     = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rightRef           = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => {
    const r = rightRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: (e.clientX - r.left - r.width / 2)  / r.width,
      y: (e.clientY - r.top  - r.height / 2) / r.height,
    });
  };

  const copy = {
    uz: {
      badge : "Toshkentning №1 Ta'lim Markazi",
      hl1   : "Kelajagingizni",
      hl2   : "Biz Bilan",
      hl3   : "Shakllantiring.",
      sub   : "Ingliz tili, rus tili, mental arifmetika va Montessori metodikasi — 9 yillik tajriba, isbotlangan natijalar.",
      cta1  : "Kurslarni Ko'rish",
      cta2  : "Biz Haqimizda",
      s1n: "1,500+", s1l: "Faol o'quvchi",
      s2n: "98%",    s2l: "Mamnunlik darajasi",
      s3n: "9+",     s3l: "Yil tajriba",
      c1lbl: "O'QUVCHILAR", c1num: "1,500+", c1sub: "Faol o'quvchi",
      c2lbl: "MAMNUNLIK",   c2num: "98%",    c2sub: "Ijobiy baho",
      c3lbl: "KURSLAR",     c3num: "8+",     c3sub: "Ta'lim yo'nalishi",
      t1: "🇬🇧 Ingliz tili",
      t2: "🌱 Montessori",
      t3: "🧮 Mental",
    },
    ru: {
      badge : "Образовательный центр №1 в Ташкенте",
      hl1   : "Формируйте",
      hl2   : "Своё Будущее",
      hl3   : "Вместе с Нами.",
      sub   : "Английский, русский, ментальная арифметика и методика Монтессори — 9 лет опыта, измеримые результаты.",
      cta1  : "Смотреть Курсы",
      cta2  : "О Нас",
      s1n: "1,500+", s1l: "Студентов",
      s2n: "98%",    s2l: "Удовлетворённость",
      s3n: "9+",     s3l: "Лет опыта",
      c1lbl: "СТУДЕНТЫ",     c1num: "1,500+", c1sub: "Активных",
      c2lbl: "ОЦЕНКА",       c2num: "98%",    c2sub: "Положит. отзывов",
      c3lbl: "КУРСЫ",        c3num: "8+",     c3sub: "Направлений",
      t1: "🇬🇧 Английский",
      t2: "🌱 Монтессори",
      t3: "🧮 Арифметика",
    },
    en: {
      badge : "Tashkent's #1 Educational Centre",
      hl1   : "Shape Your",
      hl2   : "Future",
      hl3   : "With Us.",
      sub   : "English, Russian, mental arithmetic and Montessori — 9 years of expertise, proven results.",
      cta1  : "Explore Courses",
      cta2  : "About Us",
      s1n: "1,500+", s1l: "Active Students",
      s2n: "98%",    s2l: "Satisfaction Rate",
      s3n: "9+",     s3l: "Years of Experience",
      c1lbl: "STUDENTS",    c1num: "1,500+", c1sub: "Active learners",
      c2lbl: "SATISFACTION", c2num: "98%",   c2sub: "Positive ratings",
      c3lbl: "COURSES",     c3num: "8+",     c3sub: "Programmes",
      t1: "🇬🇧 English",
      t2: "🌱 Montessori",
      t3: "🧮 Mental Math",
    },
  };
  const lc = copy[lang] || copy.uz;

  const px = (ax) => `${mouse.x * ax}px`;
  const py = (ay) => `${mouse.y * ay}px`;

  return (
    <section id="home">
      <style>{`

        /* ══════════════════════════════════════════════
           IBRAT HERO  ·  Book edition  ·  v4
        ══════════════════════════════════════════════ */

        #home {
          min-height: 100vh;
          padding: 106px 20px 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', -apple-system, sans-serif;
          background: #d8d3ca;
          transition: background 0.35s;
        }
        .dark #home { background: #0d0d0d; }

        /* ── rounded hero card ── */
        .h3-wrap {
          flex: 1;
          display: grid;
          grid-template-columns: 54fr 46fr;
          border-radius: 22px;
          overflow: hidden;
          min-height: calc(100vh - 128px);
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 16px 48px rgba(0,0,0,0.16),
            0 40px 80px rgba(0,0,0,0.08);
        }

        /* ═══════ LEFT ═══════ */
        .h3-left {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 64px;
          position: relative;
          overflow: hidden;
          transition: background 0.35s;
        }
        .dark .h3-left { background: #141414; }

        /* corner glow */
        .h3-left::before {
          content: '';
          position: absolute;
          top: -90px; left: -90px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,122,60,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* badge */
        .h3-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          padding: 7px 14px 7px 9px;
          border-radius: 50px;
          border: 1.5px solid rgba(26,122,60,0.2);
          background: rgba(26,122,60,0.06);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #1a7a3c;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(-14px);
          transition: opacity 0.55s 0.05s, transform 0.55s 0.05s;
        }
        .dark .h3-badge {
          color: #2dc56a;
          border-color: rgba(45,197,106,0.25);
          background: rgba(45,197,106,0.08);
        }
        .h3-badge.on { opacity: 1; transform: translateY(0); }

        .h3-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #1a7a3c;
          flex-shrink: 0;
          animation: h3pulse 2s ease-in-out infinite;
        }
        .dark .h3-dot { background: #2dc56a; }
        @keyframes h3pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(1.55); }
        }

        /* headline */
        .h3-h1 {
          font-size: clamp(38px, 4.6vw, 66px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2.5px;
          color: #090909;
          margin: 0 0 28px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s 0.2s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .dark .h3-h1 { color: #f0f0f0; }
        .h3-h1.on { opacity: 1; transform: translateY(0); }

        .h3-accent {
          color: #1a7a3c;
          display: block;
        }
        .dark .h3-accent { color: #2dc56a; }

        /* subtitle */
        .h3-sub {
          font-size: 14.5px;
          line-height: 1.78;
          color: #717171;
          max-width: 380px;
          margin: 0 0 38px;
          font-weight: 400;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s 0.34s ease, transform 0.65s 0.34s ease;
        }
        .dark .h3-sub { color: rgba(240,240,240,0.48); }
        .h3-sub.on { opacity: 1; transform: translateY(0); }

        /* CTA */
        .h3-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 44px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s 0.48s ease, transform 0.65s 0.48s ease;
        }
        .h3-ctas.on { opacity: 1; transform: translateY(0); }

        .h3-btn-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 50px;
          background: #1a7a3c;
          color: #ffffff !important;
          font-weight: 700;
          font-size: 13.5px;
          font-family: 'Outfit', sans-serif;
          text-decoration: none !important;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(26,122,60,0.36);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
          user-select: none;
        }
        .dark .h3-btn-solid {
          background: #2dc56a;
          color: #041008 !important;
          box-shadow: 0 6px 24px rgba(45,197,106,0.4);
        }
        .h3-btn-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(26,122,60,0.46);
        }
        .dark .h3-btn-solid:hover { box-shadow: 0 12px 32px rgba(45,197,106,0.52); }
        .h3-btn-solid:active { transform: translateY(-1px); }

        .h3-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 50px;
          background: transparent;
          color: #090909 !important;
          font-weight: 700;
          font-size: 13.5px;
          font-family: 'Outfit', sans-serif;
          text-decoration: none !important;
          border: 1.5px solid rgba(0,0,0,0.15);
          cursor: pointer;
          transition: border-color 0.22s ease, color 0.22s ease;
          white-space: nowrap;
          user-select: none;
        }
        .dark .h3-btn-ghost {
          color: #f0f0f0 !important;
          border-color: rgba(255,255,255,0.15);
        }
        .h3-btn-ghost:hover { border-color: #1a7a3c; color: #1a7a3c !important; }
        .dark .h3-btn-ghost:hover { border-color: #2dc56a; color: #2dc56a !important; }

        /* stats */
        .h3-stats {
          display: flex;
          padding-top: 30px;
          border-top: 1px solid rgba(0,0,0,0.07);
          opacity: 0;
          transition: opacity 0.65s 0.62s ease;
        }
        .dark .h3-stats { border-color: rgba(255,255,255,0.07); }
        .h3-stats.on { opacity: 1; }

        .h3-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-right: 16px;
        }
        .h3-stat + .h3-stat {
          padding-left: 16px;
          padding-right: 0;
          border-left: 1px solid rgba(0,0,0,0.07);
        }
        .dark .h3-stat + .h3-stat { border-color: rgba(255,255,255,0.07); }

        .h3-stat-n {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.8px;
          color: #090909;
          line-height: 1;
        }
        .dark .h3-stat-n { color: #f0f0f0; }
        .h3-stat-l {
          font-size: 10px;
          font-weight: 600;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        /* ═══════ RIGHT ═══════ */
        .h3-right {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 560px;
          background: linear-gradient(148deg, #1e9148 0%, #0f5c2a 48%, #073d1a 100%);
          transition: background 0.35s;
        }
        .dark .h3-right {
          background: linear-gradient(148deg, #0f4d24 0%, #072e14 52%, #030f07 100%);
        }

        /* background blobs */
        .h3-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .h3-blob-a {
          width: 380px; height: 380px;
          top: -110px; right: -110px;
          background: rgba(45,197,106,0.25);
          filter: blur(70px);
          animation: h3breathe 8s ease-in-out infinite;
        }
        .h3-blob-b {
          width: 260px; height: 260px;
          bottom: -80px; left: -50px;
          background: rgba(16,185,129,0.2);
          filter: blur(60px);
          animation: h3breathe 10s ease-in-out -3s infinite;
        }
        .h3-blob-c {
          width: 160px; height: 160px;
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          background: rgba(255,255,255,0.04);
          filter: blur(40px);
          animation: h3breathe 12s ease-in-out -6s infinite;
        }
        @keyframes h3breathe {
          0%,100% { opacity:.8; transform:scale(1); }
          50%      { opacity:1;  transform:scale(1.14); }
        }
        .h3-blob-c { transform: translate(-50%,-50%); }

        /* grid lines */
        .h3-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none; z-index: 0;
        }

        /* ═══════ 3-D BOOK ═══════ */
        /*
          Perspective scene:  .h3-scene
            └── .h3-book  (transform-style: preserve-3d, tilted 3D)
                 ├── .h3-cover-front  (front face)
                 ├── .h3-cover-back   (back face)
                 ├── .h3-spine        (left side)
                 ├── .h3-page-*       (page leaves, each flipping)
                 └── .h3-shadow       (floor shadow)
        */

        .h3-scene {
          position: relative;
          z-index: 2;
          perspective: 900px;
          perspective-origin: 55% 45%;
          will-change: transform;
        }

        .h3-book {
          width: 200px;
          height: 260px;
          position: relative;
          transform-style: preserve-3d;
          /* tilt so it looks 3D on screen */
          transform: rotateX(22deg) rotateY(-28deg);
          transition: transform 0.1s linear;
        }

        /* Cover faces */
        .h3-cover-front,
        .h3-cover-back {
          position: absolute;
          width: 200px; height: 260px;
          border-radius: 2px 6px 6px 2px;
          backface-visibility: hidden;
        }

        .h3-cover-front {
          background: linear-gradient(160deg, #e8f4ed 0%, #c6dece 50%, #9ec9b0 100%);
          transform: translateZ(6px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: inset -3px 0 8px rgba(0,0,0,0.15);
          overflow: hidden;
        }
        /* sheen on cover */
        .h3-cover-front::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%);
          pointer-events: none;
        }

        .h3-cover-back {
          background: linear-gradient(160deg, #b8d4c2 0%, #8db89e 100%);
          transform: rotateY(180deg) translateZ(6px);
        }

        /* Spine */
        .h3-spine {
          position: absolute;
          width: 12px; height: 260px;
          background: linear-gradient(to right, #2d6b45 0%, #4a9463 100%);
          transform: rotateY(-90deg) translateZ(0px) translateX(-6px);
          transform-origin: left center;
          left: 0;
          box-shadow: inset -2px 0 4px rgba(0,0,0,0.3);
        }

        /* Top & Bottom edges */
        .h3-top, .h3-bottom {
          position: absolute;
          width: 200px; height: 12px;
          background: linear-gradient(to bottom, #d4e8dc 0%, #aecfbb 100%);
          left: 0;
        }
        .h3-top    { transform: rotateX(90deg) translateZ(0px) translateY(-6px);  transform-origin: top center; top: 0; }
        .h3-bottom { transform: rotateX(-90deg) translateZ(0px) translateY(6px);  transform-origin: bottom center; bottom: 0; }

        /* Logo on cover */
        .h3-book-logo {
          width: 80px; height: 80px;
          border-radius: 50%;
          object-fit: contain;
          background: rgba(255,255,255,0.9);
          padding: 6px;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .h3-book-title {
          font-size: 13px;
          font-weight: 800;
          color: #1a5c34;
          text-align: center;
          letter-spacing: 0.5px;
          line-height: 1.3;
          position: relative;
          z-index: 1;
          padding: 0 12px;
        }
        .h3-book-subtitle {
          font-size: 8px;
          font-weight: 700;
          color: #3d8c5a;
          text-align: center;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }

        /* ── PAGE LEAVES ── */
        /*
          Each leaf is a thin card, hinged at left edge (transform-origin: left center).
          Stacked at z=5px (behind front cover), each with slightly different translateZ
          so they read as a page stack.
          Animation: flip from closed (rotateY 0) → open (rotateY -180deg) and back.
          We cascade 4 pages with staggered delays so they flip one at a time.
        */

        .h3-pages {
          position: absolute;
          width: 194px; height: 252px;
          top: 4px; left: 6px;
          transform-style: preserve-3d;
          transform: translateZ(5px);
        }

        .h3-page {
          position: absolute;
          width: 194px; height: 252px;
          top: 0; left: 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .h3-page-front,
        .h3-page-back {
          position: absolute;
          width: 100%; height: 100%;
          border-radius: 1px 4px 4px 1px;
          backface-visibility: hidden;
          overflow: hidden;
        }

        .h3-page-front {
          background: #f8faf8;
          box-shadow: inset -2px 0 6px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          padding: 20px 16px;
          gap: 8px;
          box-sizing: border-box;
        }
        .h3-page-back {
          background: #f4f7f5;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          padding: 20px 16px;
          gap: 8px;
          box-sizing: border-box;
        }

        /* fake text lines inside pages */
        .h3-line {
          height: 7px;
          border-radius: 4px;
          background: rgba(0,0,0,0.08);
        }
        .h3-line.short { width: 55%; }
        .h3-line.med   { width: 78%; }
        .h3-line.long  { width: 92%; }
        .h3-line.head  { width: 60%; height: 11px; background: rgba(26,122,60,0.2); margin-bottom: 4px; }
        .h3-line.img   {
          width: 100%; height: 60px; border-radius: 6px;
          background: linear-gradient(135deg, rgba(26,122,60,0.15), rgba(26,122,60,0.05));
          margin-bottom: 2px;
        }

        /* Page flip animation */
        .h3-page { animation-duration: 1.8s; animation-timing-function: cubic-bezier(0.45,0,0.55,1); animation-iteration-count: infinite; animation-fill-mode: both; }

        .h3-page-1 { animation-name: h3flip; animation-delay: 0s; }
        .h3-page-2 { animation-name: h3flip; animation-delay: 1.4s; }
        .h3-page-3 { animation-name: h3flip; animation-delay: 2.8s; }
        .h3-page-4 { animation-name: h3flip; animation-delay: 4.2s; }

        @keyframes h3flip {
          0%   { transform: rotateY(0deg); }
          8%   { transform: rotateY(-2deg); }    /* subtle lift */
          42%  { transform: rotateY(-90deg); }   /* mid-flip */
          58%  { transform: rotateY(-90deg); }   /* pause at spine */
          92%  { transform: rotateY(-178deg); }
          100% { transform: rotateY(-180deg); }
        }

        /* shadow under book */
        .h3-book-shadow {
          position: absolute;
          width: 200px; height: 40px;
          bottom: -50px; left: 50%;
          transform: translateX(-50%) rotateX(90deg) scaleX(1.2);
          background: radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%);
          filter: blur(8px);
        }

        /* ── floating stat cards ── */
        .h3-card {
          position: absolute;
          background: rgba(255,255,255,0.11);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 18px;
          padding: 16px 20px;
          color: #ffffff;
          z-index: 4;
          min-width: 128px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12);
          will-change: transform;
        }
        .h3-card-tl { top: 10%; left: 6%;  animation: h3floatUp   6s ease-in-out infinite; }
        .h3-card-br { bottom: 14%; right: 6%; animation: h3floatDn 7s ease-in-out -2s infinite; }
        .h3-card-tr { top: 12%; right: 8%; animation: h3floatUp   5.5s ease-in-out -1.2s infinite; }

        @keyframes h3floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes h3floatDn { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }

        .h3-card-lbl {
          font-size: 8px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.6px;
          opacity: 0.55; margin-bottom: 6px; display: block;
        }
        .h3-card-num {
          font-size: 28px; font-weight: 900;
          letter-spacing: -0.5px; line-height: 1; display: block;
        }
        .h3-card-sub {
          font-size: 10px; opacity: 0.55;
          margin-top: 4px; display: block; line-height: 1.4;
        }
        .h3-bar {
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px; margin-top: 10px; overflow: hidden;
        }
        .h3-bar-fill { height: 100%; border-radius: 2px; background: #2dc56a; }

        /* ── floating pills ── */
        .h3-pill {
          position: absolute;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.26);
          border-radius: 50px;
          padding: 8px 18px;
          font-size: 12px; font-weight: 700;
          color: #ffffff; white-space: nowrap;
          z-index: 4;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }
        .h3-pill-1 { bottom: 28%; left: 6%;  animation: h3floatUp 8s ease-in-out -1s infinite; }
        .h3-pill-2 { bottom: 18%; left: 28%; animation: h3floatDn 7.5s ease-in-out -3.5s infinite; }
        .h3-pill-3 { bottom: 10%; right: 8%; animation: h3floatUp 9s ease-in-out -6s infinite; }

        /* ═══════ RESPONSIVE ═══════ */

        @media (max-width: 960px) {
          #home { padding: 100px 14px 14px; }
          .h3-wrap { grid-template-columns: 1fr; }
          .h3-right { order: -1; min-height: 440px; }
          .h3-left  { padding: 52px 44px; }
          .h3-card-tr { display: none; }
        }

        @media (max-width: 640px) {
          #home { padding: 90px 10px 10px; }
          .h3-wrap { border-radius: 16px; min-height: auto; }
          .h3-left  { padding: 40px 28px; }
          .h3-h1    { font-size: 36px; letter-spacing: -1.5px; }
          .h3-sub   { font-size: 13.5px; }
          .h3-right { min-height: 380px; }
          .h3-book  { transform: rotateX(20deg) rotateY(-22deg) scale(0.8); }
          .h3-card-tl { top: 8%; left: 3%; padding: 12px 14px; min-width: 108px; }
          .h3-card-br { bottom: 10%; right: 3%; padding: 12px 14px; min-width: 108px; }
          .h3-card-num { font-size: 22px; }
          .h3-pill-3 { display: none; }
          .h3-stat-n { font-size: 19px; }
          .h3-badge  { font-size: 10px; }
        }

        @media (max-width: 400px) {
          .h3-left { padding: 32px 20px; }
          .h3-h1   { font-size: 30px; letter-spacing: -1px; }
          .h3-ctas { flex-direction: column; }
          .h3-btn-solid, .h3-btn-ghost { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="h3-wrap">

        {/* ════ LEFT ════ */}
        <div className="h3-left">

          <div className={`h3-badge${vis ? ' on' : ''}`}>
            <span className="h3-dot" />
            {lc.badge}
          </div>

          <h1 className={`h3-h1${vis ? ' on' : ''}`}>
            {lc.hl1}
            <span className="h3-accent">{lc.hl2}</span>
            {lc.hl3}
          </h1>

          <p className={`h3-sub${vis ? ' on' : ''}`}>{lc.sub}</p>

          <div className={`h3-ctas${vis ? ' on' : ''}`}>
            <a
              className="h3-btn-solid"
              href="#courses"
              onClick={e => {
                e.preventDefault();
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {lc.cta1} →
            </a>
            <a
              className="h3-btn-ghost"
              href="#about"
              onClick={e => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {lc.cta2}
            </a>
          </div>

          <div className={`h3-stats${vis ? ' on' : ''}`}>
            <div className="h3-stat">
              <span className="h3-stat-n">{lc.s1n}</span>
              <span className="h3-stat-l">{lc.s1l}</span>
            </div>
            <div className="h3-stat">
              <span className="h3-stat-n">{lc.s2n}</span>
              <span className="h3-stat-l">{lc.s2l}</span>
            </div>
            <div className="h3-stat">
              <span className="h3-stat-n">{lc.s3n}</span>
              <span className="h3-stat-l">{lc.s3l}</span>
            </div>
          </div>

        </div>

        {/* ════ RIGHT ════ */}
        <div
          className="h3-right"
          ref={rightRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        >
          {/* background blobs */}
          <div className="h3-blob h3-blob-a" />
          <div className="h3-blob h3-blob-b" />
          <div className="h3-blob h3-blob-c" />
          <div className="h3-grid" />

          {/* ── 3D BOOK ── */}
          <div
            className="h3-scene"
            style={{ transform: `translate(${px(8)}, ${py(6)})` }}
          >
            <div
              className="h3-book"
              style={{
                transform: `rotateX(22deg) rotateY(${-28 + mouse.x * 10}deg)`,
              }}
            >
              {/* Spine */}
              <div className="h3-spine" />

              {/* Top & Bottom edges */}
              <div className="h3-top" />
              <div className="h3-bottom" />

              {/* Back cover */}
              <div className="h3-cover-back" />

              {/* Page stack — 4 flipping leaves */}
              <div className="h3-pages">

                <div className="h3-page h3-page-4">
                  <div className="h3-page-front">
                    <div className="h3-line img" />
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line long" />
                    <div className="h3-line short" />
                    <div className="h3-line med" />
                  </div>
                  <div className="h3-page-back">
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line short" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line img" />
                  </div>
                </div>

                <div className="h3-page h3-page-3">
                  <div className="h3-page-front">
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line short" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line img" />
                    <div className="h3-line short" />
                  </div>
                  <div className="h3-page-back">
                    <div className="h3-line img" />
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line short" />
                    <div className="h3-line long" />
                  </div>
                </div>

                <div className="h3-page h3-page-2">
                  <div className="h3-page-front">
                    <div className="h3-line img" />
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line short" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                  </div>
                  <div className="h3-page-back">
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line img" />
                    <div className="h3-line short" />
                    <div className="h3-line long" />
                  </div>
                </div>

                <div className="h3-page h3-page-1">
                  <div className="h3-page-front">
                    <div className="h3-line head" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                    <div className="h3-line short" />
                    <div className="h3-line img" />
                    <div className="h3-line long" />
                    <div className="h3-line med" />
                  </div>
                  <div className="h3-page-back">
                    <div className="h3-line img" />
                    <div className="h3-line head" />
                    <div className="h3-line med" />
                    <div className="h3-line long" />
                    <div className="h3-line short" />
                    <div className="h3-line med" />
                    <div className="h3-line long" />
                  </div>
                </div>

              </div>

              {/* Front cover — on top of pages */}
              <div className="h3-cover-front">
                <img src={logoImage} alt="IBRAT TA'LIM" className="h3-book-logo" />
                <div className="h3-book-title">IBRAT TA'LIM</div>
                <div className="h3-book-subtitle">Education Centre</div>
              </div>

            </div>{/* /h3-book */}

            {/* shadow */}
            <div className="h3-book-shadow" />

          </div>{/* /h3-scene */}

          {/* floating stat cards */}
          <div
            className="h3-card h3-card-tl"
            style={{ transform: `translate(${px(22)}, ${py(15)})` }}
          >
            <span className="h3-card-lbl">{lc.c1lbl}</span>
            <span className="h3-card-num">{lc.c1num}</span>
            <span className="h3-card-sub">{lc.c1sub}</span>
            <div className="h3-bar"><div className="h3-bar-fill" style={{ width: '88%' }} /></div>
          </div>

          <div
            className="h3-card h3-card-br"
            style={{ transform: `translate(${px(-18)}, ${py(-12)})` }}
          >
            <span className="h3-card-lbl">{lc.c2lbl}</span>
            <span className="h3-card-num">{lc.c2num}</span>
            <span className="h3-card-sub">{lc.c2sub}</span>
            <div className="h3-bar"><div className="h3-bar-fill" style={{ width: '98%' }} /></div>
          </div>

          <div
            className="h3-card h3-card-tr"
            style={{ transform: `translate(${px(-14)}, ${py(20)})` }}
          >
            <span className="h3-card-lbl">{lc.c3lbl}</span>
            <span className="h3-card-num">{lc.c3num}</span>
            <span className="h3-card-sub">{lc.c3sub}</span>
            <div className="h3-bar"><div className="h3-bar-fill" style={{ width: '70%' }} /></div>
          </div>

          {/* pills */}
          <div className="h3-pill h3-pill-1">{lc.t1}</div>
          <div className="h3-pill h3-pill-2">{lc.t2}</div>
          <div className="h3-pill h3-pill-3">{lc.t3}</div>

        </div>
      </div>
    </section>
  );
}
