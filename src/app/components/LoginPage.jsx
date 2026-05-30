import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import loginVideo from '../../publish/172833-847860686.mp4';
import logoImage from '../../publish/logo.jpg';

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
                footer: "Parol bilan himoyalangan xavfsiz admin kirishi",
                icon: "fa-user-shield"
            },
            teacher: {
                title: "O'qituvchi Portali",
                subtitle: "Darslar, davomat va dars jadvallariga kirish",
                btnText: "O'qituvchi bo'lib kirish",
                footer: "Ma'muriyat tomonidan berilgan ma'lumotlarni kiriting",
                icon: "fa-chalkboard-teacher"
            },
            student: {
                title: "O'quvchi Hududi",
                subtitle: "Darslar, reytinglar va faol kurslarni tekshirish",
                btnText: "O'quvchi bo'lib kirish",
                footer: "Telefon raqamingiz va o'quvchi kodingiz bilan kiring",
                icon: "fa-user-graduate"
            }
        },
        loading: "Kabinetga kirilmoqda...",
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
                footer: "Безопасный доступ админа с защитой паролем",
                icon: "fa-user-shield"
            },
            teacher: {
                title: "Портал Учителя",
                subtitle: "Доступ к классам, посещаемости и расписанию",
                btnText: "Войти как Учитель",
                footer: "Введите данные, выданные администрацией",
                icon: "fa-chalkboard-teacher"
            },
            student: {
                title: "Личный Кабинет",
                subtitle: "Проверяйте уроки, оценки и активные курсы",
                btnText: "Войти как Ученик",
                footer: "Войдите по номеру телефона и коду ученика",
                icon: "fa-user-graduate"
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
                footer: "Secure admin access with password protection",
                icon: "fa-user-shield"
            },
            teacher: {
                title: "Teacher Portal",
                subtitle: "Access classes, attendance & schedules",
                btnText: "Access Teacher Panel",
                footer: "Enter your credentials assigned by administration",
                icon: "fa-chalkboard-teacher"
            },
            student: {
                title: "Student Space",
                subtitle: "Check lessons, ratings & active courses",
                btnText: "Enter Student Space",
                footer: "Sign in with your phone number and student code",
                icon: "fa-user-graduate"
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 35;

    for (let i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * (width * 0.4),
            y: Math.random() * height,
            r: Math.random() * 3 + 1.2,
            speedX: Math.random() * 1.2 + 0.6,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.65 + 0.25,
            pulseSpeed: Math.random() * 0.04 + 0.01,
            pulseDir: 1
        });
    }

    let animationId;
    const handleDrawParticles = () => {
        ctx.clearRect(0, 0, width, height);

        // Grid
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.035)';
        ctx.lineWidth = 0.5;
        const gridSize = 65;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // Neural connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.12 * Math.min(particles[i].opacity, particles[j].opacity);
                    ctx.strokeStyle = 'rgba(16, 185, 129, ' + alpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Particles
        particles.forEach(p => {
            ctx.fillStyle = 'rgba(52, 211, 153, ' + p.opacity + ')';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

            ctx.strokeStyle = 'rgba(52, 211, 153, ' + p.opacity * 0.2 + ')';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 3.5, 0, Math.PI * 2); ctx.stroke();

            p.x += p.speedX;
            p.y += p.speedY;

            p.opacity += p.pulseSpeed * p.pulseDir;
            if (p.opacity > 0.9 || p.opacity < 0.15) p.pulseDir *= -1;

            const rightFadeStart = width * 0.75;
            if (p.x > rightFadeStart) p.opacity = Math.max(0, p.opacity - 0.05);

            if (p.x > width || p.opacity <= 0) {
                p.x = Math.random() * (width * 0.25);
                p.y = Math.random() * height;
                p.opacity = Math.random() * 0.65 + 0.25;
                p.speedX = Math.random() * 1.2 + 0.6;
            }
        });
        animationId = requestAnimationFrame(handleDrawParticles);
    };
    handleDrawParticles();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
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

  // Close language dropdown if clicked outside
  useEffect(() => {
      const closeDropdown = () => setLangMenuOpen(false);
      if (langMenuOpen) {
          document.addEventListener('click', closeDropdown);
      }
      return () => document.removeEventListener('click', closeDropdown);
  }, [langMenuOpen]);

  const toggleDropdown = (e) => {
      e.stopPropagation();
      setLangMenuOpen(!langMenuOpen);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-['Outfit']" style={{ backgroundColor: '#faf7ee' }}>
        <style>{`
            .relative-input-group { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            .relative-input-group:focus-within i { color: #059669 !important; transform: scale(1.2) translateY(-1px); filter: drop-shadow(0 2px 6px rgba(5, 150, 105, 0.35)); }
            .relative-input-group:focus-within label { color: #059669 !important; letter-spacing: 0.1em; }
            .relative-input-group input { border: 1px solid transparent !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; }
            .relative-input-group input:focus { border-color: rgba(5, 150, 105, 0.25) !important; background-color: #ffffff !important; box-shadow: 0 10px 30px rgba(5, 150, 105, 0.04), inset 0 2px 4px rgba(0,0,0,0.01) !important; }
            .hover-lift-card { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; }
            .hover-lift-card:hover { transform: translateY(-8px); box-shadow: 0 45px 100px rgba(5, 150, 105, 0.12), 0 20px 50px rgba(0, 0, 0, 0.02) !important; }
            @keyframes fadeInFromLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes fadeInFromRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-left { animation: fadeInFromLeft 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .animate-fade-right { animation: fadeInFromRight 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .animate-scale-in { animation: scaleIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
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
            {/* Left Side: Video Backdrop */}
            <section className="absolute inset-y-0 left-0 w-full md:w-[60%] h-full overflow-hidden bg-[#022218] flex flex-col justify-between p-8 md:p-12 text-white z-10 animate-fade-left">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-0">
                    <source src={loginVideo} type="video/mp4" />
                </video>
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

            {/* Right Side: Ivory Panel */}
            <section className="absolute inset-y-0 right-0 w-full md:w-[50%] h-full bg-[#faf7ee] flex flex-col justify-between p-8 md:py-10 md:px-16 overflow-hidden z-20" style={{ clipPath: 'url(#organicRightClip)' }}>
                <div className="absolute top-8 right-8 z-50">
                    <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-[#059669] hover:bg-black/5 border border-transparent hover:border-black/10 transition-all duration-300">
                        <i className="fas fa-times text-lg"></i>
                    </Link>
                </div>

                <div className="absolute w-[500px] h-[500px] rounded-full bg-[#059669]/5 blur-[120px] top-[-50px] right-[-50px] pointer-events-none"></div>
                <div className="absolute w-[450px] h-[450px] rounded-full bg-amber-200/5 blur-[120px] bottom-[-50px] left-[50px] pointer-events-none"></div>

                <div /> {/* Spacer */}

                <div className="w-full max-w-[500px] mx-auto z-20 relative px-4 md:px-0 flex-1 flex flex-col justify-center">
                    <div className="text-center mb-8 md:mb-10 animate-fade-right">
                        <span className="font-outfit text-4xl md:text-5xl font-black italic tracking-widest text-[#059669]">
                            IBRAT <span className="text-slate-800">TALIM</span>
                        </span>
                    </div>

                    <div className="inline-flex p-2 bg-slate-200/50 backdrop-blur-sm rounded-full gap-2 mb-8 md:mb-10 self-center mx-auto shadow-sm animate-fade-right">
                        {['admin', 'teacher', 'student'].map((role) => (
                            <button key={role} type="button" onClick={() => setActiveRole(role)}
                                className={`role-tab flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 focus:outline-none ${activeRole === role ? 'bg-[#059669] text-white shadow-lg shadow-[#059669]/25' : 'text-slate-500 hover:text-slate-800'}`}>
                                <i className={`fas ${t.roles[role].icon} text-[11px]`}></i>
                                {t.tabs[role]}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center text-center mb-8 md:mb-10 animate-fade-right">
                        <div key={activeRole} className="w-32 h-32 rounded-full bg-white p-1 border-4 border-white ring-4 ring-[#059669]/15 flex items-center justify-center mb-5 transition-all duration-300 shadow-[0_25px_60px_rgba(5,150,105,0.35),_inset_0_4px_12px_rgba(0,0,0,0.06)] relative overflow-hidden animate-scale-in">
                            <img src={logoImage} alt="IBRAT Talim Logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight transition-all duration-300 leading-none">{roleData.title}</h2>
                        <p className="text-xs md:text-sm text-slate-400 mt-2.5 transition-all duration-300">{roleData.subtitle}</p>
                    </div>

                    <div className="w-full bg-white shadow-[0_35px_80px_rgba(5,150,105,0.05),_0_0_60px_rgba(0,0,0,0.01)] border border-slate-100 rounded-[32px] p-10 md:p-12 relative z-10 animate-scale-in hover-lift-card">
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="relative relative-input-group">
                                <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5 pl-1 transition-all duration-300">
                                    <i className="fas fa-user text-[10px]"></i> {t.usernameLabel}
                                </label>
                                <input type="text" required placeholder={t.usernamePlaceholder}
                                    className="w-full bg-[#eef2f6]/95 rounded-2xl py-5 px-7 text-slate-800 placeholder-slate-400 focus:outline-none text-base font-bold" />
                            </div>

                            <div className="relative relative-input-group">
                                <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5 pl-1 transition-all duration-300">
                                    <i className="fas fa-lock text-[10px]"></i> {t.passwordLabel}
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} required placeholder={t.passwordPlaceholder}
                                        className="w-full bg-[#eef2f6]/95 rounded-2xl py-5 px-7 pr-14 text-slate-800 placeholder-slate-400 focus:outline-none text-base font-bold" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-slate-700 transition-colors duration-300">
                                        <i className={`fas fa-eye${showPassword ? '-slash' : ''} text-base`}></i>
                                    </button>
                                </div>
                            </div>

                            <button type="submit"
                                className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black uppercase tracking-widest rounded-2xl py-5 px-7 hover:shadow-xl hover:shadow-[#059669]/25 active:scale-[0.99] transition-all duration-300 text-xs mt-6 flex items-center justify-center gap-2">
                                <span>{roleData.btnText}</span>
                                <i className="fas fa-arrow-right text-[10px]"></i>
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-[11px] text-slate-400 mt-6 font-black tracking-wide transition-all duration-300 animate-fade-right">
                        <i className="fas fa-shield-alt mr-1 text-[#059669]"></i> {roleData.footer}
                    </p>
                </div>
                <div className="h-6"></div>
            </section>

            {/* Left/Right Overlap glow effects */}
            <div className="absolute top-0 bottom-0 left-[50%] w-[50%] h-full pointer-events-none hidden md:block z-15">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full filter blur-[28px] opacity-45">
                    <path d="M 10,0 L 2,1000 L 100,1000 L 100,0 Z" fill="#10b981" />
                </svg>
            </div>
            
            <div className="absolute top-0 bottom-0 left-[50%] w-[50%] h-full pointer-events-none hidden md:block z-25">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                        <linearGradient id="edgeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(5,150,105,0.3)" />
                            <stop offset="25%" stopColor="#059669" />
                            <stop offset="75%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="rgba(5,150,105,0.3)" />
                        </linearGradient>
                    </defs>
                    <path d="M 10,0 L 2,1000" fill="none" stroke="url(#edgeGradient)" strokeWidth="2.2" />
                </svg>
            </div>
        </main>

        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
            <div className="relative">
                <button type="button" onClick={toggleDropdown}
                    className="w-12 h-12 rounded-full bg-white border border-slate-150 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none ring-4 ring-[#059669]/10 hover:ring-[#059669]/20">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border border-slate-100/50 shadow-inner">
                        {activeLang === 'uz' ? (
                            <svg className="w-full h-full object-cover scale-110" viewBox="0 0 100 50">
                                <rect width="100" height="18" fill="#0099b5"/>
                                <rect y="18" width="100" height="2" fill="#d22630"/>
                                <rect y="20" width="100" height="10" fill="#ffffff"/>
                                <rect y="30" width="100" height="2" fill="#d22630"/>
                                <rect y="32" width="100" height="18" fill="#1eb53a"/>
                                <circle cx="15" cy="9" r="5" fill="#ffffff"/>
                                <circle cx="17.5" cy="9" r="5" fill="#0099b5"/>
                                <circle cx="30" cy="5" r="1" fill="#ffffff"/>
                                <circle cx="35" cy="5" r="1" fill="#ffffff"/>
                                <circle cx="40" cy="5" r="1" fill="#ffffff"/>
                                <circle cx="32" cy="9" r="1" fill="#ffffff"/>
                                <circle cx="37" cy="9" r="1" fill="#ffffff"/>
                                <circle cx="35" cy="13" r="1" fill="#ffffff"/>
                            </svg>
                        ) : activeLang === 'ru' ? (
                            <svg className="w-full h-full object-cover scale-110" viewBox="0 0 3 2">
                                <rect width="3" height="2" fill="#d52b1e"/>
                                <rect width="3" height="1.333" fill="#0039a6"/>
                                <rect width="3" height="0.667" fill="#ffffff"/>
                            </svg>
                        ) : (
                            <svg className="w-full h-full object-cover scale-110" viewBox="0 0 60 30">
                                <g>
                                    <rect width="60" height="30" fill="#012169"/>
                                    <path d="M0,0 L60,30 M0,30 L60,0" stroke="#fff" strokeWidth="6"/>
                                    <path d="M0,0 L60,30 M0,30 L60,0" stroke="#C8102E" strokeWidth="4"/>
                                    <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/>
                                    <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
                                </g>
                            </svg>
                        )}
                    </span>
                </button>
                <div className={`absolute right-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2.5 shadow-2xl w-44 transition-all duration-300 origin-right ${langMenuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'}`}>
                    {[
                        { id: 'uz', name: "O'zbekcha", flag: <svg className="w-full h-full object-cover scale-110" viewBox="0 0 100 50"><rect width="100" height="18" fill="#0099b5"/><rect y="18" width="100" height="2" fill="#d22630"/><rect y="20" width="100" height="10" fill="#ffffff"/><rect y="30" width="100" height="2" fill="#d22630"/><rect y="32" width="100" height="18" fill="#1eb53a"/><circle cx="15" cy="9" r="5" fill="#ffffff"/><circle cx="17.5" cy="9" r="5" fill="#0099b5"/><circle cx="30" cy="5" r="1" fill="#ffffff"/><circle cx="35" cy="5" r="1" fill="#ffffff"/><circle cx="40" cy="5" r="1" fill="#ffffff"/><circle cx="32" cy="9" r="1" fill="#ffffff"/><circle cx="37" cy="9" r="1" fill="#ffffff"/><circle cx="35" cy="13" r="1" fill="#ffffff"/></svg> },
                        { id: 'ru', name: "Русский", flag: <svg className="w-full h-full object-cover scale-110" viewBox="0 0 3 2"><rect width="3" height="2" fill="#d52b1e"/><rect width="3" height="1.333" fill="#0039a6"/><rect width="3" height="0.667" fill="#ffffff"/></svg> },
                        { id: 'en', name: "English", flag: <svg className="w-full h-full object-cover scale-110" viewBox="0 0 60 30"><g><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M0,30 L60,0" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,30 M0,30 L60,0" stroke="#C8102E" strokeWidth="4"/><path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/><path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/></g></svg> }
                    ].map(lang => (
                        <button key={lang.id} onClick={() => { setActiveLang(lang.id); setLangMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider mb-1 transition-colors focus:outline-none ${activeLang === lang.id ? 'text-[#059669] bg-[#059669]/10' : 'text-slate-700 hover:bg-slate-100'}`}>
                            <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-slate-100 shadow-inner">
                                {lang.flag}
                            </span>
                            <span>{lang.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {isLoading && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300">
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#10b981] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                        <div className="absolute inset-2 rounded-full bg-[#059669]/10 flex items-center justify-center">
                            <i className="fas fa-graduation-cap text-[#10b981] text-lg animate-pulse"></i>
                        </div>
                    </div>
                    <p className="text-white text-xs font-bold tracking-widest uppercase mt-5 animate-pulse">{t.loading}</p>
                </div>
            </div>
        )}
    </div>
  );
}

