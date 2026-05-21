import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState('uz');
  const [activeRole, setActiveRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const canvasRef = useRef(null);

  const translations = {
    uz: {
        brand: "IBRAT TALIM",
        leftBrand: "IBRAT Talim",
        leftTitle: "Jonli va Innovatsion Portal",
        leftSubtitle: "Kelajak tilingizda, muvaffaqiyat harakatingizda. Dunyo darajasidagi qulay ta'lim platformasi.",
        usernameLabel: "Telefon / Login",
        usernamePlaceholder: "Telefon raqam yoki foydalanuvchi nomi",
        passwordLabel: "Parol",
        passwordPlaceholder: "Parolingizni kiriting",
        tabs: {
            admin: "Admin",
            teacher: "Teacher",
            student: "Student"
        },
        roles: {
            admin: {
                title: "Admin Panel",
                subtitle: "Tizimni to'liq boshqarish",
                btnText: "Admin bo'lib kirish",
                footer: "Parol bilan himoyalangan xavfsiz admin kirishi"
            },
            teacher: {
                title: "O'qituvchi Portali",
                subtitle: "Darslar, davomat va dars jadvallariga kirish",
                btnText: "O'qituvchi bo'lib kirish",
                footer: "Ma'muriyat tomonidan berilgan ma'lumotlarni kiriting"
            },
            student: {
                title: "O'quvchi Hududi",
                subtitle: "Darslar, reytinglar va faol kurslarni tekshirish",
                btnText: "O'quvchi bo'lib kirish",
                footer: "Telefon raqamingiz va o'quvchi kodingiz bilan kiring"
            }
        },
        loading: "Tizimga kirilmoqda...",
        loadingSub: "Iltimos kutib turing",
        successAlert: "Tizimga muvaffaqiyatli kirdingiz!"
    },
    ru: {
        brand: "IBRAT TALIM",
        leftBrand: "ИБРАТ Талим",
        leftTitle: "Живой и Инновационный Портал",
        leftSubtitle: "Будущее на вашем языке, успех в ваших действиях. Удобная платформа мирового уровня.",
        usernameLabel: "Телефон / Логин",
        usernamePlaceholder: "Номер телефона или имя пользователя",
        passwordLabel: "Пароль",
        passwordPlaceholder: "Введите ваш пароль",
        tabs: {
            admin: "Админ",
            teacher: "Учитель",
            student: "Ученик"
        },
        roles: {
            admin: {
                title: "Панель Админа",
                subtitle: "Управляйте всем учебным центром",
                btnText: "Войти как Админ",
                footer: "Безопасный доступ админа с защитой паролем"
            },
            teacher: {
                title: "Портал Учителя",
                subtitle: "Доступ к классам, посещаемости и расписанию",
                btnText: "Войти как Учитель",
                footer: "Введите данные, выданные администрацией"
            },
            student: {
                title: "Личный Кабинет",
                subtitle: "Проверяйте уроки, оценки и активные курсы",
                btnText: "Войти как Ученик",
                footer: "Войдите по номеру телефона и коду ученика"
            }
        },
        loading: "Вход в систему...",
        loadingSub: "Пожалуйста, подождите",
        successAlert: "Вы успешно вошли в систему!"
    },
    en: {
        brand: "IBRAT TALIM",
        leftBrand: "IBRAT Talim",
        leftTitle: "Live & Innovative Portal",
        leftSubtitle: "Future in your language, success in your actions. World-class convenient learning platform.",
        usernameLabel: "Phone / Username",
        usernamePlaceholder: "Phone number or username",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        tabs: {
            admin: "Admin",
            teacher: "Teacher",
            student: "Student"
        },
        roles: {
            admin: {
                title: "Admin Panel",
                subtitle: "Manage your entire learning center",
                btnText: "Login as Admin",
                footer: "Secure admin access with password protection"
            },
            teacher: {
                title: "Teacher Portal",
                subtitle: "Access classes, attendance & schedules",
                btnText: "Access Teacher Panel",
                footer: "Enter your credentials assigned by administration"
            },
            student: {
                title: "Student Space",
                subtitle: "Check lessons, ratings & active courses",
                btnText: "Enter Student Space",
                footer: "Sign in with your phone number and student code"
            }
        },
        loading: "Signing in...",
        loadingSub: "Please wait a moment",
        successAlert: "Successfully signed in!"
    }
  };

  const t = translations[activeLang];
  const roleData = t.roles[activeRole];

  useEffect(() => {
    // Canvas animation logic
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let animationFrameId;

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 35;

    for (let i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1.2,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        
        particles.forEach((p, index) => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - dist / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLogin = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          alert(t.successAlert);
          navigate('/');
      }, 1500);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative selection:bg-[#059669] selection:text-white font-['Outfit']" style={{ background: 'var(--bg-primary)' }}>
        <style>{`
            .relative-input-group:focus-within i { color: var(--brand-green) !important; transform: scale(1.2) translateY(-1px); }
            .relative-input-group:focus-within label { color: var(--brand-green) !important; letter-spacing: 0.1em; }
            .hover-lift-card:hover { transform: translateY(-8px); box-shadow: var(--glass-hover-shadow) !important; }
            .login-right-section { background: var(--bg-primary); transition: background 0.5s; }
            .login-card { background: var(--glass-bg); backdrop-filter: blur(24px) saturate(1.8); -webkit-backdrop-filter: blur(24px) saturate(1.8); border: 1px solid var(--glass-border); transition: background 0.5s, border-color 0.5s; }
            .login-input { background: var(--input-bg); color: var(--text-primary); }
            .login-input::placeholder { color: var(--text-secondary); }
        `}</style>
        
        <svg className="absolute w-0 h-0">
            <defs>
                <clipPath id="organicRightClip" clipPathUnits="objectBoundingBox">
                    <path d="M 0.10,0 L 0.02,1 L 1,1 L 1,0 Z" />
                </clipPath>
            </defs>
        </svg>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-30 pointer-events-none" />

        <main className="w-full h-full flex overflow-hidden relative z-10">
            {/* Left Side: Nature Modern Style */}
            <section className="absolute inset-y-0 left-0 w-full md:w-[60%] h-full overflow-hidden bg-[#022218] flex flex-col justify-between p-8 md:p-12 text-white z-10">
                {/* Fallback Natural Gradient instead of video */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#047857] via-[#022c22] to-[#010805] opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-[#022c22]/50 z-0 pointer-events-none"></div>

                <div className="flex items-center gap-3.5 z-10">
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-[#10b981] text-base"></i>
                    </div>
                    <span className="font-bold tracking-widest text-xs uppercase shadow-sm">{t.leftBrand}</span>
                </div>

                <div className="flex flex-col gap-2.5 z-10 pl-1">
                    <h2 className="text-xl font-black tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">{t.leftTitle}</h2>
                    <p className="text-[12px] text-white/95 leading-relaxed font-bold max-w-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {t.leftSubtitle}
                    </p>
                </div>
            </section>

            {/* Right Side */}
            <section className="login-right-section absolute inset-y-0 right-0 w-full md:w-[50%] h-full flex flex-col justify-between p-8 md:py-10 md:px-16 overflow-hidden z-20" style={{ clipPath: 'url(#organicRightClip)' }}>
                {/* Close Button mapped to Home */}
                <div className="absolute top-8 right-8 z-50">
                    <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--brand-green)] hover:bg-[var(--glass-bg)] border border-transparent hover:border-[var(--glass-border)] transition-all duration-300">
                        <i className="fas fa-times text-lg"></i>
                    </Link>
                </div>

                <div className="absolute w-[500px] h-[500px] rounded-full bg-[var(--brand-green)]/10 blur-[120px] top-[-50px] right-[-50px] pointer-events-none"></div>
                <div className="absolute w-[450px] h-[450px] rounded-full bg-[var(--brand-green)]/5 blur-[120px] bottom-[-50px] left-[50px] pointer-events-none"></div>

                <div className="w-full max-w-[500px] mx-auto z-20 relative px-4 md:px-0 flex-1 flex flex-col justify-center">
                    <div className="text-center mb-8 md:mb-10">
                        <span className="font-outfit text-4xl md:text-5xl font-black italic tracking-widest" style={{ color: 'var(--brand-green)' }}>
                            IBRAT <span style={{ color: 'var(--text-primary)' }}>TALIM</span>
                        </span>
                    </div>

                    <div className="inline-flex p-2 rounded-full gap-2 mb-8 md:mb-10 self-center mx-auto shadow-sm" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                        {['admin', 'teacher', 'student'].map((role) => (
                            <button key={role} type="button" onClick={() => setActiveRole(role)}
                                className={`role-tab flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 focus:outline-none liquid-glass-droplet`}
                                style={{
                                    background: activeRole === role ? 'var(--brand-green)' : 'transparent',
                                    color: activeRole === role ? 'var(--btn-text)' : 'var(--text-secondary)',
                                    border: '1px solid transparent'
                                }}>
                                <i className={`fas ${role === 'admin' ? 'fa-user-shield' : role === 'teacher' ? 'fa-chalkboard-teacher' : 'fa-user-graduate'} text-[11px]`}></i>
                                {t.tabs[role]}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center text-center mb-8 md:mb-10">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight transition-all duration-300 leading-none" style={{ color: 'var(--text-primary)' }}>{roleData.title}</h2>
                        <p className="text-xs md:text-sm mt-2.5 transition-all duration-300" style={{ color: 'var(--text-secondary)' }}>{roleData.subtitle}</p>
                    </div>

                    <div className="login-card liquid-glass-card w-full rounded-[32px] p-10 md:p-12 relative z-10 shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="relative relative-input-group transition-all duration-300">
                                <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-wider mb-2.5 pl-1 transition-all duration-300" style={{ color: 'var(--text-secondary)' }}>
                                    <i className="fas fa-user text-[10px] transition-all"></i> {t.usernameLabel}
                                </label>
                                <input type="text" required placeholder={t.usernamePlaceholder}
                                    className="login-input w-full rounded-2xl py-5 px-7 focus:outline-none text-base font-bold" />
                            </div>

                            <div className="relative relative-input-group transition-all duration-300">
                                <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-wider mb-2.5 pl-1 transition-all duration-300" style={{ color: 'var(--text-secondary)' }}>
                                    <i className="fas fa-lock text-[10px] transition-all"></i> {t.passwordLabel}
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} required placeholder={t.passwordPlaceholder}
                                        className="login-input w-full rounded-2xl py-5 px-7 pr-14 focus:outline-none text-base font-bold" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-6 flex items-center transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                        <i className={`fas fa-eye${showPassword ? '-slash' : ''} text-base`}></i>
                                    </button>
                                </div>
                            </div>

                            <button type="submit"
                                className="w-full font-black uppercase tracking-widest rounded-2xl py-5 px-7 text-xs mt-6 flex items-center justify-center gap-2 liquid-glass-droplet"
                                style={{ background: 'var(--brand-green)', color: 'var(--btn-text)' }}>
                                <span>{roleData.btnText}</span>
                                <i className="fas fa-arrow-right text-[10px]"></i>
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-[11px] mt-6 font-black tracking-wide transition-all duration-300" style={{ color: 'var(--text-secondary)' }}>
                        <i className="fas fa-shield-alt mr-1" style={{ color: 'var(--brand-green)' }}></i> {roleData.footer}
                    </p>
                </div>
            </section>

            <div className="absolute top-0 bottom-0 left-[50%] w-[50%] h-full pointer-events-none hidden md:block z-15">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full filter blur-[28px] opacity-45">
                    <path d="M 10,0 L 2,1000 L 100,1000 L 100,0 Z" fill="var(--brand-green)" />
                </svg>
            </div>
            
            <div className="absolute top-0 bottom-0 left-[50%] w-[50%] h-full pointer-events-none hidden md:block z-25">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                        <linearGradient id="edgeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="25%" stopColor="var(--brand-green)" />
                            <stop offset="75%" stopColor="var(--brand-green)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path d="M 10,0 L 2,1000" fill="none" stroke="url(#edgeGradient)" strokeWidth="2.2" />
                </svg>
            </div>
        </main>

        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
            <div className="relative">
                <button type="button" onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="w-12 h-12 rounded-full flex items-center justify-center focus:outline-none liquid-glass-droplet"
                    style={{ background: 'var(--glass-bg)', color: 'var(--brand-green)' }}>
                    <span className="font-bold text-xs uppercase">{activeLang}</span>
                </button>
                <div className={`absolute right-14 top-1/2 -translate-y-1/2 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl w-32 transition-all duration-300 origin-right ${langMenuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'}`}
                    style={{ background: 'var(--nav-scroll-bg)', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                    {['uz', 'ru', 'en'].map(lang => (
                        <button key={lang} onClick={() => { setActiveLang(lang); setLangMenuOpen(false); }}
                            className={`w-full flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider mb-1 liquid-glass-droplet`}
                            style={{
                                background: activeLang === lang ? 'var(--brand-green)' : 'transparent',
                                color: activeLang === lang ? 'var(--btn-text)' : 'var(--text-secondary)',
                                border: '1px solid transparent'
                            }}>
                            {lang === 'uz' ? "O'zbekcha" : lang === 'ru' ? "Русский" : "English"}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {isLoading && (
            <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50" style={{ background: 'var(--hero-overlay)' }}>
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ borderTopColor: 'var(--brand-green)' }}></div>
                        <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ background: 'var(--card-glow)' }}>
                            <i className="fas fa-graduation-cap text-lg animate-pulse" style={{ color: 'var(--brand-green)' }}></i>
                        </div>
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase mt-5 animate-pulse" style={{ color: 'var(--text-primary)' }}>{t.loading}</p>
                </div>
            </div>
        )}
    </div>
  );
}
