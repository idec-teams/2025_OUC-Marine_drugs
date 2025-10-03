// 平滑滚动实现
document.addEventListener('DOMContentLoaded', function() {
    // 为所有导航链接添加平滑滚动
    document.querySelectorAll('.md-tabs__link').forEach(link => {
        link.addEventListener('click', function(e) {
            // 只对内部链接应用平滑滚动
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 滚动时更新导航激活状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= (sectionTop - 150) &&
                pageYOffset < (sectionTop + sectionHeight - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.md-tabs__link').forEach(link => {
            link.classList.remove('md-tabs__link--active');
            if (link.getAttribute('href').endsWith(current)) {
                link.classList.add('md-tabs__link--active');
            }
        });
    });
});