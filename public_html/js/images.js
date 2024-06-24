const zipperOrder = [
    0, 11, 23, 1, 12, 24, 2, 13, 25, 3,
    14, 26, 4, 15, 27, 5, 16, 28, 6, 17,
    29, 7, 18, 30, 8, 19, 31, 9, 20, 32,
    10, 21, 33, 22, 34
];

$(document).ready(function () {

    loadBody();

    const selectImg = document.querySelector(".modal-img")
    const selectImgPage = document.querySelector(".modal-page")

    var currentImg;

    loadImgStartPage();

    function loadBody() {
        $("main").append(
            `
        <div class="images">
            <div class="row">
                <div class="column column1"></div>
                <div class="column column2"></div>
                <div class="column column3"></div>
            </div>
        </div>
        <footer>
            <p class="footer-text dark-mode-activated">
                ©2023 Severin Probst 
            </p>
        </footer>
        <div class="modal">
            <div class="modal-close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="modal-arrows">
                <div class="modal-arrow-left">
                    <i class="fa-solid fa-caret-left arrow" id="left"></i>
                </div>
                <div class="modal-arrow-right">
                    <i class="fa-solid fa-caret-right arrow" id="right"></i>
                </div>
            </div>
            <div class="modal-bg"><div>
            <div class="modal-body">
                <div class="modal-body-img-text">
                    <div class="modal-img"></div>
                </div>
            </div>
            <div class="modal-page"></div>
        </div>
            `
        )
    }

    $(".modal-close").click(function () {
        $(".modal").css("display", "none");
    })

    $(".modal-bg").click(function () {
        $(".modal").css("display", "none");
    })

    $(document).keydown(function (e) {
        id = currentImg;
        if (e.key === "Escape") {
            $(".modal").css("display", "none")
        }
        if (e.keyCode == 37) {
            id = decrementId(id);
            loadImg(id);
        } else if (e.keyCode == 39) {
            id = incrementId(id);
            loadImg(id);
        }
    });

    $(".main-img").click(function () {
        $(".modal").css("display", "block")
        var idOfImg = $(this).attr("id");
        loadImg(idOfImg)
    })

    //calculates the amount of images
    function calcImages() {
        let columnMapping = getImagePath(document.title).columnMapping;

        let totalCount = 0;

        for (const mapping of columnMapping) {
            totalCount += mapping.count;
        }

        return totalCount;
    }

    function incrementId(id) {

        let totalCount = calcImages() - 1;
        id++;
        if (id > totalCount) {
            id = 0;
        }
        return id;
    }

    function decrementId(id) {

        let totalCount = calcImages() - 1;
        id--;
        if (id < 0) {
            id = totalCount;
        }
        return id;
    }

    $(".arrow").click(function () {
        id = currentImg;
        if ($(this).attr("id") == "right") {
            id = incrementId(id);
        } else {
            id = decrementId(id)
        }
        loadImg(id);
    })

    function getImagePath(pageName) {

        const pageConfig = {
            "Severin Probst": {
                path: "/img/images/home_webp",
                columnMapping: [
                    { column: ".column1", startId: 0, count: 11 },
                    { column: ".column2", startId: 11, count: 12 },
                    { column: ".column3", startId: 23, count: 12 }
                ]
            },
            "Animals": {
                path: "/img/images/animals_webp",
                columnMapping: [
                    { column: ".column1", startId: 0, count: 11 },
                    { column: ".column2", startId: 11, count: 12 },
                    { column: ".column3", startId: 23, count: 12 }
                ],
                background: "/img/images/animals_webp/0.webp"
            },
            "Budapest": {
                path: "/img/images/budapest_webp",
                columnMapping: [
                    { column: ".column1", startId: 0, count: 9 },
                    { column: ".column2", startId: 9, count: 9 },
                    { column: ".column3", startId: 18, count: 9 }
                ],
                background: "/img/images/budapest_webp/1.webp"
            },
            "Canada": {
                path: "/img/images/canada_webp",
                columnMapping: [
                    { column: ".column1", startId: 0, count: 11 },
                    { column: ".column2", startId: 12, count: 10 },
                    { column: ".column3", startId: 23, count: 10 }
                ],
                background: "/img/images/canada_webp/2.webp"
            },
            "Egypt": {
                path: "/img/images/egypt_webp",
                columnMapping: [
                    { column: ".column1", startId: 0, count: 11 },
                    { column: ".column2", startId: 11, count: 10 },
                    { column: ".column3", startId: 21, count: 11 }
                ],
                background: "/img/images/egypt_webp/0.webp"
            }
            // Add more configurations for other pages as needed
        };

        return pageConfig[pageName] || {
            path: "/img/images/default/",
            columnMapping: [
                // Default column mapping
            ]
        };
    }


    //loads the images into either 3 or 1 column
    function loadImgStartPage() {

        let path = getImagePath(document.title).path;

        let columnMapping = getImagePath(document.title).columnMapping;

        //creates a zipper-order for smartphone-view
        const screenWidth = window.innerWidth;
        let sortingOrder = Array.from({ length: 35 }, (_, i) => i);

        if (screenWidth < 800) {
            sortingOrder = zipperOrder;
        }

        const imagesPerColumn = Math.ceil(sortingOrder.length / columnMapping.length);

        for (const { column, startId, count } of columnMapping) {
            const $column = $(column);

            for (let i = 0; i < imagesPerColumn && i < count; i++) {
                const imgId = sortingOrder[startId + i];
                $column.append(`
                    <img src="${path}/${imgId}.webp" class="main-img" id="${imgId}" />
                `);
            }
        }
    }

    function loadTitleName() {
        var currentPageURL = window.location.pathname;

        let background = getImagePath(document.title).background;

        if (currentPageURL !== '/index.html' && currentPageURL !== '/') {
            pageTitleText = document.title.toUpperCase(); // Convert the page title to uppercase

            var pageContent = `
            <div class="page-title-img">
                <div class="page-title-text-container">
                    <div class="page-title-text">
                        <h1>${pageTitleText}</h1>
                    </div>
                </div>
            </div>
            `;

            $('main').prepend(pageContent);
        }

        $(".page-title-img").css("background-image", "url(" + background + ")");
    }

    loadTitleName();


    //loads the img in fullscreen when clicked on one
    function loadImg(id) {

        let path = getImagePath(document.title).path;

        let selectedImg = "";

        selectedImg =
            `
            <img src="${path}/${id}.webp" alt="img">
        `
        selectImg.innerHTML = selectedImg;
        currentImg = id;
        loadPage(id);
    }

    //loads the cabinet in fullscreen
    function loadPage(id) {

        let path = getImagePath(document.title).path;

        let selectedImgPage = "";
        const modalImages = [
            decrementId(id - 1),
            decrementId(id),
            id,
            incrementId(id),
            incrementId(id + 1)
        ];

        selectedImgPage += '<div class="modal-page-imgs">';

        for (const imgId of modalImages) {
            selectedImgPage += `
                <div class="modal-page-img">
                    <img src="${path}/${imgId}.webp" alt="" class="modal-page-side-img">
                </div>
            `;
        }

        selectedImgPage += '</div>';

        selectImgPage.innerHTML = selectedImgPage;
    }


})