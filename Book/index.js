import React, { useRef, useEffect, useState } from 'react';
import './AboutUs3D.css';

export default function AboutUs3D({ isDarkMode }) {
  const trackRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      let progress = -rect.top / totalScrollable;
      progress = Math.min(Math.max(progress, 0), 1);
      
      // Inject global progress into CSS Custom Properties
      trackRef.current.style.setProperty('--scroll-progress', progress);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScale(0.42);
      else if (width < 768) setScale(0.6);
      else if (width < 1024) setScale(0.8);
      else setScale(1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      ref={trackRef} 
      className={`book-scroll-track ${isDarkMode ? 'theme-dark' : 'theme-light'}`}
      id="about"
    >
      <div className="sticky-viewport">
        <div className="writing-table"><div className="spotlight"></div></div>
        
        {/* Ambient Particles */}
        <div className="dust-container">
          {[...Array(8)].map((_, i) => <div key={i} className={`dust dust-${i+1}`} />)}
        </div>

        {/* 3D Scene */}
        <div className="scene-3d" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <div className="ancient-book">
            
            {/* BASE COVERS */}
            <div className="book-cover left-back-cover"></div>
            <div className="book-cover right-back-cover"></div>

            {/* STATIC LEFT BASE PAGE (Revealed at the very end) */}
            <div className="static-page left-base">
              <div className="ink-content">
                <span className="drop-cap">I</span>
                <h2>Biz Haqimizda</h2>
                <p>
                  IBRAT Talim zamonaviy bilimlarni chuqur o'rganish va kelajak 
                  ko'nikmalarini shakllantirish maskanidir. Bizning maqsadimiz — 
                  har bir talabaga mukammal rivojlanish yo'lini taqdim etishdir.
                </p>
              </div>
            </div>

            {/* INTERMEDIATE FLIPPING PAGES (The Photo #2 Fanning Effect) */}
            <div className="flipping-page page-1">
              <div className="page-face front">✦ Kelajak Texnologiyalari</div>
              <div className="page-face back"></div>
            </div>
            
            <div className="flipping-page page-2">
              <div className="page-face front">⚛ Zamonaviy Metodika</div>
              <div className="page-face back"></div>
            </div>

            <div className="flipping-page page-3">
              <div className="page-face front">✵ Individual Yondashuv</div>
              <div className="page-face back"></div>
            </div>

            {/* STATIC RIGHT BASE PAGE (Revealed at the very end) */}
            <div className="static-page right-base">
              <div className="ink-content advantages-grid">
                <div className="seal-item">
                  <div className="seal-icon">✦</div>
                  <div>
                    <h4>Yuqori Sifat</h4>
                    <p>Xalqaro standartlarga mos darsliklar va tizim.</p>
                  </div>
                </div>
                <div className="seal-item">
                  <div className="seal-icon">⚛</div>
                  <div>
                    <h4>Innovatsiya</h4>
                    <p>Interaktiv 3D platformalar va amaliy loyihalar.</p>
                  </div>
                </div>
                <div className="seal-item">
                  <div className="seal-icon">✵</div>
                  <div>
                    <h4>Kafolat</h4>
                    <p>Siz kutgan natija va mustahkam bilim asosi.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}