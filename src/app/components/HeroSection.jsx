import { useRef, useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const G = 'var(--brand-green)';
const glass = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(22px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.8)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
  borderRadius: 20,
};

function DraggableWidget({ children, initial, delay = 0 }) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const [lifted, setLifted] = useState(false);
  const start = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  useEffect(() => {
    const move = (e) => {
      if (!dragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setPos({ x: start.current.px + clientX - start.current.mx, y: start.current.py + clientY - start.current.my });
    };
    const up = () => { setDragging(false); setLifted(false); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', up);
    };
  }, [dragging]);

  const onDown = (e) => {
    setDragging(true);
    setLifted(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    start.current = { mx: clientX, my: clientY, px: pos.x, py: pos.y };
  };

  return (
    <div
      onMouseDown={onDown}
      onTouchStart={onDown}
      className="liquid-glass-droplet"
      style={{
        ...glass,
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        padding: '1.1rem 1.4rem',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        minWidth: 150,
        transform: lifted ? 'scale(1.05) rotate(1deg)' : 'none',
        boxShadow: lifted ? 'var(--glass-hover-shadow)' : glass.boxShadow,
        animation: dragging ? 'none' : `floatWidget 6s ease-in-out ${delay}s infinite`,
        transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.45), box-shadow 0.4s, border-color 0.4s',
        zIndex: dragging ? 50 : 10,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export default function HeroSection() {
  const { T } = useLang();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [sent, setSent] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    { v: 'english', l: 'Ingliz tili' }, { v: 'russian', l: 'Rus tili' },
    { v: 'arabic', l: 'Arab tili' }, { v: 'korean', l: 'Koreys tili' },
    { v: 'mental', l: 'Mental Arifmetika' }, { v: 'montessori', l: 'Montessori' },
  ];

  const handleMiniSubmit = () => {
    if (formName && formPhone) { setSent(true); setTimeout(() => setSent(false), 3000); }
  };

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `var(--hero-overlay), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s',
        transform: `translate3d(0, ${scrollY * 0.35}px, 0) scale(${1 + scrollY * 0.00015})`,
        willChange: 'transform' }} />

      {/* Glow blobs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'var(--card-glow)', filter: 'blur(90px)', top: -150, right: -80, animation: 'blobFloat 20s ease-in-out infinite', zIndex: 0,
        transform: `translate3d(0, ${scrollY * -0.12}px, 0)`,
        willChange: 'transform' }} />
      <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'var(--card-glow)', filter: 'blur(90px)', bottom: -80, left: -60, animation: 'blobFloat 20s ease-in-out -12s infinite', zIndex: 0,
        transform: `translate3d(0, ${scrollY * -0.08}px, 0)`,
        willChange: 'transform' }} />

      {/* Draggable glass widgets */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3,
        transform: `translate3d(0, ${scrollY * 0.22}px, 0)`,
        willChange: 'transform' }}>
        <DraggableWidget initial={{ x: 36, y: 165 }} delay={0}>
          <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🎓</div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: G, lineHeight: 1 }}>1500<span>+</span></div>
          <div style={{ fontSize: '.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>{T('stat_students')}</div>
        </DraggableWidget>

        <DraggableWidget initial={() => ({ x: Math.max(window.innerWidth - 230, 500), y: 165 })} delay={-2}>
          <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>👩‍🏫</div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: G, lineHeight: 1 }}>50<span>+</span></div>
          <div style={{ fontSize: '.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>{T('stat_teachers')}</div>
        </DraggableWidget>

        <DraggableWidget initial={{ x: 36, y: 460 }} delay={-4}>
          <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>⭐</div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: G, lineHeight: 1 }}>5</div>
          <div style={{ fontSize: '.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>{T('stat_years')}</div>
        </DraggableWidget>

        {/* Enroll widget – right-bottom area */}
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(-5%, -40%)' }}>
          <DraggableWidget initial={{ x: 0, y: 0 }} delay={-6}>
            <div style={{ minWidth: 220 }}>
              <h4 style={{ fontSize: '.88rem', fontWeight: 700, marginBottom: '.7rem', color: 'var(--text-primary)' }}>{T('widget_enroll')}</h4>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '1rem 0', color: G, fontWeight: 700 }}>✓ Yuborildi!</div>
              ) : (
                <>
                  <input value={formName} onChange={e => setFormName(e.target.value)}
                    placeholder={T('form_name_w')}
                    style={{ width: '100%', padding: '.5rem .8rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", fontSize: '.82rem', marginBottom: '.4rem', outline: 'none' }} />
                  <input value={formPhone} onChange={e => setFormPhone(e.target.value)}
                    placeholder="+998 __ ___ __ __"
                    style={{ width: '100%', padding: '.5rem .8rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", fontSize: '.82rem', marginBottom: '.4rem', outline: 'none' }} />
                  <select value={formCourse} onChange={e => setFormCourse(e.target.value)}
                    style={{ width: '100%', padding: '.5rem .8rem', background: 'var(--bg-primary)', border: '1px solid var(--input-border)', borderRadius: 8, color: formCourse ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif", fontSize: '.82rem', marginBottom: '.5rem', outline: 'none' }}>
                    <option value="" disabled>{T('form_course_w')}</option>
                    {courses.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                  </select>
                  <button onClick={handleMiniSubmit}
                    style={{ width: '100%', padding: '.5rem', border: 'none', borderRadius: 8, background: G, color: 'var(--btn-text)', fontWeight: 700, fontSize: '.82rem', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", transition: 'background 0.18s' }}>
                    {T('btn_send')} ✓
                  </button>
                </>
              )}
            </div>
          </DraggableWidget>
        </div>
      </div>

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 860, padding: '0 1rem', fontFamily: "'Outfit', sans-serif",
        transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
        opacity: Math.max(1 - scrollY / 650, 0),
        willChange: 'transform, opacity' }}>
        <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: G, marginBottom: '1.2rem', padding: '.3rem 1rem', background: 'var(--card-glow)', borderRadius: 50, border: '1px solid var(--brand-green)' }}>
          {T('hero_label')}
        </div>
        <h1 style={{ fontSize: 'clamp(2.6rem,8vw,6rem)', letterSpacing: -3, lineHeight: 0.95, marginBottom: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
          {T('hero_title_1')}{' '}
          <span style={{ backgroundImage: `linear-gradient(135deg, var(--text-primary) 0%, ${G} 50%, var(--text-primary) 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shine 6s linear infinite' }}>
            {T('hero_title_2')}
          </span>
          <br />{T('hero_title_3')}
        </h1>
        <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: 660, marginInline: 'auto', lineHeight: 1.75 }}>
          {T('hero_sub')}
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#courses" onClick={e => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}
             className="liquid-glass-droplet"
             style={{ display: 'inline-flex', alignItems: 'center', padding: '.9rem 2.2rem', borderRadius: 50, background: G, color: 'var(--btn-text)', fontWeight: 900, fontSize: '.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', textDecoration: 'none' }}>
            {T('btn_explore')}
          </a>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
             className="liquid-glass-droplet"
             style={{ ...glass, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '.9rem 2.2rem', borderRadius: 50, color: 'var(--text-primary)', fontWeight: 900, fontSize: '.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', textDecoration: 'none' }}>
            {T('btn_join')} <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4 }}>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${G})`, animation: 'scrollPulse 2s ease-in-out infinite' }} />
        <i className="fas fa-chevron-down" style={{ color: G, fontSize: '.7rem', animation: 'scrollBounce 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes floatWidget { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.05)} 66%{transform:translate(-20px,25px) scale(.97)} }
        @keyframes shine { to { background-position: 200% center; } }
        @keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
      `}</style>
    </section>
  );
}
