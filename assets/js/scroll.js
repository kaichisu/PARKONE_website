// 監聽滾動事件，改變 header 樣式
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// 點擊首頁連結時平滑滾動到頁面最上方
document.querySelector('a[href="#home"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// 點擊聯絡我們連結時平滑滾動到頁面最底部
document.querySelector('a[href="#contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
});

document.querySelector('a[href="#features"]').addEventListener('click', function(e) {
    e.preventDefault();
    const featuresSection = document.querySelector('.features-section');
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPosition = featuresSection.offsetTop - headerHeight;
    
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
});

document.querySelector('a[href="#features-detail"]').addEventListener('click', function(e) {
    e.preventDefault();
    const featuresDetailSection = document.querySelector('.features-detail');
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPosition = featuresDetailSection.offsetTop - headerHeight;
    
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
});