$(document).ready(function () {

    function loadHeader() {
        let page = "";
        if (top.location.pathname === '/index.html') {
            page = 'index.html'
        } else {
            page = '../index.html'
        }
        $("header").append(
            `
                <nav class="navbar">
                    <a href="${page}" class="nav-logo">
                        <img src="/img/logo/logo-handwritten.png" alt="logo" class="dark-mode-activated">
                    </a>
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <div class="dropdown-work-svg">
                                <p class="nav-link click-nav no-close-dropdown">Work</p>
                                <i class="fa-solid fa-caret-down dropdown-work-img-down dropdown-click"></i>
                                <i class="fa-solid fa-caret-up dropdown-work-img-up dropdown-click"></i>
                            </div>                    
                            <ul class="dropdown-nav-links">
                                <li class="dropdown-link click-nav">
                                    <a href="../index.html">
                                        <p>All</p>
                                    </a>
                                </li>
                                <li class="dropdown-link click-nav">
                                    <a href="/html/budapest.html">
                                        <p>Budapest</p>
                                    </a>
                                </li>
                                <li class="dropdown-link click-nav">
                                    <a href="/html/canada.html">
                                        <p>Canada</p>
                                    </a>
                                </li>
                                <li class="dropdown-link click-nav">
                                    <a href="/html/egypt.html">
                                        <p>Egypt</p>
                                    </a>
                                </li>
                            </ul>                        
                        </li>
                        <li class="nav-item">
                            <a href="/html/about.html" class="nav-link click-nav">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="/html/contact.html" class="nav-link click-nav">Contact</a>
                        </li>
                        <li class="footer-hamburger">
                        <div class="dark-mode footer-a dark-mode-activated">
                            <i class="fa-solid fa-sun dark-mode-icon"></i>
                            <i class="fa-solid fa-moon dark-mode-moon dark-mode-icon"></i>
                        </div
                            <div class="footer-links">
                                <a href="https://www.instagram.com/silarov" class="footer-a-instagram footer-a">
                                    <i class="fa-brands fa-instagram footer-links-instagram footer-links-img dark-mode-activated"></i>
                                </a>
                                <a href="https://www.youtube.com/@silarov" class="footer-a-youtube footer-a">
                                    <i class="fa-brands fa-youtube footer-links-youtube footer-links-img dark-mode-activated"></i>
                                </a>
                                <a href="https://vero.co/silarov" class="footer-a-vero footer-a">
                                    <img src="/img/svg/vero_icon_regular_white.svg" class="footer-links-vero footer-links-img dark-mode-activated">
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </nav>
            `
        )
    }

    loadHeader();

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    hamburger.addEventListener("click", mobileMenu);
    
    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
    
    const navLink = document.querySelectorAll(".click-nav");
    
    navLink.forEach(n => n.addEventListener("click", handleNavLinkClick));
    
    function handleNavLinkClick(event) {
        if (!event.target.classList.contains("no-close-dropdown")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }    

    down = $(".dropdown-work-img-down");
    up = $(".dropdown-work-img-up");
    dropdownList = $(".dropdown-nav-links");
    isOpen = false;
    up.css({ "display": "none" })

    $(".dropdown-work-svg").click(function () {
        if (isOpen == false) {
            up.css({ "display": "block" });
            down.css({ "display": "none" });
            dropdownList.css({ "display": "block" })
            isOpen = true;
        } else {
            up.css({ "display": "none" });
            down.css({ "display": "block" });
            dropdownList.css({ "display": "none" })
            isOpen = false;
        }
    })

    if (!localStorage.getItem("SP_Portfolio_darkModeEnabled")) {
        localStorage.setItem("SP_Portfolio_darkModeEnabled", false);
    }

    var darkMode = localStorage.getItem("SP_Portfolio_darkModeEnabled");

    if (darkMode === "true") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    //enables or disables darkmode
    $(".dark-mode").click(function () {
        if (darkMode === "true") {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function disableDarkMode() {
        document.documentElement.style.setProperty('--background', 'white');
        document.documentElement.style.setProperty('--color', 'black');
        document.documentElement.style.setProperty('--link', '#475569');
        document.documentElement.style.setProperty('--linkHover', 'rgb(189, 218, 177)');
        $(".dark-mode-activated").css({ "filter": "brightness(1) invert(0)" })
        $(".fa-sun").css({ "display": "none" })
        $(".dark-mode-moon").css({ "display": "block" })
        $(".footer-links-vero").css({ "filter": "brightness() invert()" })
        darkMode = "false";
        localStorage.setItem("SP_Portfolio_darkModeEnabled", false);
    }
    function enableDarkMode() {
        document.documentElement.style.setProperty('--background', '#1d1e25');
        document.documentElement.style.setProperty('--color', 'white');
        document.documentElement.style.setProperty('--link', 'white');
        document.documentElement.style.setProperty('--linkHover', '#482ff7');
        $(".dark-mode-activated").css({ "filter": "brightness(0) invert()" });
        $(".fa-sun").css({ "display": "block" });
        $(".dark-mode-moon").css({ "display": "none" });
        darkMode = "true";
        localStorage.setItem("SP_Portfolio_darkModeEnabled", true);
    }
})