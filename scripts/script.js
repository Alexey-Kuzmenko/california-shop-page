(function () {
    // * UI elements
    const body = document.body
    const main = document.querySelector('.main')
    const header = document.querySelector('.header')
    const menu = document.querySelector('.menu__body')
    const navLinks = document.querySelectorAll('.menu__link')
    const doropMenuLink = document.querySelector('.menu__link_with-arrow')
    const toTopBtn = document.querySelector('.to-top-btn')
    const cookiesWindow = document.querySelector('.modal-cookies-window')
    const popupEmailPostcard = document.querySelector('.email-postcard').cloneNode(true)

    // ! functions calling
    window.addEventListener('scroll', showToTopButton, false)
    header.addEventListener('click', onHeaderClickHandler, false)
    doropMenuLink.addEventListener('click', dropMenuHandler, false)
    toTopBtn.addEventListener('click', scrollToTop, false)
    cookiesWindow.addEventListener('click', onCookiesWindowClick, false)
    renderPopupWindow(popupEmailPostcard)
        .then(element => createPopupEmailPostcard(element))
        .catch(error => console.error(error))
    popupEmailPostcard.addEventListener('click', onEmailPostcardClick, false)
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

    // ? search inpust functionality
    // function clearSearchInput({ target }) {
    //     if (target.classList.contains === 'search-wrapper__icon') {
    //         // console.log(target.closest('.search-wrapper__input'));
    //         alert('You click lable')
    //     }
    // }

    // * to top button functionality
    function showToTopButton() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            toTopBtn.classList.add('to-top-btn_visible')
        } else {
            toTopBtn.classList.remove('to-top-btn_visible')
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    // * cookies modal window functionality
    function onCookiesWindowClick({ target }) {
        if (target.dataset.btnType === 'accept' || target.dataset.btnType === 'close') {
            cookiesWindow.remove()
        } else if (target.dataset.btnType === 'settings') {
            document.querySelector('.modal-cookies-window__controls-wrapper').classList.toggle('modal-cookies-window__controls-wrapper_open')
        }
    }


    // * email popup postcard functionality
    function renderPopupWindow(node) {
        return new Promise((resolve, reject) => {
            if (!node) {
                reject('Node is not defined')
            } else {
                setTimeout(() => { resolve(node) }, 1000)
            }
        })
    }

    let emailPostCardColors = ['#DCE5E2', '#f4ebdb', '#c4dfe6']

    function postCardColorPicker(colorsArr = emailPostCardColors) {
        return colorsArr[Math.floor(Math.random() * colorsArr.length)]
    }

    function createPopupEmailPostcard(element) {
        const closeBtn = document.createElement('span')
        closeBtn.classList.add('email-postcard__close-btn')
        closeBtn.innerHTML = '&times;'
        element.appendChild(closeBtn)
        element.classList.add('email-postcard_popup')
        element.style.backgroundColor = postCardColorPicker()
        main.insertAdjacentElement('afterbegin', element)
    }

    function onEmailPostcardClick({ target }) {
        if (target.classList.contains('email-postcard__close-btn') || target.nodeName === 'BUTTON') {
            popupEmailPostcard.remove()
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