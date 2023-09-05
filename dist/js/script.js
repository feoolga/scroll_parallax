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
;(function() {
	// window.addEventListener('scroll', e => {
    //     document.body.style.cssText += `--scrollTop: ${this.scrollY}px`
    // })
    
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    if(ScrollTrigger.isTouch !== 1){
        ScrollSmoother.create({
            wrapper: '.wrapper',
            content: '.content',
            smooth: 1.2,
            effects: true,
        })

        gsap.fromTo('.main-article', {color: '#fff'}, {
            color: '#FF0000',
            scrollTrigger: {
                trigger: '.main-article',
                start: 'top',
                end: '800',
                scrub: true,
            }
        })

        let itemsLeft = gsap.utils.toArray('.gallery__left .gallery__item')

        itemsLeft.forEach(element => {
            gsap.fromTo(element, {x: -100, opacity: 0}, {
                opacity: 1, x: 0,
                scrollTrigger: {
                    trigger: element,
                    start: '-800',
                    end: '-100',
                    scrub: true,
                }
            })
        });

        let itemsRight = gsap.utils.toArray('.gallery__right .gallery__item')

        itemsRight.forEach(element => {
            gsap.fromTo(element, {x: 120, opacity: 0}, {
                opacity: 1, x: 0,
                scrollTrigger: {
                    trigger: element,
                    start: '-800',
                    end: '-100',
                    scrub: true,
                }
            })
        });
    }

    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // if (isMobile.any()) {
    //     alert('is mobile !');
    // } else {
    //     alert('is computer !');
    // }
})();
