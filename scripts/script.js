(function () {
    // * UI elements
    const body = document.body
    const header = document.querySelector('.header')
    const menu = document.querySelector('.menu__body')
    const navLinks = document.querySelectorAll('.menu__link')
    const doropMenuLink = document.querySelector('.menu__link_with-arrow')

    // ! functions calling
    header.addEventListener('click', onHeaderClickHandler, false)
    doropMenuLink.addEventListener('click', dropMenuHandler, false)
    itemsCardsSlider()

    // * header functionality
    function onHeaderClickHandler(e) {
        if (e.target.classList.contains('menu__icon')) {
            e.target.classList.toggle('menu__icon_active')
            menu.classList.toggle('menu__body_open')
        } else if (e.target.classList.contains('menu__link')) {
            e.target.classList.add('menu__link_active')
            checkNavLinkClass(e.target)
        }
    }

    function checkNavLinkClass(target) {
        navLinks.forEach(link => {
            if (target !== link) {
                link.classList.remove('menu__link_active')
            }
        })
    }

    function dropMenuHandler(e) {
        e.stopPropagation()
        if (screen.width <= 1000) {
            document.querySelector('.menu__sub-menu')
                .classList.toggle('menu__sub-menu_open')
        }
    }

    // ! swiper slider
    /* advertisement slider */
    const swiper = new Swiper('.advertisement__swiper', {
        autoHeight: true,
        spaceBetween: 15,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets'
        },
        simulateTouch: false,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        }
    })

    /* items cards slider */
    function itemsCardsSlider() {
        if (screen.width <= 1200) {
            const itemsSwiper = new Swiper('.items-cards-block__swiper', {
                autoHeight: false,
                spaceBetween: 27,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                watchOverflow: true,
                centeredSlides: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                    },
                    512: {
                        slidesPerView: 1.5,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2.5,
                    },
                    800: {
                        centeredSlides: false
                    },
                    1024: {
                        slidesPerView: 3,
                        centeredSlides: false
                    },
                }

            })
        }
    }

})()