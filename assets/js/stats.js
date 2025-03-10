function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item');
    
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const number = stat.querySelector('.stat-number');
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2秒
        const steps = 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.round(current).toLocaleString();
        }, duration / steps);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('.stats-section'));