import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useLang } from '../context/LanguageContext.jsx';
import { courses } from '../data/courses.js';

const G = 'var(--brand-green)';
const F = "'Outfit', sans-serif";
const glass = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(22px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.8)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
};

export default function CoursePage() {
  const { id } = useParams();
  const { T } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const course = courses.find(c => c.id === id) ?? courses[0];
  const others = courses.filter(c => c.id !== course.id).slice(0, 3);

  const container = { width: '90%', maxWidth: 1280, margin: '0 auto' };

  return (
    <div style={{ fontFamily: F, color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh', transition: 'background 0.5s, color 0.5s' }}>

      {/* Global Background (if needed so CoursePage looks good on refresh) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'var(--bg-gradient)' }} />

      {/* ── Course Hero ──────────────────────────────── */}
      <section style={{ padding: '130px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'var(--card-glow)', filter: 'blur(100px)', top: -200, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <Link to="/#courses"
            className="liquid-glass-droplet"
            style={{ ...glass, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '.5rem 1.2rem', borderRadius: 50, color: 'var(--text-secondary)', fontSize: '.82rem', fontWeight: 600, textDecoration: 'none', marginBottom: '2rem' }}>
            <i className="fas fa-arrow-left" style={{ fontSize: '.75rem' }} /> {T('course_back')}
          </Link>

          <div style={{ display: 'inline-block', padding: '.28rem .9rem', background: 'var(--card-glow)', border: '1px solid var(--brand-green)', borderRadius: 50, fontSize: '.72rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: G, marginBottom: '1.2rem', marginLeft: '1rem' }}>
            {course.badge}
          </div>

          <h1 style={{ fontSize: 'clamp(2rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: -2, backgroundImage: `linear-gradient(135deg, var(--text-primary), ${G}, var(--text-primary))`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shine 6s linear infinite', marginBottom: '2rem' }}>
            {T(course.nameKey)}
          </h1>

          <div style={{ width: '100%', maxWidth: 900, height: 440, borderRadius: 28, overflow: 'hidden', margin: '0 auto', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-hover-shadow)' }}>
            <img src={course.image} alt={T(course.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── Course Details ───────────────────────────── */}
      <section style={{ padding: '60px 0 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ ...container }}>
          <div className="ibrat-course-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3.5rem', alignItems: 'start' }}>

            {/* Main content */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: -1 }}>{T('about_course')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2rem' }}>{T(course.descKey)}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                {course.id === 'english' && 'Bizning ingliz tili kursimiz zamonaviy kommunikativ metodikaga asoslangan. O\'quvchilar kundalik suhbat, biznes muzokaralar va IELTS imtihoniga to\'liq tayyorlanadilar. Har bir dars kichik guruhlarda o\'tkaziladi — bu har bir o\'quvchiga maksimal e\'tibor berishga imkon beradi.'}
                {course.id === 'russian' && 'Rus tili kursi tezkor natijalarga yo\'naltirilgan. Biz amaliy leksika va zamonaviy dialoglarni o\'rgatamiz. O\'quvchilar birinchi darsdan boshlab rus tilida gaplashishni boshlaydilar.'}
                {course.id === 'arabic' && 'Arab tili — boy tarixi va madaniyatga ega til. Bizning kursimiz klassik va zamonaviy arab tilini birlashtiradi. O\'qituvchilarimiz sertifikatlangan mutaxassislar.'}
                {course.id === 'korean' && 'Koreys tili dunyoning eng tez rivojlanayotgan tillaridan biri. Bizning kursimiz Hangul alifbodan boshlab TOPIK imtihoniga qadar to\'liq yo\'l xaritasini taqdim etadi.'}
                {course.id === 'mental' && 'Mental arifmetika nafaqat tez hisoblashni, balki umumiy aqliy rivojlanishni ta\'minlaydi. O\'quvchilar konsentratsiya, xotira va mantiqiy fikrlash qobiliyatlarini oshiradilar.'}
                {course.id === 'montessori' && 'Montessori metodikasi bolaning tabiiy qiziqishidan kelib chiqadi. Biz har bir bolaning o\'z sur\'atida rivojlanishiga sharoit yaratamiz.'}
                {course.id === 'ielts' && 'IELTS tayyorlov kursi ingliz tili ko\'nikmalarini maksimal darajaga ko\'tarish uchun mo\'ljallangan. O\'quvchilar haqiqiy imtihon sharoitlarida muntazam mashq qiladilar.'}
                {course.id === 'speedread' && 'Tez o\'qish texnikasi zamonaviy dunyo uchun zarur ko\'nikmadir. Bizning kursimiz vizual idroqni kengaytirib, o\'qish tezligini va tushunishni bir vaqtda oshiradi.'}
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.2rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: -0.5 }}>{T('what_learn')}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
                {course.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '.7rem', color: 'var(--text-secondary)', fontSize: '.92rem' }}>
                    <i className="fas fa-check-circle" style={{ color: G, flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="liquid-glass-card" style={{ ...glass, borderRadius: 24, padding: '2rem', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--section-border)', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{T('course_info')}</h3>
              {[
                { label: T('label_duration'), val: course.duration },
                { label: T('label_level'), val: course.level },
                { label: T('label_cert'), val: T('val_yes') },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '.9rem 0', borderBottom: '1px solid var(--section-border)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '.88rem' }}>{r.label}</span>
                  <span style={{ fontWeight: 700, color: G, fontSize: '.88rem' }}>{r.val}</span>
                </div>
              ))}

              {/* Features tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '1.2rem', marginBottom: '1.2rem' }}>
                {course.features.map(f => (
                  <span key={f} style={{ padding: '.3rem .8rem', background: 'var(--card-glow)', border: '1px solid var(--brand-green)', borderRadius: 50, fontSize: '.72rem', color: G, fontWeight: 600 }}>{f}</span>
                ))}
              </div>

              <Link to="/#contact"
                className="liquid-glass-droplet"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem', borderRadius: 50, background: G, color: 'var(--btn-text)', fontWeight: 700, fontSize: '.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', textDecoration: 'none', boxShadow: `0 0 24px var(--card-glow)`, marginTop: '.5rem' }}>
                <i className="fas fa-graduation-cap" style={{ marginRight: 8 }} /> {T('btn_enroll')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Courses ─────────────────────────────── */}
      <section style={{ padding: '60px 0 100px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--section-border)', position: 'relative', zIndex: 1 }}>
        <div style={container}>
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', textAlign: 'center', marginBottom: '3rem', color: 'var(--text-primary)' }}>
            {T('more_courses')} <span style={{ color: G, textShadow: `0 0 20px var(--card-glow)` }}>{T('more_courses_green')}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
            {others.map(c => (
              <Link to={`/course/${c.id}`} key={c.id}
                className="liquid-glass-card"
                style={{ ...glass, borderRadius: 20, overflow: 'hidden', display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative' }}>
                  <img src={c.image} alt={T(c.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s' }} />
                  <div style={{ position: 'absolute', top: 10, right: 10, background: c.badgeColor, color: ['#f59e0b','#06b6d4'].includes(c.badgeColor) ? '#000' : '#fff', padding: '3px 10px', borderRadius: 50, fontWeight: 900, fontSize: '.7rem', boxShadow: `0 0 14px ${c.badgeColor}66` }}>{c.badge}</div>
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '.3rem', color: 'var(--text-primary)', fontWeight: 700 }}>{T(c.nameKey)}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '.83rem', lineHeight: 1.5 }}>{T(c.descKey)}</p>
                  <div style={{ marginTop: '.8rem', color: G, fontSize: '.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 5 }}>
                    {T('learn_more')} <i className="fas fa-arrow-right" style={{ fontSize: '.65rem' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shine { to { background-position: 200% center; } }
        @media(max-width:992px) {
          .ibrat-course-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
