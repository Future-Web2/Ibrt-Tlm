import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useLang } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, T } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontScale, setFontScale] = useState('normal'); // 'small' | 'normal' | 'large'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  }); // 'dark' | 'light'
  
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync font scale with html classes (matching original script)
  useEffect(() => {
    document.documentElement.classList.remove('scale-small', 'scale-large');
    if (fontScale === 'small') {
      document.documentElement.classList.add('scale-small');
    } else if (fontScale === 'large') {
      document.documentElement.classList.add('scale-large');
    }
  }, [fontScale]);

  // Sync dark/light theme with data-theme attribute (matching original script)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  // Close settings panel when clicking outside
  useEffect(() => {
    const clickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const links = [
    { href: '/#home', key: 'nav_home' },
    { href: '/#about', key: 'nav_about' },
    { href: '/#courses', key: 'nav_courses' },
    { href: '/#branches', key: 'nav_branches' },
    { href: '/#testimonials', key: 'nav_reviews' },
  ];

  const scrollTo = (e, id) => {
    setMobileOpen(false);
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <style>{`
        /* Original Navbar Layout & Style Classes */
        .navbar {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          max-width: 1280px;
          height: 72px;
          padding: 0 2.2rem;
          z-index: 1000;
          background: var(--nav-scroll-bg);
          backdrop-filter: blur(28px) saturate(1.8);
          -webkit-backdrop-filter: blur(28px) saturate(1.8);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          box-shadow: var(--glass-shadow);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
        }

        /* Enhanced scrolled state with higher glassmorphism & volumetric outline */
        .navbar.scrolled {
          top: 12px;
          height: 64px;
          padding: 0 2.2rem;
          background-color: var(--nav-scroll-bg);
          backdrop-filter: blur(32px) saturate(2);
          -webkit-backdrop-filter: blur(32px) saturate(2);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-hover-shadow);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0;
          flex-wrap: nowrap !important;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: var(--transition-fast, 0.2s ease);
          white-space: nowrap !important;
        }

        .logo:hover {
          transform: scale(1.02);
        }

        .logo span {
          color: var(--brand-green);
          text-shadow: 0 0 15px var(--card-glow);
        }

        .nav-right {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-end !important;
          gap: clamp(0.5rem, 1vw, 1.2rem) !important;
          flex-shrink: 0 !important;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: clamp(0.6rem, 1.2vw, 1.4rem);
          align-items: center;
          margin: 0;
          padding: 0;
          flex-wrap: nowrap !important;
        }

        .nav-links a:not(.nav-btn-login) {
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          padding: 6px 0;
          transition: color var(--transition-fast, 0.2s ease);
          white-space: nowrap !important;
        }

        .nav-links a:not(.nav-btn-login):hover {
          color: var(--brand-green);
          text-shadow: 0 0 10px var(--card-glow);
        }

        .nav-links a:not(.nav-btn-login)::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 3px;
          border-radius: 50px;
          background-color: var(--brand-green);
          transition: var(--transition-normal, 0.4s cubic-bezier(0.16, 1, 0.3, 1));
          box-shadow: 0 0 10px var(--brand-green);
        }

        .nav-links a:not(.nav-btn-login):hover::after,
        .nav-links a:not(.nav-btn-login).active::after {
          width: 60%;
        }

        /* Premium Login Button with live shimmer sweep */
        .nav-btn-login {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 22px;
          border-radius: 50px;
          background: var(--brand-green);
          color: var(--btn-text) !important;
          font-weight: 700;
          font-size: 0.9rem !important;
          letter-spacing: 0.5px;
          border: none;
          text-decoration: none !important;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px var(--card-glow);
          transition: all 0.35s ease;
        }

        .nav-btn-login::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: skewX(-20deg);
          animation: btnShimmer 3s ease-in-out infinite;
        }

        @keyframes btnShimmer {
          0%, 100% { left: -100% }
          50% { left: 150% }
        }

        .nav-btn-login:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 30px var(--brand-green), 0 10px 25px var(--card-glow);
        }

        .nav-btn-login i {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .nav-btn-login:hover i {
          transform: translateX(4px);
        }

        /* Live Pulse Indicator */
        .nav-link-enroll {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap !important;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          background-color: var(--brand-green);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 8px var(--brand-green);
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: var(--brand-green);
          border-radius: 50%;
          animation: pulseGlow 1.8s infinite ease-in-out;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }

        /* Theme Toggle Button */
        .theme-toggle {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: var(--glass-shadow);
          position: relative !important;
          top: auto !important;
          right: auto !important;
          margin: 0 !important;
          align-self: center !important;
          flex-shrink: 0 !important;
        }

        .theme-toggle:hover {
          color: var(--brand-green);
          border-color: var(--brand-green);
          box-shadow: var(--glass-hover-shadow);
        }

        /* Control Center Dropdown */
        .settings-control {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          align-self: center !important;
          margin: 0 !important;
          flex-shrink: 0 !important;
          top: auto !important;
          right: auto !important;
        }

        .settings-toggle {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: var(--glass-shadow);
          position: relative !important;
          top: auto !important;
          right: auto !important;
          margin: 0 !important;
          align-self: center !important;
          flex-shrink: 0 !important;
        }

        .settings-toggle:hover, .settings-toggle.active {
          color: var(--brand-green);
          border-color: var(--brand-green);
          box-shadow: var(--glass-hover-shadow);
        }

        .settings-toggle i {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .settings-toggle:hover i {
          transform: rotate(45deg);
        }

        /* Volumetric Glass Settings Panel positioned floating cleanly below */
        .settings-panel {
          position: absolute;
          top: calc(100% + 20px);
          right: 0;
          width: 280px;
          background: var(--nav-scroll-bg);
          backdrop-filter: blur(28px) saturate(1.8);
          -webkit-backdrop-filter: blur(28px) saturate(1.8);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--glass-shadow);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px) scale(0.95);
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, visibility 0.4s;
          z-index: 1001;
        }

        .settings-panel.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .settings-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          border-bottom: 1px solid var(--section-border);
          padding-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-primary);
        }

        .settings-group {
          margin-bottom: 1.2rem;
        }

        .settings-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.6rem;
          font-weight: 500;
        }

        .lang-pills, .scale-pills {
          display: flex;
          gap: 0.5rem;
        }

        .lang-pill, .scale-pill {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.5rem 0;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .lang-pill:hover, .scale-pill:hover {
          border-color: var(--brand-green);
          color: var(--brand-green);
          background: var(--glass-bg);
        }

        .lang-pill.active, .scale-pill.active {
          background: var(--brand-green);
          border-color: var(--brand-green);
          color: #fff !important;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .settings-footer {
          border-top: 1px solid var(--section-border);
          padding-top: 0.6rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-align: center;
          letter-spacing: 1px;
        }

        /* Mobile Menu support matching original */
        .mobile-toggle {
          display: none;
          cursor: pointer;
          color: var(--text-primary);
          font-size: 1.3rem;
        }

        /* Optimize small desktop viewports to prevent layout squeeze */
        @media (min-width: 992px) and (max-width: 1200px) {
          .navbar {
            padding: 0.45rem 1.2rem !important;
            width: 95% !important;
          }
          .nav-links {
            gap: 0.5rem !important;
          }
          .nav-links a:not(.nav-btn-login) {
            font-size: 0.8rem !important;
            letter-spacing: 0.5px !important;
          }
          .nav-btn-login {
            padding: 7px 16px !important;
            font-size: 0.85rem !important;
          }
          .logo {
            font-size: 1.2rem !important;
            letter-spacing: 1px !important;
          }
          .nav-right {
            gap: 0.5rem !important;
          }
          .theme-toggle, .settings-toggle {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 992px) {
          .mobile-toggle {
            display: block;
          }

          .nav-links {
            position: fixed;
            top: 90px;
            left: 4%;
            width: 92%;
            height: auto;
            max-height: calc(100vh - 120px);
            background: var(--nav-scroll-bg);
            backdrop-filter: blur(28px) saturate(1.85);
            -webkit-backdrop-filter: blur(28px) saturate(1.85);
            border: 1px solid var(--glass-border);
            border-radius: 28px;
            box-shadow: var(--glass-shadow);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1.8rem;
            padding: 3rem 1.5rem;
            transform: translateY(-20px) scale(0.95);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s, visibility 0.3s;
            z-index: 999;
          }

          .nav-links.active {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
          }

          .nav-links li {
            width: 100%;
            text-align: center;
          }

          .nav-links a:not(.nav-btn-login) {
            font-size: 1.1rem;
            display: inline-block;
            width: 100%;
          }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo select-none">
            IBRAT<span>TALIM</span>
          </Link>

          {/* Navigation Links - Center Glass Cloud Navigation */}
          <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
            {links.map((link) => (
              <li key={link.key}>
                <a href={link.href} onClick={(e) => scrollTo(e, link.href.slice(2))}
                   className={location.hash === link.href.slice(1) ? 'active' : ''}>
                  {T(link.key)}
                </a>
              </li>
            ))}
            
            {/* Special Enroll link with pulsing dot */}
            <li>
              <a href="/#contact" onClick={(e) => scrollTo(e, 'contact')} className="nav-link-enroll">
                <span>{T('nav_enroll')}</span>
                <span className="pulse-dot"></span>
              </a>
            </li>

            {/* Login Button with Skimmer effect */}
            <li>
              <Link to="/login" className="nav-btn-login" onClick={() => setMobileOpen(false)}>
                <i className="fas fa-sign-in-alt"></i>
                <span>{lang === 'uz' ? 'Kirish' : lang === 'ru' ? 'Войти' : 'Login'}</span>
              </Link>
            </li>
          </ul>

          {/* Right section containing ONLY toggles */}
          <div className="nav-right">
            {/* Quick Theme Toggle */}
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="theme-toggle liquid-glass-droplet"
              aria-label="Mavzuni almashtirish">
              <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
            </button>
 
            {/* Settings cog with animated panel */}
            <div className="settings-control" ref={settingsRef}>
              <button onClick={() => setSettingsOpen(!settingsOpen)}
                className={`settings-toggle liquid-glass-droplet ${settingsOpen ? 'active' : ''}`}
                aria-label="Sozlamalar">
                <i className="fas fa-cog"></i>
              </button>
 
              {/* Dropdown panel - Float cleanly below */}
              <div className={`settings-panel liquid-glass-card ${settingsOpen ? 'active' : ''}`}>
                <h4 className="settings-title">
                  {lang === 'uz' ? 'Boshqaruv Paneli' : lang === 'ru' ? 'Панель Управления' : 'Control Panel'}
                </h4>
 
                {/* Lang Switches */}
                <div className="settings-group">
                  <span className="settings-label">{lang === 'uz' ? 'Sayt Tili' : lang === 'ru' ? 'Язык сайта' : 'Site Language'}</span>
                  <div className="lang-pills">
                    {['uz', 'ru', 'en'].map((l) => (
                      <button key={l} onClick={() => setLang(l)}
                        className={`lang-pill liquid-glass-droplet ${lang === l ? 'active' : ''}`}>
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
 
                {/* Font Scaling */}
                <div className="settings-group">
                  <span className="settings-label">{lang === 'uz' ? 'Shrift Kattaligi' : lang === 'ru' ? 'Размер Шрифта' : 'Font Size'}</span>
                  <div className="scale-pills">
                    {['small', 'normal', 'large'].map((scale) => (
                      <button key={scale} onClick={() => setFontScale(scale)}
                        className={`scale-pill liquid-glass-droplet ${fontScale === scale ? 'active' : ''}`}>
                        {scale === 'small' ? 'A-' : scale === 'normal' ? 'A' : 'A+'}
                      </button>
                    ))}
                  </div>
                </div>
 
                <div className="settings-footer">
                  IBRAT TALIM v1.2
                </div>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-toggle" aria-label="Menyu">
              <i className={`fas fa-${mobileOpen ? 'times' : 'bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
