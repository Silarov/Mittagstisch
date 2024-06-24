$(document).ready(function () {

    function loadErrorMessage() {
        var currentPageURL = window.location.pathname;

        if (currentPageURL !== '/index.html' && currentPageURL !== '/') {
            pageTitleText = document.title.toUpperCase(); // Convert the page title to uppercase

            var pageContent = `
            <div class="error-container">
                <h2>Error</h2>
                <h1>${pageTitleText}</h1>
                <a href="/index.html"><u>Get back to Landing Page</u></a>      
            </div>
            `;

            $('main').append(pageContent);
        }
    }

    loadErrorMessage();

})