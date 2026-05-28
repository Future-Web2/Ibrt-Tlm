import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useLang } from '../context/LanguageContext.jsx';
import HeroSection from './HeroSection.jsx';
import { courses } from '../data/courses.js';
import filialImage from '../../publish/image.png';

const G = 'var(--brand-green)';
const F = "'Outfit', sans-serif";

const glass = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(22px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.8)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
};

function SectionLabel({ label }) {
  return (
    <div style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: G, marginBottom: '1rem', padding: '.28rem .9rem', background: 'var(--card-glow)', borderRadius: 50, border: '1px solid var(--brand-green)', fontFamily: F }}>
      {label}
    </div>
  );
}

function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.ibrat-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

function useCounter(active, target, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

function StatCard({ target, suffix, label }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const val = useCounter(active, target);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="ibrat-reveal liquid-glass-card" style={{ borderRadius: 24, padding: '2.5rem 1.5rem', textAlign: 'center', opacity: 0, transform: 'translateY(30px)' }}>
      <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, marginBottom: '.4rem', backgroundImage: `linear-gradient(135deg, var(--text-primary), ${G}, var(--text-primary))`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shine 6s linear infinite', fontFamily: F }}>
        {val}{suffix}
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '.93rem', fontWeight: 500, fontFamily: F }}>{label}</p>
    </div>
  );
}



export default function HomePage() {
  const { T } = useLang();
  const [activeTab, setActiveTab] = useState('all');
  useReveal([activeTab]);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSent, setFormSent] = useState(false);

  const carouselRef = useRef(null);
  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    }
  };



  const filteredCourses = activeTab === 'all' ? courses : courses.filter(c => c.cat.includes(activeTab));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormName(''); setFormPhone(''); setFormCourse(''); setFormMsg('');
  };

  const gCard = (extra = {}) => ({
    ...glass, borderRadius: 24, padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden',
    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, border-color 0.4s', ...extra,
  });

  const onHoverCard = (e, on) => {
    const el = e.currentTarget;
    el.style.transform = on ? 'translateY(-8px)' : '';
    el.style.boxShadow = on ? 'var(--glass-hover-shadow)' : 'var(--glass-shadow)';
  };

  const section = (id, extra = {}) => ({
    padding: '100px 0', position: 'relative', zIndex: 1, fontFamily: F, ...extra,
  });

  const container = { width: '90%', maxWidth: 1280, margin: '0 auto' };

  const branches = [
    { nameKey: 'br_1_name', addrKey: 'br_1_addr', lmKey: 'br_1_lm', phone: '+998 90 006-10-20', mapUrl: 'https://yandex.uz/maps/-/CPsPMNNk', img: filialImage },
    { nameKey: 'br_2_name', addrKey: 'br_2_addr', lmKey: 'br_2_lm', phone: '+998 90 007-80-21', mapUrl: 'https://yandex.uz/maps/-/CPsPUNpO', img: filialImage },
    { nameKey: 'br_3_name', addrKey: 'br_3_addr', lmKey: 'br_3_lm', phone: '+998 90 131-66-01', mapUrl: 'https://maps.app.goo.gl/h14hi4GQZeVR2tuj8', img: filialImage },
  ];

  const gallery = [
    { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80', key: 'g1' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', key: 'g2' },
    { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80', key: 'g3' },
    { src: 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=600&q=80', key: 'g4' },
    { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', key: 'g5' },
    { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80', key: 'g6' },
  ];

  const testimonials = [
    { initial: 'N', nameKey: 'Nargiza T.', roleKey: 't1_role', textKey: 't1_text', icon: 'fa-child' },
    { initial: 'A', nameKey: 'Alisher M.', roleKey: 't2_role', textKey: 't2_text', icon: 'fa-user-graduate' },
    { initial: 'D', nameKey: 'Dilnoza R.', roleKey: 't3_role', textKey: 't3_text', icon: 'fa-brain' },
    { initial: 'S', nameKey: 'Sanjar B.', roleKey: 't4_role', textKey: 't4_text', icon: 'fa-award' },
    { initial: 'M', nameKey: 'Malika K.', roleKey: 't5_role', textKey: 't5_text', icon: 'fa-comments' },
    { initial: 'B', nameKey: 'Bobur Y.', roleKey: 't6_role', textKey: 't6_text', icon: 'fa-shapes' },
  ];

  const courseSelectOptions = [
    { v: 'english', l: 'Ingliz tili' }, { v: 'russian', l: 'Rus tili' },
    { v: 'arabic', l: 'Arab tili' }, { v: 'korean', l: 'Koreys tili' },
    { v: 'ielts', l: 'IELTS / DTM' }, { v: 'mental', l: 'Mental Arifmetika' },
    { v: 'montessori', l: 'Montessori' }, { v: 'speedread', l: "Tez O'qish" },
  ];

  return (
    <div style={{ fontFamily: F, position: 'relative', overflow: 'hidden' }}>
      
      {/* --- Dynamic Background Shapes --- */}
      <div className="dynamic-shape anim-float-1 anim-pulse" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', top: '10%', left: '-10%' }} />
      <div className="dynamic-shape anim-float-2 anim-pulse" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', top: '40%', right: '-15%' }} />
      <div className="dynamic-shape anim-float-1 anim-pulse" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)', bottom: '10%', left: '20%', animationDelay: '2s' }} />
      

      <HeroSection />



      {/* ── STATS, PROCESS, BRANCHES ── */}
      <div style={{ position: 'relative', zIndex: 12 }}>

          {/* ── STATS (MILLENNIAL EMOTIONAL) ─────────────────────────────────────── */}
          <section style={{ ...section(), padding: '80px 0', position: 'relative', overflow: 'hidden', pointerEvents: 'auto' }}>
            <div style={container}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2.5rem' }}>
                {[
                  { n: '1500+', t: "Baxtli ota-onalar", st: "Farzandlar kelajagiga ishonch", delay: '0s' },
                  { n: '50+', t: "Professional ustozlar", st: "Katta tajribaga ega", delay: '0.1s' },
                  { n: '100%', t: "Xavfsiz muhit", st: "Farzandingiz nazoratda", delay: '0.2s' },
                  { n: '5', t: "Yillik tajriba", st: "Sifatli ta'lim kafolati", delay: '0.3s' },
                ].map(s => (
                  <div key={s.t} className="ibrat-reveal liquid-glass-card"
                    style={{
                      borderRadius: '32px',
                      padding: '2.5rem 1.5rem',
                      textAlign: 'center',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: `opacity .8s ${s.delay}, transform .8s ${s.delay}`,
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                  >
                    <div style={{ 
                      fontSize: '3rem', 
                      fontWeight: 900, 
                      lineHeight: 1, 
                      marginBottom: '.8rem', 
                      backgroundImage: `linear-gradient(135deg, var(--text-primary), ${G}, var(--text-primary))`, 
                      backgroundSize: '200% auto', 
                      WebkitBackgroundClip: 'text', 
                      WebkitTextFillColor: 'transparent', 
                      backgroundClip: 'text', 
                      animation: 'shine 6s linear infinite', 
                      fontFamily: F 
                    }}>
                      {s.n}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '.3rem' }}>{s.t}</div>
                    <div style={{ fontSize: '.85rem', color: 'var(--text-secondary)' }}>{s.st}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROCESS ROADMAP ───────────────────────────────────── */}
          <section id="process" style={{ ...section(), pointerEvents: 'auto' }}>
            <div style={container}>
              <div className="ibrat-reveal" style={{ textAlign: 'center', marginBottom: '4rem', opacity: 0, transform: 'translateY(30px)', transition: 'opacity .8s, transform .8s' }}>
                <SectionLabel label="Bolaning yo'li" />
                <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                  Muvaffaqiyat <span style={{ color: G, textShadow: `0 0 20px var(--card-glow)` }}>Xaritasi</span>
                </h2>
              </div>
              <div className="process-roadmap" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {/* Neon Line background (hidden on small screens, handled in CSS) */}
                <div className="ibrat-roadmap-line" style={{ position: 'absolute', top: '40px', left: '10%', right: '10%', height: '4px', background: 'var(--glass-border)', zIndex: 0, borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--brand-green), transparent)', animation: 'flyLeftToRight 3s linear infinite' }} />
                </div>

                {[
                  { icon: 'fa-user-plus', n: '01', t: 'proc_1', p: 'proc_1_p', d: '0s' },
                  { icon: 'fa-search', n: '02', t: 'proc_2', p: 'proc_2_p', d: '.1s' },
                  { icon: 'fa-book-reader', n: '03', t: 'proc_3', p: 'proc_3_p', d: '.2s' },
                  { icon: 'fa-graduation-cap', n: '04', t: 'proc_4', p: 'proc_4_p', d: '.3s' },
                ].map((s, i) => (
                  <div key={s.n} className="ibrat-reveal liquid-glass-card"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      flex: '1 1 220px',
                      maxWidth: '280px',
                      textAlign: 'center',
                      opacity: 0,
                      transform: 'translateY(30px)',
                      borderRadius: '28px',
                      padding: '2.2rem 1.2rem',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                  >
                    <div className="proc-ico-wrap" style={{ margin: '0 auto 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'var(--brand-green)', transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                      <i className={`fas ${s.icon}`} />
                    </div>
                    <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--card-glow)', color: 'var(--brand-green)', borderRadius: '20px', fontSize: '.7rem', fontWeight: 900, marginBottom: '12px' }}>QADAM {s.n}</div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '.6rem', color: 'var(--text-primary)', fontWeight: 800 }}>{T(s.t)}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '.88rem', lineHeight: 1.6 }}>{T(s.p)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── BRANCHES ──────────────────────────────────── */}
          <section id="branches" style={{ ...section(), pointerEvents: 'auto' }}>
            <div style={container}>
              <div className="ibrat-reveal" style={{ marginBottom: '3rem', opacity: 0, transform: 'translateY(30px)', transition: 'opacity .8s, transform .8s' }}>
                <SectionLabel label={T('branches_label')} />
                <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '.5rem' }}>
                  {T('branches_title')} <span style={{ backgroundImage: `linear-gradient(135deg, var(--text-primary), ${G}, var(--text-primary))`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shine 6s linear infinite' }}>{T('branches_title_green')}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{T('branches_sub')}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))', gap: '2rem' }}>
                {branches.map((b, i) => (
                  <div key={b.nameKey} className="ibrat-reveal liquid-glass-card" style={{ ...glass, borderRadius: 24, overflow: 'hidden', opacity: 0, transform: 'translateY(30px)' }}>
                    <div style={{ width: '100%', height: 220, overflow: 'hidden' }}>
                      <img src={b.img} alt={T(b.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .7s cubic-bezier(0.16,1,0.3,1)' }} />
                    </div>
                    <div style={{ padding: '1.8rem' }}>
                      <h3 style={{ fontSize: '1.15rem', marginBottom: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
                        <i className="fas fa-building" style={{ color: G }} /> {T(b.nameKey)}
                      </h3>
                      {[
                        { icon: 'fa-map-marker-alt', label: T('label_location'), val: T(b.addrKey) },
                        { icon: 'fa-compass', label: T('label_landmark'), val: T(b.lmKey) },
                        { icon: 'fa-clock', label: T('label_hours'), val: '09:00 – 20:00 (Du–Sha)' },
                        { icon: 'fa-phone-alt', label: T('label_phone'), val: b.phone },
                      ].map(d => (
                        <div key={d.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '.9rem' }}>
                          <i className={`fas ${d.icon}`} style={{ color: G, fontSize: '.88rem', marginTop: 3, width: 16, flexShrink: 0 }} />
                          <div>
                            <span style={{ display: 'block', fontSize: '.66rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: G, fontWeight: 700, marginBottom: 1 }}>{d.label}</span>
                            <span style={{ fontSize: '.88rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>{d.val}</span>
                          </div>
                        </div>
                      ))}
                      <a href={b.mapUrl} target={b.mapUrl !== '#' ? '_blank' : undefined} rel="noopener noreferrer"
                        className="liquid-glass-droplet"
                        style={{ ...glass, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '.7rem 1rem', borderRadius: 12, color: 'var(--text-primary)', fontSize: '.85rem', fontWeight: 700, textDecoration: 'none', marginTop: '1.5rem' }}>
                        <i className="fas fa-map-marked-alt" /> {T('btn_map')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

      {/* ── COURSES ───────────────────────────────────── */}
      <section id="courses" style={{ ...section(), background: 'var(--course-bg)', backgroundSize: '400% 400%', animation: 'gradBG 18s ease infinite' }}>
        <div style={container}>
          <div className="ibrat-reveal" style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0, transform: 'translateY(30px)', transition: 'opacity .8s, transform .8s' }}>
            <SectionLabel label={T('courses_label')} />
            <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              {T('courses_title')} <span style={{ color: G, textShadow: `0 0 20px var(--card-glow)` }}>{T('courses_title_green')}</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="ibrat-reveal" style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', opacity: 0, transform: 'translateY(20px)', transition: 'opacity .8s .1s, transform .8s .1s' }}>
            {[
              { id: 'all', key: 'tab_all' }, { id: 'lang', key: 'tab_lang' },
              { id: 'kids', key: 'tab_kids' }, { id: 'exam', key: 'tab_exam' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="liquid-glass-droplet"
                style={{
                  padding: '.55rem 1.2rem', borderRadius: 50, fontSize: '.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', fontFamily: F,
                  background: activeTab === tab.id ? G : 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid transparent'
                }}>
                {T(tab.key)}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '2rem' }}>
            {filteredCourses.map((c, i) => (
              <Link to={`/course/${c.id}`} key={c.id} className="ibrat-reveal liquid-glass-card"
                style={{ borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', transition: `opacity .8s ${i * 0.1}s, transform .8s ${i * 0.1}s`, cursor: 'pointer', position: 'relative', opacity: 0, transform: 'translateY(30px)' }}>
                <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative' }}>
                  <img className="ibrat-course-img" src={c.image} alt={T(c.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)', pointerEvents: 'none' }} />

                  {/* Badge & Level */}
                  <div style={{ position: 'absolute', top: 15, right: 15, display: 'flex', gap: '8px' }}>
                    {c.level && <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: '#fff', padding: '5px 12px', borderRadius: 50, fontWeight: 700, fontSize: '.7rem', border: '1px solid rgba(255,255,255,0.2)' }}>{c.level}</div>}
                    <div style={{ background: c.badgeColor, color: c.badgeColor === '#f59e0b' || c.badgeColor === '#06b6d4' ? '#000' : '#fff', padding: '5px 12px', borderRadius: 50, fontWeight: 900, fontSize: '.7rem', boxShadow: `0 0 20px ${c.badgeColor}80` }}>
                      {c.badge}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column', background: 'var(--glass-bg)' }}>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '.6rem', color: 'var(--text-primary)', fontWeight: 800 }}>{T(c.nameKey)}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>{T(c.descKey)}</p>

                  {/* Skill Tags */}
                  {c.features && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                      {c.features.slice(0, 3).map(f => (
                        <span key={f} style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '.7rem', padding: '4px 10px', borderRadius: '8px', fontWeight: 700, transition: 'color 0.3s' }}
                          onMouseEnter={e => e.currentTarget.style.color = c.badgeColor}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.2rem', borderTop: '1px solid var(--section-border)' }}>
                    <span style={{ color: 'var(--text-primary)', fontSize: '.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="far fa-clock" style={{ color: c.badgeColor }} /> {c.duration}
                    </span>
                    <span style={{ color: c.badgeColor, fontSize: '.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {T('learn_more')} <i className="fas fa-arrow-right" style={{ fontSize: '.75rem', transition: 'transform .2s' }} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Branches section was successfully moved inside the sticky book parallax track overlays to achieve a seamless scrolling presentation. */}

      {/* ── GALLERY (INFINITE MARQUEE) ───────────────────────────────────── */}
      <section id="gallery" style={{ ...section(), overflow: 'hidden' }}>
        <div style={container}>
          <div className="ibrat-reveal" style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0, transform: 'translateY(30px)', transition: 'opacity .8s, transform .8s' }}>
            <SectionLabel label={T('gallery_label')} />
            <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              {T('gallery_title')} <span style={{ backgroundImage: `linear-gradient(135deg, var(--text-primary), ${G}, var(--text-primary))`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shine 6s linear infinite' }}>{T('gallery_title_green')}</span>
            </h2>
          </div>
        </div>

        {/* Top Row: Scrolls Left */}
        <div className="ibrat-marquee-container" style={{ position: 'relative', width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', overflow: 'hidden', display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', padding: '10px 0' }}>
          <div className="ibrat-marquee-track ibrat-track-left" style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}>
            {[...gallery, ...gallery, ...gallery].map((g, i) => (
              <div key={i} className="ibrat-gallery-item" style={{ width: '350px', height: '250px', borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer', flexShrink: 0, border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                <img src={g.src} alt={T(g.key)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(0.16,1,0.3,1)' }} />
                <div className="ibrat-gallery-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)', opacity: 0, display: 'flex', alignItems: 'flex-end', padding: '1.5rem', transition: 'opacity .4s', pointerEvents: 'none' }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', display: 'block', transition: 'transform .4s', transform: 'translateY(15px)' }}>{T(g.key)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Scrolls Right */}
        <div className="ibrat-marquee-container" style={{ position: 'relative', width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', overflow: 'hidden', display: 'flex', gap: '1.5rem', padding: '10px 0' }}>
          <div className="ibrat-marquee-track ibrat-track-right" style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}>
            {[...gallery].reverse().concat([...gallery].reverse(), [...gallery].reverse()).map((g, i) => (
              <div key={i} className="ibrat-gallery-item" style={{ width: '350px', height: '250px', borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer', flexShrink: 0, border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                <img src={g.src} alt={T(g.key)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(0.16,1,0.3,1)' }} />
                <div className="ibrat-gallery-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)', opacity: 0, display: 'flex', alignItems: 'flex-end', padding: '1.5rem', transition: 'opacity .4s', pointerEvents: 'none' }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', display: 'block', transition: 'transform .4s', transform: 'translateY(15px)' }}>{T(g.key)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .ibrat-gallery-item:hover .ibrat-gallery-overlay { opacity: 1 !important; }
          .ibrat-gallery-item:hover .ibrat-gallery-overlay span { transform: translateY(0) !important; }
          .ibrat-gallery-item:hover img { transform: scale(1.1); }
          
          /* Pause animation on hover */
          .ibrat-marquee-container:hover .ibrat-marquee-track { animation-play-state: paused; }

          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); } /* Since we duplicated array 3 times, scroll exactly 1/3 of total width */
          }
          @keyframes scrollRight {
            0% { transform: translateX(-33.3333%); }
            100% { transform: translateX(0); }
          }
          
          .ibrat-track-left { animation: scrollLeft 40s linear infinite; }
          .ibrat-track-right { animation: scrollRight 40s linear infinite; }
          
          /* Responsive sizes */
          @media(max-width: 768px) {
            .ibrat-gallery-item { width: 280px !important; height: 200px !important; }
          }
          
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* ── TESTIMONIALS (SOCIAL PROOF UX) ──────────────────────────────── */}
      <section id="testimonials" style={section()}>
        <div style={container}>
          <div className="ibrat-reveal" style={{ textAlign: 'center', marginBottom: '4rem', opacity: 0, transform: 'translateY(30px)', transition: 'opacity .8s, transform .8s' }}>
            <SectionLabel label={T('reviews_label')} />
            <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              {T('reviews_title')} <span style={{ color: G, textShadow: `0 0 20px var(--card-glow)` }}>{T('reviews_title_green')}</span>
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div 
              ref={carouselRef}
              className="no-scrollbar"
              style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                scrollSnapType: 'x mandatory', 
                gap: '2rem', 
                paddingBottom: '2rem',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              {testimonials.map((t, i) => (
                <div key={t.initial} className="ibrat-reveal liquid-glass-card" style={{ minWidth: '320px', maxWidth: '380px', flex: '0 0 auto', scrollSnapAlign: 'start', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', padding: '2.5rem', borderRadius: '24px', boxShadow: 'var(--glass-shadow)', opacity: 0, transform: 'translateY(30px)', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>

                  {/* Micro Glow on hover */}
                  <div className="ibrat-testimonial-glow" style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--brand-green)', filter: 'blur(80px)', opacity: 0, transition: 'opacity 0.4s', borderRadius: '50%', pointerEvents: 'none' }} />

                  {/* Top User Info with Verified Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 55, height: 55, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', flexShrink: 0, boxShadow: `0 5px 15px rgba(16,185,129,0.3)` }}>
                      <i className={`fas ${t.icon}`} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {t.nameKey}
                        <i className="fas fa-check-circle" style={{ color: '#3b82f6', fontSize: '1rem', textShadow: '0 0 10px rgba(59,130,246,0.5)' }} title="Tasdiqlangan foydalanuvchi"></i>
                      </div>
                      <div style={{ fontSize: '.85rem', color: 'var(--brand-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>✔️ {T(t.roleKey)}</div>
                    </div>
                  </div>

                  <div style={{ color: '#f59e0b', fontSize: '.85rem', letterSpacing: '4px', marginBottom: '1.2rem', textShadow: '0 0 10px rgba(245,158,11,0.3)', display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map(star => <i key={star} className="fas fa-star" />)}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>"{T(t.textKey)}"</p>

                  <i className="fas fa-quote-right" style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '4rem', color: 'var(--glass-border)', opacity: 0.3, zIndex: 0 }} />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
              <button 
                onClick={() => scrollCarousel(-1)} 
                style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid var(--brand-green)', background: 'var(--card-glow)', color: 'var(--brand-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', fontSize: '1.2rem' }} 
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-green)'; e.currentTarget.style.color = 'var(--bg-primary)'; }} 
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-glow)'; e.currentTarget.style.color = 'var(--brand-green)'; }}
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button 
                onClick={() => scrollCarousel(1)} 
                style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid var(--brand-green)', background: 'var(--card-glow)', color: 'var(--brand-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', fontSize: '1.2rem' }} 
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-green)'; e.currentTarget.style.color = 'var(--bg-primary)'; }} 
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-glow)'; e.currentTarget.style.color = 'var(--brand-green)'; }}
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── NATURE CONTACT SECTION ───────────────────────────────────── */}
      <section id="contact" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', zIndex: 1, fontFamily: F }}>

        {/* Soft Nature Forest Glow Background */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '120vw', height: '120vw', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)', opacity: 1, zIndex: 0, pointerEvents: 'none' }} />

        {/* Abstract Glassmorphism Background Elements */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'var(--brand-green)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15, animation: 'floatGlass 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(12, 230, 89, 0.4)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1, animation: 'floatGlass 12s ease-in-out infinite reverse' }} />



        {/* Falling Leaves Animation Container */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '-10%', left: '10%', fontSize: '1.5rem', color: '#10b981', opacity: 0.3, animation: 'natureFall 12s linear infinite 0s' }} />
          <i className="fas fa-seedling" style={{ position: 'absolute', top: '-10%', left: '25%', fontSize: '2rem', color: '#10b981', opacity: 0.15, animation: 'natureFall 15s linear infinite 2s', filter: 'blur(1px)' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '-10%', left: '40%', fontSize: '1.2rem', color: '#10b981', opacity: 0.4, animation: 'natureFall 10s linear infinite 5s' }} />
          <i className="fas fa-seedling" style={{ position: 'absolute', top: '-10%', left: '55%', fontSize: '2.5rem', color: '#10b981', opacity: 0.1, animation: 'natureFall 18s linear infinite 1s', filter: 'blur(2px)' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '-10%', left: '70%', fontSize: '1.8rem', color: '#10b981', opacity: 0.25, animation: 'natureFall 14s linear infinite 4s' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '-10%', left: '85%', fontSize: '1.4rem', color: '#10b981', opacity: 0.35, animation: 'natureFall 11s linear infinite 3s', filter: 'blur(1px)' }} />
          {/* Background blurred leaves */}
          <i className="fas fa-seedling" style={{ position: 'absolute', top: '-10%', left: '15%', fontSize: '3rem', color: '#10b981', opacity: 0.05, animation: 'natureFall 20s linear infinite 6s', filter: 'blur(3px)' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '-10%', left: '80%', fontSize: '2.2rem', color: '#10b981', opacity: 0.08, animation: 'natureFall 17s linear infinite 7s', filter: 'blur(2px)' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '-10%', left: '48%', fontSize: '1.7rem', color: '#10b981', opacity: 0.2, animation: 'natureFall 13s linear infinite 8s' }} />
        </div>

        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel label={T('contact_label')} />
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {T('contact_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>{T('contact_sub')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="ibrat-contact-grid">

            {/* Left: Contact Info Glass Cards (Forest Style) */}
            <div className="ibrat-reveal" style={{ opacity: 0, transform: 'translateX(-30px)', transition: 'opacity .8s, transform .8s', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { icon: 'fa-phone-alt', title: T('label_phone'), lines: ['+998 77 131 66 01', '+998 90 007 80 21'], clr: '#10b981' },
                { icon: 'fa-envelope', title: 'Email', lines: ['ibrat.talim@gmail.com', 'info@ibrattalim.uz'], clr: '#3b82f6' },
                { icon: 'fa-map-marker-alt', title: T('label_location'), lines: ['Toshkent shahri, Sergeli tumani,', 'Sergeli 5A mavzesi'], clr: '#f59e0b' }
              ].map((c, i) => (
                <div key={i} className="liquid-glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '24px', backdropFilter: 'blur(10px)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'default' }}>
                  <div className="contact-icon" style={{ width: 56, height: 56, borderRadius: '16px', background: `${c.clr}15`, border: `1px solid ${c.clr}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.clr, flexShrink: 0, fontSize: '1.4rem', boxShadow: `0 0 25px ${c.clr}33`, transition: 'transform 0.3s' }}>
                    <i className={`fas ${c.icon}`} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '6px' }}>{c.title}</div>
                    {c.lines.map((l, j) => <div key={j} style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.5px' }}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Nature Form */}
            <div className="ibrat-reveal" style={{ opacity: 0, transform: 'translateX(30px)', transition: 'opacity .8s .2s, transform .8s .2s' }}>
              <div className="liquid-glass-card" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(30px) saturate(1.5)', WebkitBackdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid var(--glass-border)', borderRadius: '36px', padding: '3.5rem', boxShadow: 'var(--glass-shadow)', position: 'relative', overflow: 'hidden' }}>

                {/* Decorative Form Glow */}
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--brand-green)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }} />

                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '15px', letterSpacing: '-0.5px' }}>
                  Biz bilan bog'laning <i className="fas fa-seedling" style={{ color: 'var(--brand-green)', fontSize: '1.4rem', filter: 'drop-shadow(0 0 10px var(--card-glow))' }}></i>
                </h3>

                {formSent ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>🌿</div>
                    <h3 style={{ color: 'var(--brand-green)', fontSize: '1.6rem', marginBottom: '.8rem', fontWeight: 900 }}>Muvaffaqiyatli Yuborildi!</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Jamoamiz tez orada siz bilan bog'lanadi.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      {[
                        { id: 'n', label: T('form_name'), ph: T('form_name_ph'), val: formName, set: setFormName, type: 'text', req: true },
                        { id: 'p', label: T('form_phone'), ph: '+998 90 123 45 67', val: formPhone, set: setFormPhone, type: 'tel', req: true },
                      ].map(f => (
                        <div key={f.id} className="relative-input-group" style={{ position: 'relative' }}>
                          <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '.6rem', transition: 'color 0.3s' }}>{f.label}</label>
                          <input type={f.type} required={f.req} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                            className="login-input"
                            style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '16px', color: 'var(--text-primary)', fontFamily: F, fontSize: '.95rem', outline: 'none' }} />
                        </div>
                      ))}
                    </div>

                    <div className="relative-input-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '.6rem', transition: 'color 0.3s' }}>{T('form_course')}</label>
                      <select required value={formCourse} onChange={e => setFormCourse(e.target.value)}
                        className="login-input"
                        style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '16px', color: formCourse ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: F, fontSize: '.95rem', outline: 'none', cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2310b981%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.4rem top 50%', backgroundSize: '0.65rem auto' }}>
                        <option value="" disabled>{T('form_course_ph')}</option>
                        {courseSelectOptions.map(o => <option key={o.v} value={o.v} style={{ color: '#000' }}>{o.l}</option>)}
                      </select>
                    </div>

                    <div className="relative-input-group" style={{ marginBottom: '2rem' }}>
                      <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '.6rem', transition: 'color 0.3s' }}>{T('form_msg')}</label>
                      <textarea value={formMsg} onChange={e => setFormMsg(e.target.value)} placeholder={T('form_msg_ph')}
                        className="login-input"
                        style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '16px', color: 'var(--text-primary)', fontFamily: F, fontSize: '.95rem', outline: 'none', resize: 'vertical', minHeight: 120 }} />
                    </div>

                    <button type="submit"
                      className="liquid-glass-droplet"
                      style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 800, fontSize: '.95rem', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', cursor: 'pointer', fontFamily: F, boxShadow: `0 10px 25px rgba(16,185,129,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span>Yuborish</span> <i className="fas fa-leaf" style={{ fontSize: '0.9rem' }}></i>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM LOGIN-STYLE FOOTER ────────────────────────────────────── */}
      <footer style={{ padding: '6rem 0 3rem', position: 'relative', zIndex: 1, fontFamily: F, overflow: 'hidden', background: '#022218', color: '#fff', borderTop: '2px solid rgba(16, 185, 129, 0.3)' }}>

        {/* Natural Backgrounds & Textures (from Login Page) */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, #047857, #022c22, #010805)', opacity: 0.9, zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`, opacity: 0.1, mixBlendMode: 'overlay', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top right, rgba(0,0,0,0.85), rgba(0,0,0,0.45), rgba(2,44,34,0.5))', zIndex: 0, pointerEvents: 'none' }} />

        {/* Dotted Pattern at the Top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '250px', backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.35) 1.5px, transparent 1.5px)', backgroundSize: '20px 20px', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 0, opacity: 0.8 }} />

        {/* Elegant Natural Leaves Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '2.5rem', color: '#10b981', opacity: 0.15, animation: 'leafSway 8s ease-in-out infinite', '--r': '-45deg' }} />
          <i className="fas fa-seedling" style={{ position: 'absolute', top: '40%', right: '8%', fontSize: '4rem', color: '#10b981', opacity: 0.1, animation: 'leafSway 10s ease-in-out infinite 1s', '--r': '15deg' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', bottom: '20%', left: '15%', fontSize: '1.8rem', color: '#10b981', opacity: 0.12, animation: 'leafSway 7s ease-in-out infinite 2s', '--r': '60deg' }} />
          <i className="fas fa-leaf" style={{ position: 'absolute', top: '20%', right: '25%', fontSize: '2rem', color: '#10b981', opacity: 0.18, animation: 'leafSway 9s ease-in-out infinite 0.5s', '--r': '-20deg' }} />
          <i className="fas fa-seedling" style={{ position: 'absolute', bottom: '10%', right: '35%', fontSize: '2.8rem', color: '#10b981', opacity: 0.08, animation: 'leafSway 12s ease-in-out infinite 1.5s', '--r': '-60deg' }} />
        </div>

        <div style={{ ...container, position: 'relative', zIndex: 1 }}>

          <div className="ibrat-reveal ibrat-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 1.2fr 1.5fr', gap: '3rem', marginBottom: '3rem', opacity: 0, transform: 'translateY(20px)', transition: 'opacity .8s, transform .8s' }}>

            {/* Column 1: Brand & About */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ffffff', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>
                  <img src={filialImage} alt="IBRAT TA'LIM Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain' }} />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '3px', color: '#ffffff' }}>IBRAT<span style={{ color: '#10b981' }}>TALIM</span></div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.9rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '90%' }}>
                {T('footer_desc')} Dunyo darajasidagi qulay ta'lim platformasi. Kelajak tilingizda, muvaffaqiyat harakatingizda.
              </p>

              {/* App Download Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <a href="#" className="liquid-glass-droplet" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem 1rem', borderRadius: '12px', textDecoration: 'none', color: '#fff' }}>
                  <i className="fab fa-google-play" style={{ fontSize: '1.5rem', color: '#10b981' }}></i>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Get it on</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Google Play</div>
                  </div>
                </a>
                <a href="#" className="liquid-glass-droplet" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem 1rem', borderRadius: '12px', textDecoration: 'none', color: '#fff' }}>
                  <i className="fab fa-apple" style={{ fontSize: '1.6rem', color: '#fff' }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Download on</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>App Store</div>
                  </div>
                </a>
              </div>

              <div style={{ display: 'flex', gap: '.8rem' }}>
                {[['fab fa-telegram', '#2ba5e0'], ['fab fa-instagram', '#e1306c'], ['fab fa-facebook', '#1877f2'], ['fab fa-youtube', '#ff0000']].map(([ico, clr]) => (
                  <a key={ico} href="#" className="liquid-glass-droplet" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                    <i className={ico} style={{ fontSize: '1.1rem' }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation & Resources */}
            <div>
              <h4 style={{ fontSize: '.95rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#fff' }}>Platforma</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[['/#home', 'nav_home'], ['/#about', 'nav_about'], ['/#courses', 'nav_courses'], ['/#branches', 'nav_branches'], ['/#testimonials', 'nav_reviews']].map(([href, key]) => (
                  <li key={key} style={{ marginBottom: '.8rem' }}>
                    <a href={href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-chevron-right" style={{ fontSize: '0.6rem', color: '#10b981' }}></i> {T(key)}
                    </a>
                  </li>
                ))}
                {/* Additional specific pages */}
                <li style={{ marginBottom: '.8rem' }}>
                  <a href="/login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.6rem', color: '#10b981' }}></i> Student Portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Branches & Locations */}
            <div>
              <h4 style={{ fontSize: '.95rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#fff' }}>Filiallar</h4>
              {[
                { name: 'Sergeli 5A', phone: '(90) 026 80 21, (77) 131 66 01' },
                { name: 'Yangi Darhon', phone: '(90) 007 80 21' },
                { name: 'Sputnik 16', phone: '(90) 131 66 01' },
                { name: 'Beruniy', phone: '(92) 001 05 04' },
              ].map(b => (
                <div key={b.name} style={{ marginBottom: '1.2rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#fff', fontSize: '.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#10b981' }}></i> {b.name}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '.8rem', marginTop: '4px', marginLeft: '18px' }}>{b.phone}</div>
                </div>
              ))}
            </div>

            {/* Column 4: Support & Newsletter */}
            <div>
              <h4 style={{ fontSize: '.95rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#fff' }}>Bog'lanish</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '.85rem', marginBottom: '1rem', lineHeight: 1.6 }}>{T('footer_info')}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: 45, height: 45, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-headset" style={{ color: '#10b981', fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>24/7 Qo'llab-quvvatlash</div>
                  <a href="tel:+998771316601" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981', textDecoration: 'none' }}>+998 77 131 66 01</a>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Yangiliklarga obuna bo'ling</div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input type="email" placeholder="Email manzilingiz..." style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none' }} />
                  <button style={{ padding: '0 1rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                    onMouseLeave={e => e.currentTarget.style.background = '#10b981'}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', margin: 0 }}>© 2026 Ibrat Talim. Barcha huquqlar himoyalangan.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#10b981'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Maxfiylik siyosati</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#10b981'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradBG { 0%{background-position:0 50%} 50%{background-position:100% 50%} 100%{background-position:0 50%} }
        @keyframes shine { to{background-position:200% center} }
        @keyframes leafSway {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-20px) rotate(calc(var(--r, 0deg) + 15deg)); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
        @keyframes natureFall {
          0% { transform: translateY(-50px) rotate(0deg) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(25vh) rotate(90deg) translateX(40px); }
          50% { transform: translateY(50vh) rotate(180deg) translateX(-30px); }
          75% { transform: translateY(75vh) rotate(270deg) translateX(50px); }
          90% { opacity: 1; }
          100% { transform: translateY(120vh) rotate(360deg) translateX(-20px); opacity: 0; }
        }
        @keyframes flyLeftToRight {
          0% { transform: translateX(-10vw) translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          25% { transform: translateX(25vw) translateY(-20px) rotate(45deg); }
          50% { transform: translateX(50vw) translateY(10px) rotate(90deg); }
          75% { transform: translateX(75vw) translateY(-10px) rotate(135deg); }
          90% { opacity: 0.8; }
          100% { transform: translateX(110vw) translateY(20px) rotate(180deg); opacity: 0; }
        }
        @keyframes floatGlass {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @media(max-width:992px) {
          .ibrat-contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .ibrat-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .ibrat-roadmap-line { display: none !important; }
        }
        @media(max-width:768px) {
          .ibrat-footer-grid { grid-template-columns: 1fr !important; }
          .ibrat-roadmap-line { display: none !important; }
        }
        @media(max-width:600px) {
          .ibrat-footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .ibrat-roadmap-line { display: none !important; }
        }
      `}</style>
    </div>
  );
}
