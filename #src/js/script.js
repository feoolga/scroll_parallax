;(function() {
   
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

(function(){

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

    let body = document.querySelector('body')

    if (isMobile.any()) {
        body.classList.add('touch')
        
        document.querySelectorAll('.menu-button').forEach(button => {
            button.addEventListener('click', function(event){
                document.querySelectorAll('.menu-parent').forEach(item => {
                    item.classList.remove('openx')
                })
                event._isClick = true
                button.parentElement.classList.toggle('openx')
            })
        })

        document.body.addEventListener('click', function(event){
            if( event._isClick == true ||
                event.target.classList.contains('menu-button') == true ||
                event.target.classList.contains('level_2') == true ||
                event.target.tagName === 'LI'
                ){
                    console.log(event.target);
                    event._isClick = false
                    return
                } else {

                document.querySelectorAll('.menu-parent').forEach(item => {
                    item.classList.remove('openx')
                    console.log(event.target);
                })
            }
        },true)

    } else {
        body.classList.add('mouse')
    }

})();

// (function(){
//     let body = document.querySelector('body')
//     // document.querySelector('.common').addEventListener('click', function(e){
//     //     e._clickened = "Нажали на общую область"
//     // })
//     document.querySelector('.red-box').addEventListener('click', function(e){
//         e._clickened = true
//     })
//     document.body.addEventListener('click', function(e){
//         if(e._clickened == true){
//             console.log("Нажали на красную область");
//         } else {
//             console.log("Нажали на другую область");
//         }
//     })
// })();