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
                    // 计算导航栏高度，避免被导航栏遮挡
                    const headerHeight = document.querySelector('.md-header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
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
        const headerHeight = document.querySelector('.md-header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= (sectionTop - headerHeight - 50) &&
                pageYOffset < (sectionTop + sectionHeight - headerHeight - 50)) {
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

    // 页面加载时触发一次滚动事件，确保导航状态正确
    window.dispatchEvent(new Event('scroll'));
});