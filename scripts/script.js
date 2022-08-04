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

})()