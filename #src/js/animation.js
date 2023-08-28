;(function() {

    window.onload = () => {
        // устанавливаем настройки
        let options = {
            root: null,
            rootMargin: "5px",
            threshold: 0.5,
        };
    
        // создаем наблюдатель
        const observer = new IntersectionObserver((entries, observer) => {
            // для каждой записи-целевого элемента
            entries.forEach(entry => {
                // если элемент является наблюдаемым
                if (entry.isIntersecting) {
                    const elemAnim = entry.target
                    // меняем класс
                    // entry.isIntersecting ? entry.target.classList.replace('active', 'activeBack') : entry.target.classList.replace('activeBack', 'active')
                    elemAnim.classList.add('active')
                    // прекращаем наблюдение
                    observer.unobserve(elemAnim)
                }
            })
        }, options)
    
        // с помощью цикла следим за всеми классами anim на странице
        const animations = document.querySelectorAll('.anim')
        animations.forEach(animation => {
            observer.observe(animation)
        })
    }
})();