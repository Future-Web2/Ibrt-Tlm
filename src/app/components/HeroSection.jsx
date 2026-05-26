import { useEffect, useState, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import logoImage from '../../publish/image.png';

export default function HeroSection() {
  const { lang } = useLang();
  const [vis, setVis] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rightRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  const onMove = (e) => {
    const r = rightRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: (e.clientX - r.left - r.width / 2) / r.width,
      y: (e.clientY - r.top - r.height / 2) / r.height,
    });
  };

  const copy = {
    uz: {
      badge: "Toshkentning №1 Ta'lim Markazi",
      hl1: 'Kelajagingizni', hl2: "Biz Bilan", hl3: 'Shakllantiring.',
      sub: "Ingliz tili, rus tili, mental arifmetika va Montessori — 9 yillik tajriba, tasdiqlangan natijalar.",
      cta1: "Kurslarni Ko'rish", cta2: "Biz Haqimizda",
      s1n: '1,500+', s1l: "Faol o'quvchi",
      s2n: '98%',   s2l: 'Mamnunlik',
      s3n: '9+',    s3l: 'Yil tajriba',
      c1l: "O'QUVCHILAR", c1n: '1,500+', c1s: "Faol o'quvchi",
      c2l: 'MAMNUNLIK',   c2n: '98%',    c2s: 'Ijobiy baho',
      c3l: 'KURSLAR',     c3n: '8+',     c3s: "Ta'lim yo'nalishlari",
      t1: '🇬🇧 Ingliz tili', t2: '🌱 Montessori', t3: '🧮 Mental',
    },
    ru: {
      badge: 'Образовательный центр №1 в Ташкенте',
      hl1: 'Формируйте', hl2: 'Своё Будущее', hl3: 'Вместе с Нами.',
      sub: 'Английский, русский, ментальная арифметика и Монтессори — 9 лет опыта, измеримые результаты.',
      cta1: 'Смотреть Курсы', cta2: 'О Нас',
      s1n: '1,500+', s1l: 'Студентов',
      s2n: '98%',   s2l: 'Удовлетворённость',
      s3n: '9+',    s3l: 'Лет опыта',
      c1l: 'СТУДЕНТЫ',       c1n: '1,500+', c1s: 'Активных',
      c2l: 'УДОВЛЕТВОРЁННОСТЬ', c2n: '98%', c2s: 'Положит. оценок',
      c3l: 'КУРСЫ',          c3n: '8+',    c3s: 'Направлений',
      t1: '🇬🇧 Английский', t2: '🌱 Монтессори', t3: '🧮 Арифметика',
    },
    en: {
      badge: "Tashkent's #1 Educational Centre",
      hl1: 'Shape Your', hl2: 'Future', hl3: 'With Us.',
      sub: 'English, Russian, mental arithmetic and Montessori — 9 years of expertise, proven results.',
      cta1: 'Explore Courses', cta2: 'About Us',
      s1n: '1,500+', s1l: 'Active Students',
      s2n: '98%',   s2l: 'Satisfaction',
      s3n: '9+',    s3l: 'Years',
      c1l: 'STUDENTS',    c1n: '1,500+', c1s: 'Active learners',
      c2l: 'SATISFACTION', c2n: '98%',  c2s: 'Positive ratings',
      c3l: 'COURSES',     c3n: '8+',    c3s: 'Programmes',
      t1: '🇬🇧 English', t2: '🌱 Montessori', t3: '🧮 Mental Math',
    },
  };
  const lc = copy[lang] || copy.uz;

  const v = vis ? ' hv' : '';

  return (
    <section id="home">
      <style>{`
        /* ════════════════════════════════════════════
           HERO SECTION — Ocean-World-inspired layout
           Vibrant right panel · Clean left panel
        ════════════════════════════════════════════ */

        /* Page background (outside the rounded container) */
        #home {
          min-height: 100vh;
          padding: 92px 18px 18px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          background: #e8e8e8;
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        html.dark #home {
          background: #0a0a0a;
        }
        html[data-theme="light"] #home {
          background: #e5e0d8;
        }

        /* ── Rounded main container ── */
        .hw-outer {
          flex: 1;
          display: grid;
          grid-template-columns: 52fr 48fr;
          border-radius: 20px;
          overflow: hidden;
          min-height: calc(100vh - 112px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.2);
        }

        /* ════ LEFT COLUMN ════ */
        .hw-left {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 60px;
          gap: 0;
          transition: background 0.35s ease;
          position: relative;
          z-index: 1;
        }
        html.dark .hw-left {
          background: #111111;
        }
        html[data-theme="light"] .hw-left {
          background: #ffffff;
        }

        /* Badge pill */
        .hw-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px 7px 10px;
          border-radius: 50px;
          border: 1px solid rgba(26,122,60,0.22);
          background: rgba(26,122,60,0.06);
          font-size: 11.5px;
          font-weight: 700;
          color: #1a7a3c;
          width: fit-content;
          letter-spacing: 0.2px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.5s 0.05s ease, transform 0.5s 0.05s ease;
        }
        html.dark .hw-badge {
          color: #2dc56a;
          border-color: rgba(45,197,106,0.28);
          background: rgba(45,197,106,0.08);
        }
        .hw-badge.hv { opacity: 1; transform: translateY(0); }

        .hw-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #1a7a3c;
          flex-shrink: 0;
          animation: hwPulse 2.2s ease-in-out infinite;
        }
        html.dark .hw-badge-dot { background: #2dc56a; }
        @keyframes hwPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(1.5); }
        }

        /* Headline */
        .hw-h1 {
          font-size: clamp(38px, 4.8vw, 70px);
          font-weight: 900;
          line-height: 1.04;
          letter-spacing: -2.5px;
          color: #0a0a0a;
          margin: 0 0 24px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s 0.18s ease, transform 0.65s 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        html.dark .hw-h1   { color: #f2f2f2; }
        html[data-theme="light"] .hw-h1 { color: #0a0a0a; }
        .hw-h1.hv { opacity: 1; transform: translateY(0); }

        .hw-h1-accent {
          color: #1a7a3c;
          display: block;
        }
        html.dark .hw-h1-accent { color: #2dc56a; }

        /* Subtitle */
        .hw-sub {
          font-size: 15px;
          line-height: 1.75;
          color: #666;
          max-width: 400px;
          margin: 0 0 36px;
          font-weight: 400;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s 0.32s ease, transform 0.65s 0.32s ease;
        }
        html.dark .hw-sub { color: rgba(242,242,242,0.5); }
        .hw-sub.hv { opacity: 1; transform: translateY(0); }

        /* CTA buttons */
        .hw-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.65s 0.46s ease, transform 0.65s 0.46s ease;
        }
        .hw-ctas.hv { opacity: 1; transform: translateY(0); }

        .hw-cta-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          border-radius: 50px;
          background: #1a7a3c;
          color: #fff !important;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none !important;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(26,122,60,0.38);
          font-family: 'Outfit', sans-serif;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        html.dark .hw-cta-solid {
          background: #2dc56a;
          color: #060f08 !important;
          box-shadow: 0 8px 28px rgba(45,197,106,0.42);
        }
        .hw-cta-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(26,122,60,0.48);
        }
        html.dark .hw-cta-solid:hover {
          box-shadow: 0 14px 36px rgba(45,197,106,0.55);
        }

        .hw-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          border-radius: 50px;
          background: transparent;
          color: #0a0a0a !important;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none !important;
          border: 1.5px solid rgba(0,0,0,0.18);
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: border-color 0.22s ease, color 0.22s ease;
          white-space: nowrap;
        }
        html.dark .hw-cta-ghost {
          color: #f2f2f2 !important;
          border-color: rgba(255,255,255,0.18);
        }
        .hw-cta-ghost:hover {
          border-color: #1a7a3c;
          color: #1a7a3c !important;
        }
        html.dark .hw-cta-ghost:hover {
          border-color: #2dc56a;
          color: #2dc56a !important;
        }

        /* Stat strip inside left col */
        .hw-stats {
          display: flex;
          gap: 0;
          padding-top: 32px;
          border-top: 1px solid rgba(0,0,0,0.07);
          opacity: 0;
          transition: opacity 0.65s 0.6s ease;
        }
        html.dark .hw-stats { border-color: rgba(255,255,255,0.07); }
        .hw-stats.hv { opacity: 1; }

        .hw-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-right: 20px;
        }
        .hw-stat + .hw-stat {
          padding-left: 20px;
          padding-right: 0;
          border-left: 1px solid rgba(0,0,0,0.07);
        }
        html.dark .hw-stat + .hw-stat { border-color: rgba(255,255,255,0.07); }

        .hw-stat-n {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.8px;
          color: #0a0a0a;
          line-height: 1;
        }
        html.dark .hw-stat-n { color: #f2f2f2; }

        .hw-stat-l {
          font-size: 10.5px;
          font-weight: 600;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        /* ════ RIGHT COLUMN ════ */
        .hw-right {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #1e8c46 0%, #0f5c2a 45%, #073d1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 520px;
        }
        html.dark .hw-right {
          background: linear-gradient(145deg, #104d26 0%, #072e15 50%, #030f07 100%);
        }

        /* Decorative blobs */
        .hw-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .hw-blob-1 {
          width: 420px; height: 420px;
          background: rgba(45,197,106,0.3);
          top: -120px; right: -100px;
        }
        .hw-blob-2 {
          width: 300px; height: 300px;
          background: rgba(16,185,129,0.2);
          bottom: -100px; left: -60px;
        }
        .hw-blob-3 {
          width: 180px; height: 180px;
          background: rgba(255,255,255,0.06);
          top: 45%; left: 45%;
        }

        /* Grid lines overlay (subtle) */
        .hw-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* Central logo */
        .hw-logo-outer {
          position: relative;
          z-index: 2;
          transition: transform 0.08s linear;
        }
        .hw-logo-ring {
          width: 190px; height: 190px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          animation: hwLogoGlow 4s ease-in-out infinite;
        }
        @keyframes hwLogoGlow {
          0%,100% { box-shadow: 0 0 0 8px rgba(45,197,106,0.08), 0 0 60px rgba(45,197,106,0.25); }
          50%      { box-shadow: 0 0 0 14px rgba(45,197,106,0.12), 0 0 100px rgba(45,197,106,0.4); }
        }
        /* Spinning dashed border */
        .hw-logo-ring::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px dashed rgba(255,255,255,0.2);
          animation: hwSpin 18s linear infinite;
        }
        @keyframes hwSpin { to { transform: rotate(360deg); } }

        .hw-logo-img {
          width: 162px; height: 162px;
          border-radius: 50%;
          object-fit: contain;
          background: #fff;
          padding: 6px;
          box-sizing: border-box;
        }

        /* Floating glass cards */
        .hw-fc {
          position: absolute;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 16px;
          padding: 14px 18px;
          z-index: 3;
          color: #fff;
          min-width: 130px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transition: transform 0.08s linear;
        }
        .hw-fc-top-left  { top: 14%; left: 6%; animation: hwFloatA 6s ease-in-out infinite; }
        .hw-fc-bot-right { bottom: 20%; right: 6%; animation: hwFloatB 7s ease-in-out -2.5s infinite; }
        .hw-fc-top-right { top: 16%; right: 8%; animation: hwFloatC 5.5s ease-in-out -1.5s infinite; }

        @keyframes hwFloatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-11px)} }
        @keyframes hwFloatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes hwFloatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }

        .hw-fc-lbl {
          font-size: 8.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.6;
          margin-bottom: 5px;
          font-family: 'Outfit', sans-serif;
        }
        .hw-fc-num {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -0.5px;
          line-height: 1;
          font-family: 'Outfit', sans-serif;
        }
        .hw-fc-sub {
          font-size: 10px;
          opacity: 0.6;
          margin-top: 3px;
          font-family: 'Outfit', sans-serif;
        }

        /* Floating tag pills */
        .hw-tag {
          position: absolute;
          background: rgba(255,255,255,0.16);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 50px;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          z-index: 3;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .hw-tag-1 { bottom: 28%; left: 8%;  animation: hwFloatC 8s ease-in-out -1s infinite; }
        .hw-tag-2 { bottom: 18%; left: 28%; animation: hwFloatA 7s ease-in-out -3s infinite; }
        .hw-tag-3 { bottom: 12%; right: 12%; animation: hwFloatB 9s ease-in-out -5s infinite; }

        /* ════ RESPONSIVE ════ */
        @media (max-width: 920px) {
          #home { padding: 90px 12px 12px; }
          .hw-outer { grid-template-columns: 1fr; }
          .hw-right { min-height: 460px; order: -1; }
          .hw-left  { padding: 52px 40px; }
          .hw-fc-top-right { display: none; }
        }

        @media (max-width: 620px) {
          #home { padding: 80px 8px 8px; }
          .hw-outer { border-radius: 14px; min-height: auto; }
          .hw-left  { padding: 40px 28px; }
          .hw-h1    { font-size: 36px; letter-spacing: -1.5px; }
          .hw-right { min-height: 380px; }
          .hw-logo-ring { width: 145px; height: 145px; }
          .hw-logo-img  { width: 125px; height: 125px; }
          .hw-fc-bot-right { bottom: 14%; right: 4%; }
          .hw-stats { gap: 0; }
          .hw-stat-n { font-size: 20px; }
          .hw-tag-3 { display: none; }
        }
      `}</style>

      <div className="hw-outer">

        {/* ═══ LEFT ═══ */}
        <div className="hw-left">

          {/* Badge */}
          <div className={`hw-badge${v}`}>
            <span className="hw-badge-dot" />
            {lc.badge}
          </div>

          {/* 3-line headline */}
          <h1 className={`hw-h1${v}`}>
            {lc.hl1}
            <span className="hw-h1-accent">{lc.hl2}</span>
            {lc.hl3}
          </h1>

          {/* Subtitle */}
          <p className={`hw-sub${v}`}>{lc.sub}</p>

          {/* CTA buttons */}
          <div className={`hw-ctas${v}`}>
            <a
              className="hw-cta-solid"
              href="#courses"
              onClick={e => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {lc.cta1} →
            </a>
            <a
              className="hw-cta-ghost"
              href="#about"
              onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {lc.cta2}
            </a>
          </div>

          {/* Inline stat strip */}
          <div className={`hw-stats${v}`}>
            <div className="hw-stat">
              <span className="hw-stat-n">{lc.s1n}</span>
              <span className="hw-stat-l">{lc.s1l}</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-n">{lc.s2n}</span>
              <span className="hw-stat-l">{lc.s2l}</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-n">{lc.s3n}</span>
              <span className="hw-stat-l">{lc.s3l}</span>
            </div>
          </div>

        </div>

        {/* ═══ RIGHT — Vibrant visual panel ═══ */}
        <div
          className="hw-right"
          ref={rightRef}
          onMouseMove={onMove}
          onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        >
          {/* Blobs */}
          <div className="hw-blob hw-blob-1" />
          <div className="hw-blob hw-blob-2" />
          <div className="hw-blob hw-blob-3" />

          {/* Grid texture */}
          <div className="hw-grid" />

          {/* Central logo — mild parallax on mouse */}
          <div
            className="hw-logo-outer"
            style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 7}px)` }}
          >
            <div className="hw-logo-ring">
              <img src={logoImage} alt="IBRAT TA'LIM" className="hw-logo-img" />
            </div>
          </div>

          {/* Floating card — top left — Students */}
          <div
            className="hw-fc hw-fc-top-left"
            style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 14}px)` }}
          >
            <div className="hw-fc-lbl">{lc.c1l}</div>
            <div className="hw-fc-num">{lc.c1n}</div>
            <div className="hw-fc-sub">{lc.c1s}</div>
          </div>

          {/* Floating card — bottom right — Satisfaction */}
          <div
            className="hw-fc hw-fc-bot-right"
            style={{ transform: `translate(${mouse.x * -16}px, ${mouse.y * -11}px)` }}
          >
            <div className="hw-fc-lbl">{lc.c2l}</div>
            <div className="hw-fc-num">{lc.c2n}</div>
            <div className="hw-fc-sub">{lc.c2s}</div>
          </div>

          {/* Floating card — top right — Courses */}
          <div
            className="hw-fc hw-fc-top-right"
            style={{ transform: `translate(${mouse.x * -12}px, ${mouse.y * 18}px)` }}
          >
            <div className="hw-fc-lbl">{lc.c3l}</div>
            <div className="hw-fc-num">{lc.c3n}</div>
            <div className="hw-fc-sub">{lc.c3s}</div>
          </div>

          {/* Course tag pills — bottom area */}
          <div className="hw-tag hw-tag-1">{lc.t1}</div>
          <div className="hw-tag hw-tag-2">{lc.t2}</div>
          <div className="hw-tag hw-tag-3">{lc.t3}</div>

        </div>
      </div>
    </section>
  );
}
