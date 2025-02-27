$(document).ready(function () {

    loadHeader();
    loadFooter();
    loadTitleName();
    handleAnmeldungPage();
    setHeightAbout();
    loadOpeningTimes();

    function loadHeader() {
        $("header").append(
            `
                <header>
                    <div class="nav-container">
                        <nav>
                            <!--<a href="/index.html"><img src="/img/logo/logo.png" class="logo" alt="logo" /></a>-->
                            <a href="/Mittagstisch/index.html" class="logo"></a>
                            <ul>
                                <li><a href="/Mittagstisch/index.html" class="dt">Home</a></li>
                                <li><a href="/Mittagstisch/html/angebot.html" class="dt">Angebot</a></li>
                                <li><a href="/Mittagstisch/html/standort.html" class="dt">Standort</a></li>
                                <li><a href="/Mittagstisch/html/ueber_uns.html" class="dt">Über Uns</a></li>
                                <li><a href="/Mittagstisch/html/anmeldung.html" class="dt anmeldung" id="anmeldung">Anmeldung</a></li>
                                <li>
                                    <div class="hamburger">
                                        <img src="/Mittagstisch/img/icons/bars-solid.svg" alt="hamburger menu" class="open-hamburger">
                                        <img src="/Mittagstisch/img/icons/xmark-solid.svg" alt="close hamburger menu" class="close-hamburger">
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                `
        )
    }

    function loadFooter() {
        $("footer").append(
            `
        <div class="footer-container">
            <div class="footer-text">
                <div class="footer-text-column1 footer-text-column">
                    <div class="footer-text-column1-address">
                        <h1>Adresse</h1>
                        <p>
                        Verein Mittagstisch der Gemeinde Hirschthal <br>
                        Trottengasse 2  <br>
                        Postfach 17 <br>
                        5042 Hirschthal <br>
                        </p>
                    </div><br>
                    <div class="footer-text-column1-openingtimes">
                        <h1>Öffnungszeiten</h1>
                        <div class="opening-times"></div>
                    </div>
                </div>
                <div class="footer-text-column2 footer-text-column">
                    <div class="footer-text-column2-contact">
                        <h1>Kontakt</h1>
                        <p>
                            <b>Administration</b> <br>
                            Melanie Hauri <br>
                            Email: <a href="mailto:info@mittagstisch-hirschthal.ch">info@mittagstisch-hirschthal.ch</a>
                        </p>
                    </div><br>
                    <div class="footer-text-column2-downloads">
                        <h1>Downloads</h1>
                        <p>
                            <a href="/Mittagstisch/files/Statuten.pdf" target="_blank"> Statuten.pdf (435,2K) </a><br>
                            <a href="/Mittagstisch/files/Betriebsreglement.pdf" target="_blank"> Betriebsreglement.pdf (445,4K) </a>
                        </p>
                    </div>
                </div>
                <div class="footer-text-column3 footer-text-column">
                    <div class="footer-text-column3-links">
                        <h1>Links</h1>
                        <p>
                            Links <br>
                            - <a href="/Mittagstisch/files/Ferienplan.pdf" target="_blank"> Ferienplan </a><br><br>

                            Gesetzliche Grundlagen: <br>
                            - <a href="https://gesetzessammlungen.ag.ch/app/de/texts_of_law/815.300/versions/2277" target="_blank"> Kinderbetreuungsgesetz (KiBeG) </a><br>
                            - <a href="https://www.hirschthal.ch/public/upload/assets/116/KinderbetreuungsreglementHirschthalvom08-12-2017.pdf?fp=1574087541343" target="_blank"> Kinderbetreuungsregelement der Gemeinde Hirschthal </a> <br><br>

                            Weitere Links: <br>
                            - <a href="/Mittagstisch/html/impressum.html">Impressum </a> <br>
                            - <a href="/Mittagstisch/html/daten.html">Datenschutzerklärung </a> <br><br>

                            Diverses: <br>
                            - <a href="/Mittagstisch/html/diverses.html">Aktuelles</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <p class="footer-after">
            ©2024 Verein Mittagstisch der Gemeinde Hirschthal
        </p>
        `
        )

        var maxWidth = 0;
        $(".footer-text-column").each(function () {
            var containerWidth = $(this).outerWidth();
            maxWidth = Math.max(maxWidth, containerWidth);
        });

        // Set the maximum width to all text containers
        $(".footer-text-column").css("width", maxWidth + "px");
    }


    function loadTitleName() {
        var currentPageURL = window.location.pathname;

        if (currentPageURL !== '/Mittagstisch/index.html' && currentPageURL !== '/Mittagstisch/') {
            pageTitleText = document.title.toUpperCase(); // Convert the page title to uppercase

            var pageContent = `
            <div class="page-title-img">
                <div class="page-title-text">
                <h1>${pageTitleText}</h1>
                </div>
            </div>
            <div class="big-break"></div>
            `;

            $('main').prepend(pageContent);
        }
    }

    function handleAnmeldungPage() {
        if (window.location.href.indexOf("/Mittagstisch/html/anmeldung.html") > -1) {
            // Min date for sign in form
            var today = new Date().toISOString().split('T')[0];
            document.getElementById("date").setAttribute("min", today);

            if ($('#message-container').length) {
                // Show the message container
                $('#message-container').fadeIn();

                // Hide the message container after 5 seconds
                setTimeout(function () {
                    $('#message-container').fadeOut();
                }, 5000);
            }

            // Remove the 'required' attribute from input elements
            $('.form-container input').removeAttr('required');
        }
    }

    function loadOpeningTimes() {
        $(".opening-times").append(
            `
            <table id="opening-times">
                <thead>
                    <th colspan="2">Montag, Dienstag und Donnerstag</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Frühbetreuung</td>
                        <td>06:30 bis 08:00 Uhr</td>
                    </tr>
                    <tr>
                        <td>Mittagstisch</td>
                        <td>11:45 bis 13:15 Uhr</td>
                    </tr>
                    <tr>
                        <td>Nachmittagsbetreuung</td>
                        <td>13:15 bis 17:30 Uhr</td>
                    </tr>
                </tbody>
            </table>
            `
        );
    }


    function setHeightAbout() {
        // Get all the vorstand-user-container divs
        const userContainers = document.querySelectorAll('.vorstand-user-container');

        // Calculate the maximum height
        let maxHeight = 0;
        userContainers.forEach(container => {
            const height = container.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        // Set the same height for all user containers
        userContainers.forEach(container => {
            container.style.height = `${maxHeight}px`;
        });
    }

    function loadFavicon() {
        const favicon = '<link rel="shortcut icon" href="/Mittagstisch/img/logo/logo_notext2.png" type="image/x-icon">'
        $('head').append(favicon);
    }
    loadFavicon()

    $(".hamburger").click(function () {
        $(".nav-container").toggleClass("fullscreen");
        $(".dt").toggleClass("visible");
        $(".open-hamburger").toggle();
        $(".close-hamburger").toggle();
    });

    $(".button-signin").click(function () {
        window.location.replace("/Mittagstisch/html/anmeldung.html");
    });

    $("#popup-close").click(function() {
        $("#popup-container").css("display", "none");
    });

    $(".team-user").click(function() {
        $(this).find(".team-user-img img").toggleClass("rotate-img");
    });
});