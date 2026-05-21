// Scroll animation logic
document.addEventListener('DOMContentLoaded', () => {
    const trackRef = document.querySelector('.book-scroll-track');
    const scene3d = document.querySelector('.scene-3d');

    const handleScroll = () => {
        if (!trackRef) return;
        const rect = trackRef.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        
        let progress = -rect.top / totalScrollable;
        progress = Math.min(Math.max(progress, 0), 1);
        
        // Apply scroll animation
        trackRef.style.setProperty('--scroll-progress', progress);
        if (scene3d) {
            scene3d.style.transform = `perspective(1000px) rotateY(${progress * 45}deg)`;
        }
    };

    const handleResize = () => {
        const width = window.innerWidth;
        let scale = 1;
        if (width < 480) scale = 0.42;
        else if (width < 768) scale = 0.6;
        else if (width < 1024) scale = 0.8;
        else scale = 1;
        
        if (scene3d) {
            scene3d.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();
});
