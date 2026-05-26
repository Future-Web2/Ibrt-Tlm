import { useRef, useState, useEffect, useCallback } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import logoImage from '../../publish/image.png';

const G = 'var(--brand-green)';
const glass = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(22px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.8)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
  borderRadius: 20,
};

/* ─── Particle Canvas (cinematic floating sparkles) ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const N = 72;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, `rgba(16,185,129,${a})`);
        grd.addColorStop(1, `rgba(16,185,129,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 1,
        width: '100%', height: '100%', pointerEvents: 'none',
      }}
    />
  );
}

/* ─── Typewriter effect ─── */
function Typewriter({ words, speed = 90, pause = 2000 }) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === current.length) {
      delay = pause;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplay(current.slice(0, charIdx + (deleting ? -1 : 1)));
      setCharIdx((i) => i + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return (
    <span>
      {display}
      <span style={{
        display: 'inline-block', width: '3px', height: '1em',
        background: 'var(--brand-green)', marginLeft: 2, verticalAlign: 'middle',
        animation: 'cursorBlink 1.1s step-start infinite',
        borderRadius: 2,
      }} />
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({ emoji, value, label, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="liquid-glass-droplet" style={{
      ...glass, padding: '1.1rem 1.4rem',
      textAlign: 'center', minWidth: 120,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      cursor: 'default',
    }}>
      <div style={{ fontSize: '1.6rem', marginBottom: 4 }}>{emoji}</div>
      <div style={{
        fontSize: '1.65rem', fontWeight: 900, color: G, lineHeight: 1,
        fontFamily: "'Outfit', sans-serif",
      }}>{value}</div>
      <div style={{ fontSize: '.7rem', color: 'var(--text-secondary)', marginTop: 3, fontWeight: 600, letterSpacing: '0.5px' }}>{label}</div>
    </div>
  );
}

/* ─── Mini enroll widget ─── */
function EnrollWidget({ T, courses }) {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = () => {
    if (formName && formPhone) {
      setSent(true);
      setTimeout(() => { setSent(false); setFormName(''); setFormPhone(''); setFormCourse(''); }, 3500);
    }
  };

  const inputStyle = (id) => ({
    width: '100%', padding: '.55rem .9rem',
    background: focused === id ? 'rgba(16,185,129,0.06)' : 'var(--input-bg, rgba(255,255,255,0.07))',
    border: `1.5px solid ${focused === id ? 'var(--brand-green)' : 'var(--glass-border, rgba(255,255,255,0.2))'}`,
    borderRadius: 10, color: 'var(--text-primary)',
    fontFamily: "'Outfit', sans-serif", fontSize: '.82rem', marginBottom: '.45rem',
    outline: 'none', transition: 'border-color 0.25s, background 0.25s', boxSizing: 'border-box',
  });

  return (
    <div style={{
      ...glass, padding: '1.4rem 1.5rem', borderRadius: 24,
      minWidth: 240, maxWidth: 280, position: 'relative', overflow: 'hidden',
    }}>
      {/* Top glow accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: 2, background: 'linear-gradient(90deg, transparent, var(--brand-green), transparent)',
        borderRadius: '0 0 4px 4px',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '.8rem', flexShrink: 0,
        }}>⚡</span>
        <h4 style={{ fontSize: '.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          {T('widget_enroll')}
        </h4>
      </div>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '1.2rem 0' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '.4rem' }}>🎉</div>
          <div style={{ color: G, fontWeight: 800, fontSize: '.9rem' }}>Yuborildi!</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '.75rem', marginTop: 4 }}>Tez orada bog'lanamiz</div>
        </div>
      ) : (
        <>
          <input value={formName} onChange={e => setFormName(e.target.value)}
            placeholder={T('form_name_w')}
            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
            style={inputStyle('name')} />
          <input value={formPhone} onChange={e => setFormPhone(e.target.value)}
            placeholder="+998 __ ___ __ __"
            onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
            style={inputStyle('phone')} />
          <select value={formCourse} onChange={e => setFormCourse(e.target.value)}
            onFocus={() => setFocused('course')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('course'), color: formCourse ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', background: 'var(--bg-primary, #fff)' }}>
            <option value="" disabled>{T('form_course_w')}</option>
            {courses.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
          </select>
          <button onClick={handleSubmit} style={{
            width: '100%', padding: '.55rem', border: 'none', borderRadius: 10,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff', fontWeight: 800, fontSize: '.82rem', cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
            boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(16,185,129,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(16,185,129,0.4)'; }}
          >
            {T('btn_send')} →
          </button>
        </>
      )}
    </div>
  );
}

/* ─── Main Section ─── */
export default function HeroSection() {
  const { T, lang } = useLang();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  const typewriterWords = {
    uz: ['Ingliz tilini', 'Rus tilini', 'Arab tilini', 'Koreys tilini', 'Mental Arifmetika'],
    ru: ['Английский язык', 'Русский язык', 'Арабский язык', 'Корейский язык', 'Ментальную арифметику'],
    en: ['English', 'Russian', 'Arabic', 'Korean', 'Mental Arithmetic'],
  };

  const courses = [
    { v: 'english', l: 'Ingliz tili' }, { v: 'russian', l: 'Rus tili' },
    { v: 'arabic', l: 'Arab tili' }, { v: 'korean', l: 'Koreys tili' },
    { v: 'mental', l: 'Mental Arifmetika' }, { v: 'montessori', l: 'Montessori' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  }, []);

  const tiltX = mousePos.y * -8;
  const tiltY = mousePos.x * 10;

  const stats = [
    { emoji: '🎓', value: '1500+', label: T('stat_students'), delay: 600 },
    { emoji: '👩‍🏫', value: '50+', label: T('stat_teachers'), delay: 750 },
    { emoji: '⭐', value: '5', label: T('stat_years'), delay: 900 },
    { emoji: '📚', value: '8+', label: lang === 'uz' ? 'Kurs turlari' : lang === 'ru' ? 'Видов курсов' : 'Course types', delay: 1050 },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative',
        overflow: 'hidden', paddingTop: 90,
        fontFamily: "'Outfit', sans-serif",
      }}
    >

      {/* ── Parallax background image ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(${1 + scrollY * 0.0002})`,
        willChange: 'transform',
        filter: 'brightness(0.35) saturate(1.2)',
      }} />

      {/* ── Dark cinematic gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          radial-gradient(ellipse 70% 60% at 50% 40%, rgba(2,44,34,0.55) 0%, transparent 70%),
          linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(2,20,14,0.75) 60%, rgba(1,8,5,0.92) 100%)
        `,
      }} />

      {/* ── Green aurora glow top-right ── */}
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
        top: -250, right: -150, zIndex: 1,
        transform: `translate3d(${mousePos.x * -18}px, ${scrollY * -0.1 + mousePos.y * -12}px, 0)`,
        transition: 'transform 0.08s linear',
        willChange: 'transform',
      }} />
      {/* ── Green aurora glow bottom-left ── */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        bottom: -200, left: -80, zIndex: 1,
        transform: `translate3d(${mousePos.x * 12}px, ${scrollY * -0.06 + mousePos.y * 10}px, 0)`,
        transition: 'transform 0.08s linear',
        willChange: 'transform',
      }} />

      {/* ── Particle canvas ── */}
      <ParticleField />

      {/* ── Grid overlay texture ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: `
          linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        position: 'relative', zIndex: 5, width: '100%', maxWidth: 1280,
        padding: '0 2rem', display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
        opacity: Math.max(1 - scrollY / 680, 0),
        willChange: 'transform, opacity',
      }}>

        {/* ── Top layout: Stats left | Logo center | Enroll right ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', gap: '2rem', marginBottom: '3rem',
        }} className="hero-top-layout">

          {/* Stat Cards - Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', flexShrink: 0 }} className="hero-stats">
            {stats.slice(0, 2).map(s => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Central Logo + Headline Block */}
          <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>

            {/* ── Badge ── */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: '.72rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
              color: '#10b981', marginBottom: '1.4rem', padding: '.35rem 1.1rem',
              background: 'rgba(16,185,129,0.1)', borderRadius: 50,
              border: '1px solid rgba(16,185,129,0.35)',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulseDot 2s infinite' }} />
              {T('hero_label')}
            </div>

            {/* ── Logo with 3D mouse tilt ── */}
            <div style={{
              display: 'flex', justifyContent: 'center', marginBottom: '1.8rem',
              opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.7)',
              transition: 'opacity 0.8s 0.2s, transform 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <div style={{
                transform: `perspective(600px) rotateX(${tiltX * 0.5}deg) rotateY(${tiltY * 0.5}deg)`,
                transition: 'transform 0.08s linear',
                willChange: 'transform',
              }}>
                {/* Outer glow ring */}
                <div style={{
                  width: 160, height: 160, borderRadius: '50%', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Spinning border */}
                  <div style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent 0%, #10b981 25%, transparent 50%, #10b981 75%, transparent 100%)',
                    animation: 'spinRing 4s linear infinite',
                  }} />
                  {/* Inner white ring */}
                  <div style={{
                    position: 'absolute', inset: -2, borderRadius: '50%',
                    background: 'rgba(2,20,14,0.95)',
                  }} />
                  {/* Logo container */}
                  <div style={{
                    width: 150, height: 150, borderRadius: '50%', position: 'relative', zIndex: 2,
                    background: '#fff',
                    boxShadow: '0 0 0 3px rgba(16,185,129,0.5), 0 20px 60px rgba(16,185,129,0.35), 0 0 80px rgba(16,185,129,0.15)',
                    animation: 'logoBreathe 4s ease-in-out infinite',
                    overflow: 'hidden',
                  }}>
                    <img src={logoImage} alt="IBRAT TA'LIM Logo"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                  </div>
                  {/* Orbiting dot */}
                  <div style={{
                    position: 'absolute', inset: -8, borderRadius: '50%',
                    animation: 'orbitDot 3s linear infinite',
                    pointerEvents: 'none',
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: 'var(--brand-green)',
                      boxShadow: '0 0 12px 4px rgba(16,185,129,0.7)',
                      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── H1 Title ── */}
            <h1 style={{
              fontSize: 'clamp(2.4rem,6.5vw,5.2rem)',
              letterSpacing: -2, lineHeight: 1.0,
              marginBottom: '0.8rem', fontWeight: 900,
              color: '#ffffff',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s 0.35s, transform 0.7s 0.35s',
            }}>
              {T('hero_title_1')}{' '}
              <span style={{
                backgroundImage: `linear-gradient(135deg, #10b981 0%, #34d399 40%, #6ee7b7 70%, #10b981 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shine 4s linear infinite',
                display: 'inline-block',
              }}>
                {T('hero_title_2')}
              </span>
              <br />
              {T('hero_title_3')}
            </h1>

            {/* ── Typewriter subtitle ── */}
            <div style={{
              fontSize: 'clamp(1rem,2.2vw,1.25rem)',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '1rem', lineHeight: 1.5, fontWeight: 400,
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.7s 0.5s, transform 0.7s 0.5s',
            }}>
              {lang === 'uz' ? "O'rganing: " : lang === 'ru' ? 'Изучайте: ' : 'Learn: '}
              <span style={{ color: '#10b981', fontWeight: 700 }}>
                <Typewriter words={typewriterWords[lang] || typewriterWords.uz} />
              </span>
            </div>

            {/* ── Sub text ── */}
            <p style={{
              fontSize: 'clamp(0.88rem,1.5vw,1.05rem)',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2.2rem', maxWidth: 560, marginInline: 'auto', lineHeight: 1.75,
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.7s 0.65s, transform 0.7s 0.65s',
            }}>
              {T('hero_sub')}
            </p>

            {/* ── CTA Buttons ── */}
            <div style={{
              display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.7s 0.8s, transform 0.7s 0.8s',
            }}>
              <a href="#courses"
                onClick={e => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="liquid-glass-droplet"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '1rem 2.4rem', borderRadius: 50,
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff', fontWeight: 800, fontSize: '.9rem',
                  textTransform: 'uppercase', letterSpacing: '1.5px', textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(16,185,129,0.45)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                <i className="fas fa-rocket" style={{ fontSize: '.85rem' }} />
                {T('btn_explore')}
              </a>
              <a href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="liquid-glass-droplet"
                style={{
                  ...glass,
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '1rem 2.4rem', borderRadius: 50,
                  color: '#fff', fontWeight: 800, fontSize: '.9rem',
                  textTransform: 'uppercase', letterSpacing: '1.5px', textDecoration: 'none',
                  borderColor: 'rgba(16,185,129,0.4)',
                }}>
                {T('btn_join')}
                <i className="fas fa-arrow-right" style={{ fontSize: '.8rem' }} />
              </a>
            </div>

          </div>

          {/* Enroll widget — right */}
          <div style={{
            flexShrink: 0,
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 0.7s 0.9s, transform 0.7s 0.9s',
          }} className="hero-enroll">
            <EnrollWidget T={T} courses={courses} />
          </div>

        </div>

        {/* ── Bottom stats row (remaining 2 stats) ── */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.7s 1.1s, transform 0.7s 1.1s',
        }} className="hero-stats-bottom">
          {stats.slice(2).map(s => (
            <StatCard key={s.label} {...s} />
          ))}
          {/* Course tag chips */}
          {['🇬🇧 English', '🇷🇺 Русский', '🇸🇦 Arab', '🇰🇷 Korean', '🧮 Mental', '🌱 Montessori'].map((tag, i) => (
            <div key={tag} className="liquid-glass-droplet" style={{
              ...glass, padding: '.45rem 1rem', borderRadius: 50,
              fontSize: '.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)',
              letterSpacing: '.5px', cursor: 'default',
              opacity: mounted ? 1 : 0,
              transition: `opacity 0.5s ${1.2 + i * 0.07}s`,
            }}>
              {tag}
            </div>
          ))}
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: mounted ? 0.55 : 0, transition: 'opacity 0.8s 1.5s',
      }}>
        <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 4 }}>
          {lang === 'uz' ? "O'ganing" : lang === 'ru' ? 'Прокрутите' : 'Scroll'}
        </div>
        <div style={{
          width: 26, height: 44, borderRadius: 20,
          border: '2px solid rgba(16,185,129,0.4)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: 5,
        }}>
          <div style={{
            width: 5, height: 10, borderRadius: 3,
            background: 'linear-gradient(to bottom, #10b981, transparent)',
            animation: 'mouseScroll 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes floatWidget { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.05)} 66%{transform:translate(-20px,25px) scale(.97)} }
        @keyframes shine { to { background-position: 200% center; } }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes orbitDot { to { transform: rotate(360deg); } }
        @keyframes logoBreathe {
          0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.5), 0 20px 60px rgba(16,185,129,0.35), 0 0 80px rgba(16,185,129,0.15); }
          50% { box-shadow: 0 0 0 6px rgba(16,185,129,0.7), 0 25px 70px rgba(16,185,129,0.5), 0 0 120px rgba(16,185,129,0.25); }
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes mouseScroll {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(16px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        /* Responsive Hero */
        @media (max-width: 1100px) {
          .hero-top-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-stats {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            order: 2 !important;
          }
          .hero-enroll {
            order: 3 !important;
          }
        }

        @media (max-width: 600px) {
          .hero-top-layout {
            gap: 1.2rem !important;
          }
          .hero-enroll {
            width: 100% !important;
          }
          .hero-enroll > div {
            min-width: unset !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
