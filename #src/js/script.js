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

})();
