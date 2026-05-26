import { useEffect, useState, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function HeroSection() {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });
  const [leaving, setLeaving] = useState(false);
  const rightRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  const onMouseMove = (e) => {
    const rect = rightRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const cy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setLeaving(false);
    setCardOffset({ x: cx * 18, y: cy * 12 });
  };

  const onMouseLeave = () => {
    setLeaving(true);
    setCardOffset({ x: 0, y: 0 });
  };

  const copy = {
    uz: {
      eyebrow: "Ta'lim markazi · Toshkent · 2016 yildan beri",
      l1: 'Bilim —',
      l2: "o'zgarish",
      l3: 'investitsiya.',
      body: "Xorijiy tillar va bolalar erta rivojlanishiga ixtisoslashgan ta'lim markazi. 9 yillik tajriba, individual yondashuv, tasdiqlangan natijalar.",
      cta1: "Kurslarni ko'rish",
      cta2: "Biz haqimizda",
      c1t: 'BITIRUVCHILAR', c1n: '5,000+', c1l: "dasturni tugatdi",
      c2t: 'MAMNUNLIK',     c2n: '98%',    c2l: "ijobiy baho berdi",
      c3t: 'TAJRIBA',       c3n: '9',      c3l: "yillik faoliyat",
      st1: 'bitiruvchi', st2: 'yil tajriba', st3: 'mamnunlik darajasi',
    },
    ru: {
      eyebrow: "Образовательный центр · Ташкент · с 2016 года",
      l1: 'Знание —',
      l2: 'трансформация',
      l3: 'инвестиция.',
      body: "Образовательный центр с девятилетним опытом в иностранных языках и раннем развитии детей. Индивидуальный подход, измеримые результаты.",
      cta1: "Смотреть курсы",
      cta2: "О нас",
      c1t: 'ВЫПУСКНИКИ',      c1n: '5,000+', c1l: "завершили программу",
      c2t: 'УДОВЛЕТВОРЁННОСТЬ', c2n: '98%',   c2l: "положительных оценок",
      c3t: 'ОПЫТ',             c3n: '9',      c3l: "лет деятельности",
      st1: 'выпускников', st2: 'лет опыта', st3: 'удовлетворённость',
    },
    en: {
      eyebrow: "Educational Centre · Tashkent · est. 2016",
      l1: 'Knowledge —',
      l2: 'transformative',
      l3: 'investment.',
      body: "A Tashkent-based educational centre with nine years of expertise in foreign language instruction and early childhood development.",
      cta1: "Explore courses",
      cta2: "About us",
      c1t: 'GRADUATES',   c1n: '5,000+', c1l: "programme completions",
      c2t: 'SATISFACTION', c2n: '98%',   c2l: "positive ratings",
      c3t: 'EXPERIENCE',  c3n: '9',      c3l: "years of operation",
      st1: 'graduates', st2: 'years', st3: 'satisfaction rate',
    },
  };
  const lc = copy[lang] || copy.uz;

  /* helper: append ibh-vis when mounted */
  const v = (base) => `${base}${mounted ? ' ibh-vis' : ''}`;

  return (
    <section id="home" className="ibh">
      <style>{`
        /* ═══════════════════════════════════════════════════
           IBRAT HERO — Editorial / Institutional
           Monocle × Swiss Design × Copenhagen architecture
        ═══════════════════════════════════════════════════ */

        /* ── CSS Variables: Dark (default) ── */
        .ibh {
          --hbg:   #0D0C0A;
          --htx:   #F0EAE0;
          --hac:   #2DC56A;
          --hmut:  rgba(240,234,224,0.45);
          --hbdr:  rgba(240,234,224,0.08);
          --hrb:   #111009;
          --hca:   #1C1A16;
          --hcb:   #181510;
          --hcc:   #1A1814;
          --hpbg:  #2DC56A;
          --hptx:  #070E09;
          --hgbd:  rgba(240,234,224,0.25);
          --hprog: rgba(240,234,224,0.1);
        }

        /* ── CSS Variables: Light ── */
        html[data-theme="light"] .ibh {
          --hbg:   #F2EDE6;
          --htx:   #0F0E0C;
          --hac:   #1A7A3C;
          --hmut:  rgba(15,14,12,0.45);
          --hbdr:  rgba(15,14,12,0.08);
          --hrb:   #EAE3DA;
          --hca:   #E0D9CF;
          --hcb:   #D4CCBF;
          --hcc:   #DEDAD3;
          --hpbg:  #0F0E0C;
          --hptx:  #F2EDE6;
          --hgbd:  rgba(15,14,12,0.25);
          --hprog: rgba(15,14,12,0.08);
        }

        /* ── Section wrapper ── */
        .ibh {
          background: var(--hbg);
          color: var(--htx);
          font-family: 'Cabinet Grotesk', 'Helvetica Neue', Arial, sans-serif;
          border-radius: 14px;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 84px;
          transition: background-color 0.35s ease, color 0.35s ease;
        }

        /* ── Two-column grid + 1px divider ── */
        .ibh-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          flex: 1;
          min-height: 0;
        }

        /* ═══ LEFT COLUMN ═══ */
        .ibh-left {
          display: flex;
          flex-direction: column;
          padding: 60px 56px 56px;
        }

        /* ── Eyebrow ── */
        .ibh-eye {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .ibh-eye-rule {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--hac);
          flex-shrink: 0;
          transition: background 0.35s ease;
        }
        .ibh-eye-tx {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--htx);
          opacity: 0.4;
          transition: color 0.35s ease;
        }

        /* ── 3-line Fraunces headline ── */
        .ibh-h1 {
          font-family: 'Fraunces', 'Times New Roman', Georgia, serif;
          font-size: clamp(44px, 4.8vw, 70px);
          font-weight: 900;
          letter-spacing: -2.5px;
          line-height: 0.97;
          color: var(--htx);
          margin: 0;
          font-style: normal;
          font-variation-settings: 'opsz' 72, 'wght' 900;
          transition: color 0.35s ease;
        }

        /* overflow wrapper clips the slide-up reveal */
        .ibh-hw {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }

        /* animated line — hidden until .ibh-vis added */
        .ibh-hl {
          display: block;
          transform: translateY(108%);
          transition: transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ibh-hl.ibh-vis {
          transform: translateY(0);
        }

        /* Line 2: italic, weight 300, accent color */
        .ibh-hl-ac {
          font-style: italic;
          color: var(--hac);
          font-variation-settings: 'opsz' 72, 'wght' 300;
          transition: color 0.35s ease;
        }

        /* ── Body copy + CTA block ── */
        .ibh-btm {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* reveal wrapper for body */
        .ibh-bw {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ibh-bw.ibh-vis {
          opacity: 1;
          transform: translateY(0);
        }

        .ibh-body {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.8;
          color: var(--htx);
          opacity: 0.45;
          max-width: 300px;
          margin: 0;
          transition: color 0.35s ease;
        }

        /* ── CTA row ── */
        .ibh-cta {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ibh-cta.ibh-vis {
          opacity: 1;
          transform: translateY(0);
        }

        /* Primary CTA — filled */
        .ibh-cta-pri {
          display: inline-flex;
          align-items: center;
          padding: 11px 24px;
          background: var(--hpbg);
          color: var(--hptx) !important;
          border: 1px solid transparent;
          border-radius: 4px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          text-decoration: none !important;
          cursor: pointer;
          transition:
            background 0.35s ease,
            color 0.35s ease,
            opacity 0.2s ease;
        }
        .ibh-cta-pri:hover { opacity: 0.78; }

        /* Ghost CTA — transparent + 1px border */
        .ibh-cta-gh {
          display: inline-flex;
          align-items: center;
          padding: 11px 24px;
          background: transparent;
          color: var(--htx) !important;
          border: 1px solid var(--hgbd);
          border-radius: 4px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          text-decoration: none !important;
          cursor: pointer;
          transition:
            border-color 0.25s ease,
            color 0.25s ease;
        }
        .ibh-cta-gh:hover {
          border-color: var(--hac);
          color: var(--hac) !important;
        }

        /* ═══ COLUMN DIVIDER ═══ */
        .ibh-vd {
          background: var(--hbdr);
          transition: background 0.35s ease;
        }

        /* ═══ RIGHT COLUMN ═══ */
        .ibh-right {
          background: var(--hrb);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 60px 56px 0;
          position: relative;
          overflow: hidden;
          transition: background 0.35s ease;
        }

        /* ── Card stack (parallax controlled via inline transform) ── */
        .ibh-cards {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          /* position/transform applied inline for parallax */
        }

        /* ── Individual info cards ── */
        .ibh-card {
          display: flex;
          flex-direction: column;
          padding: 20px;
          border: 1px solid var(--hbdr);
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(50px);
          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ibh-card.ibh-vis {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card A: 130×220, bottom-flush */
        .ibh-ca { width: 130px; min-height: 220px; background: var(--hca); }

        /* Card B: 160×280, focal — floats 28px above baseline */
        .ibh-cb { width: 160px; min-height: 280px; background: var(--hcb); margin-bottom: 28px; }

        /* Card C: 115×195, bottom-flush */
        .ibh-cc { width: 115px; min-height: 195px; background: var(--hcc); }

        /* Card internals */
        .ibh-card-tag {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--htx);
          opacity: 0.4;
          display: block;
          transition: color 0.35s ease;
        }
        .ibh-card-sp { flex: 1; display: block; } /* pushes data to bottom */
        .ibh-card-n {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: var(--htx);
          line-height: 1;
          display: block;
          margin-bottom: 5px;
          font-variation-settings: 'opsz' 36, 'wght' 900;
          transition: color 0.35s ease;
        }
        .ibh-card-l {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--htx);
          opacity: 0.45;
          line-height: 1.4;
          display: block;
          margin-bottom: 14px;
          transition: color 0.35s ease;
        }
        /* 2px progress bar — green fill, no gradient */
        .ibh-prog {
          width: 100%;
          height: 2px;
          background: var(--hprog);
          overflow: hidden;
          transition: background 0.35s ease;
        }
        .ibh-prog-f {
          height: 100%;
          background: var(--hac);
          transition: background 0.35s ease;
        }

        /* Watermark */
        .ibh-wm {
          position: absolute;
          bottom: 16px;
          right: 22px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--htx);
          opacity: 0.2;
          transition: color 0.35s ease;
        }

        /* ═══ STAT STRIP ═══ */
        .ibh-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--hbdr);
          transition: border-color 0.35s ease;
          flex-shrink: 0;
        }
        .ibh-stat {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 30px 44px;
        }
        .ibh-stat + .ibh-stat {
          border-left: 1px solid var(--hbdr);
          transition: border-color 0.35s ease;
        }
        .ibh-stat-n {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(30px, 3vw, 44px);
          font-weight: 900;
          letter-spacing: -1.5px;
          color: var(--htx);
          line-height: 1;
          font-variation-settings: 'opsz' 48, 'wght' 900;
          transition: color 0.35s ease;
        }
        .ibh-stat-l {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--htx);
          opacity: 0.4;
          transition: color 0.35s ease;
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 960px) {
          .ibh-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1px auto;
          }
          .ibh-vd { width: 100%; height: 1px; }
          .ibh-left { padding: 48px 32px 44px; }
          .ibh-right { min-height: 420px; padding: 44px 32px 0; }
          .ibh-cards { justify-content: center; }
          .ibh-stats { grid-template-columns: repeat(3, 1fr); }
          .ibh-stat { padding: 24px 28px; }
        }

        @media (max-width: 640px) {
          .ibh { border-radius: 0; padding-top: 80px; }
          .ibh-h1 { letter-spacing: -1.5px; }
          .ibh-left { padding: 36px 24px 36px; }
          .ibh-btm { margin-top: 40px; }
          .ibh-stats { grid-template-columns: 1fr; }
          .ibh-stat + .ibh-stat { border-left: none; border-top: 1px solid var(--hbdr); }
          .ibh-stat { padding: 20px 24px; }
          .ibh-ca { width: 100px; min-height: 180px; }
          .ibh-cb { width: 130px; min-height: 228px; }
          .ibh-cc { width: 90px;  min-height: 162px; }
          .ibh-cards { gap: 10px; }
          .ibh-right { padding: 36px 24px 0; }
        }
      `}</style>

      {/* ═══ TWO-COLUMN GRID ═══ */}
      <div className="ibh-grid">

        {/* ── LEFT: Eyebrow + Headline + Body + CTAs ── */}
        <div className="ibh-left">

          {/* Eyebrow: 24px green rule + 11px uppercase label */}
          <div className="ibh-eye">
            <span className="ibh-eye-rule" />
            <span className="ibh-eye-tx">{lc.eyebrow}</span>
          </div>

          {/* 3-line Fraunces headline */}
          <h1 className="ibh-h1">
            {/* Line 1 — normal weight */}
            <span className="ibh-hw">
              <span className={v('ibh-hl')} style={{ transitionDelay: '0ms' }}>
                {lc.l1}
              </span>
            </span>
            {/* Line 2 — italic weight 300, accent color */}
            <span className="ibh-hw">
              <span className={v('ibh-hl')} style={{ transitionDelay: '100ms' }}>
                <span className="ibh-hl-ac">{lc.l2}</span>
              </span>
            </span>
            {/* Line 3 — normal weight */}
            <span className="ibh-hw">
              <span className={v('ibh-hl')} style={{ transitionDelay: '200ms' }}>
                {lc.l3}
              </span>
            </span>
          </h1>

          {/* Body copy + CTA pinned below headline */}
          <div className="ibh-btm">
            <div className={v('ibh-bw')} style={{ transitionDelay: '250ms' }}>
              <p className="ibh-body">{lc.body}</p>
            </div>
            <div className={v('ibh-cta')} style={{ transitionDelay: '450ms' }}>
              <a
                className="ibh-cta-pri"
                href="#courses"
                onClick={e => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {lc.cta1}
              </a>
              <a
                className="ibh-cta-gh"
                href="#about"
                onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {lc.cta2}
              </a>
            </div>
          </div>
        </div>

        {/* ── 1px VERTICAL DIVIDER ── */}
        <div className="ibh-vd" />

        {/* ── RIGHT: Staggered info cards + watermark ── */}
        <div
          className="ibh-right"
          ref={rightRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {/* Card stack — mouse parallax applied inline */}
          <div
            className="ibh-cards"
            style={{
              transform: `translate(${cardOffset.x}px, ${cardOffset.y}px)`,
              transition: leaving
                ? '0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                : '0.1s linear',
            }}
          >
            {/* Card A — 130×220, bottom-flush */}
            <div className={v('ibh-card ibh-ca')} style={{ transitionDelay: '80ms' }}>
              <span className="ibh-card-tag">{lc.c1t}</span>
              <span className="ibh-card-sp" />
              <span className="ibh-card-n">{lc.c1n}</span>
              <span className="ibh-card-l">{lc.c1l}</span>
              <div className="ibh-prog">
                <div className="ibh-prog-f" style={{ width: '92%' }} />
              </div>
            </div>

            {/* Card B — 160×280, focal, 28px margin-bottom */}
            <div className={v('ibh-card ibh-cb')} style={{ transitionDelay: '200ms' }}>
              <span className="ibh-card-tag">{lc.c2t}</span>
              <span className="ibh-card-sp" />
              <span className="ibh-card-n">{lc.c2n}</span>
              <span className="ibh-card-l">{lc.c2l}</span>
              <div className="ibh-prog">
                <div className="ibh-prog-f" style={{ width: '98%' }} />
              </div>
            </div>

            {/* Card C — 115×195, bottom-flush */}
            <div className={v('ibh-card ibh-cc')} style={{ transitionDelay: '320ms' }}>
              <span className="ibh-card-tag">{lc.c3t}</span>
              <span className="ibh-card-sp" />
              <span className="ibh-card-n">{lc.c3n}</span>
              <span className="ibh-card-l">{lc.c3l}</span>
              <div className="ibh-prog">
                <div className="ibh-prog-f" style={{ width: '75%' }} />
              </div>
            </div>
          </div>

          {/* Corner watermark */}
          <span className="ibh-wm">© 2025 Ibrat</span>
        </div>

      </div>

      {/* ═══ STAT STRIP ═══ */}
      <div className="ibh-stats">
        {[
          { n: '5,000+', l: lc.st1 },
          { n: '9',      l: lc.st2 },
          { n: '98%',    l: lc.st3 },
        ].map((s, i) => (
          <div className="ibh-stat" key={i}>
            <span className="ibh-stat-n">{s.n}</span>
            <span className="ibh-stat-l">{s.l}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
