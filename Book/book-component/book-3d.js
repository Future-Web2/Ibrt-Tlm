// 3D Book Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const trackRef = document.querySelector('.book-scroll-track');

    const handleScroll = () => {
        if (!trackRef) return;
        const rect = trackRef.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        
        let progress = -rect.top / totalScrollable;
        progress = Math.min(Math.max(progress, 0), 1);
        
        trackRef.style.setProperty('--scroll-progress', progress);
    };

    const handleResize = () => {
        const width = window.innerWidth;
        let scale = 1;
        if (width < 480) scale = 0.42;
        else if (width < 768) scale = 0.6;
        else if (width < 1024) scale = 0.8;
        else scale = 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();
});
