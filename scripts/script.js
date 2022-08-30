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
    const emailPostcardControls = document.querySelector('.email-postcard__controls')
    const popupEmailPostcard = document.querySelector('.email-postcard').cloneNode(true)

    // ! functions calling
    window.addEventListener('scroll', showToTopButton, false)
    header.addEventListener('click', onHeaderClickHandler, false)
    menu.addEventListener('click', onMenuClickHandler, false)
    doropMenuLink.addEventListener('click', dropMenuHandler, false)
    emailPostcardControls.addEventListener('click', postcardControlsHandler, false)
    toTopBtn.addEventListener('click', scrollToTop, false)
    cookiesWindow.addEventListener('click', onCookiesWindowClick, false)
    renderPopupWindow(popupEmailPostcard)
        .then(element => createPopupEmailPostcard(element))
        .catch(error => console.error(error))
    popupEmailPostcard.addEventListener('click', onEmailPostcardClick, false)
    itemsCardsSlider()

    // * set body scroll function
    function setBodyScroll(element) {
        if (element.classList.contains('menu__icon_active')) {
            body.dataset.bodyScroll = false
        } else {
            body.dataset.bodyScroll = true
        }
    }

    // * header functionality
    // * header handler
    function onHeaderClickHandler(e) {
        if (e.target.classList.contains('menu__icon')) {
            e.target.classList.toggle('menu__icon_active')
            menu.classList.toggle('menu__body_open')
            setBodyScroll(e.target)
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

    // * mobile menu handler
    function onMenuClickHandler({ target }) {
        const mobileMenuIcon = document.querySelector('.menu__icon')

        if (screen.width <= 1000 && target.matches('a')) {
            menu.classList.remove('menu__body_open')
            mobileMenuIcon.classList.remove('menu__icon_active')
            setBodyScroll(mobileMenuIcon)
        } else if (screen.width <= 1000 && target.classList.contains('menu__link_with-arrow')) {
            return
        }
    }

    // * email postcard controls block handler
    function postcardControlsHandler(e) {
        if (e.target.classList.contains('email-postcard__button')) {
            const input = e.currentTarget.children[0].firstElementChild

            apiService(input.value, {
                method: 'GET',
                redirect: 'follow'
            }).then(res => checkResponceStatus(res))
                .catch(err => showAlertMsg(err))

            input.value = ""
        }
    }

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

    // * cookies modal window handler
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
                setTimeout(() => { resolve(node) }, 30000)
            }
        })
    }

    let emailPostcardColors = ['#DCE5E2', '#f4ebdb', '#c4dfe6']

    function postCardColorPicker(colorsArr = emailPostcardColors) {
        return colorsArr[Math.floor(Math.random() * colorsArr.length)]
    }

    function createPopupEmailPostcard(element) {
        const closeBtn = document.createElement('span')
        closeBtn.classList.add('email-postcard__close-btn')
        closeBtn.innerHTML = '&times;'
        element.appendChild(closeBtn)
        element.classList.add('email-postcard_popup')
        element.style.backgroundColor = postCardColorPicker()
        // * added EventListener for popup postcard controls block
        element.children[2].addEventListener('click', postcardControlsHandler, false)
        main.insertAdjacentElement('afterbegin', element)
    }

    // * popup email postcard handler
    function onEmailPostcardClick(e) {
        if (e.target.classList.contains('email-postcard__close-btn') || e.target.nodeName === 'BUTTON') {
            popupEmailPostcard.remove()
        }
    }

    // ! API sevice
    async function http(url, options) {
        try {
            const response = await fetch(url, options)
            if (Math.floor(response.status / 100) === 2) {
                const responseData = response.json()
                return responseData
            } else {
                return Promise.reject(response.status)
            }
        } catch (error) {
            showAlertMsg(error)
        }
    }

    function apiService(userEmail, requestOptions) {
        const apiUrl = 'https://api.eva.pingutil.com/email'

        if (!userEmail.length) {
            alert('Error')
            return
        }

        return http(`${apiUrl}?email=${userEmail}`, requestOptions)
    }

    function checkResponceStatus({ status, data: { email_address, deliverable } }) {
        if (status === 'success' && deliverable === true) {
            showAlertMsg(`Response status: ${status}, ${email_address} is deliverable`)
        } else if (status === 'success' && deliverable === false) {
            showAlertMsg(`Response status: ${status}, ${email_address} is not deliverable`)
        } else {
            showAlertMsg(`Response status: ${status}`)
        }
    }

    function showAlertMsg(message) {
        alert(message)
    }

    // ! swiper slider
    // * advertisment slider settings  
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

    /* 
        * function which initializes swiper when screen width smaller than 1200px     
        * items cards slider settings
    */
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