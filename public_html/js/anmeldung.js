$(document).ready(function () {

    // Add event listeners to show/hide the text boxes based on "Yes" or "No" selections
    document.getElementById("Allergien-yes").addEventListener("change", function () {
        var detailsField = document.getElementById("Allergien-details");
        detailsField.style.display = this.checked ? "block" : "none";
    });

    document.getElementById("Lebensmittelallergien-yes").addEventListener("change", function () {
        var detailsField = document.getElementById("Lebensmittelallergien-details");
        detailsField.style.display = this.checked ? "block" : "none";
    });

    document.getElementById("Medikamente-yes").addEventListener("change", function () {
        var detailsField = document.getElementById("Medikamente-details");
        detailsField.style.display = this.checked ? "block" : "none";
    });

    $('#secondPersonCheck').change(function () {
        if (this.checked) {
            // If the checkbox is checked, show the "parent2" div
            $('.parent2').css('display', 'block');
        } else {
            // If the checkbox is unchecked, hide the "parent2" div
            $('.parent2').css('display', 'none');
        }
    });

        //shows the dates of every day
        $(".form-days-title").click(function () {
            var classes = $(this).attr('class').split(' ');
            var filteredClasses = classes.filter(function (className) {
                return className !== 'form-days-title';
            });
            var modifiedClass = filteredClasses[0].replace('form-days-', '').replace('-title', '');
    
            $(".form-days-container-" + modifiedClass).toggleClass('hidden');
        });
    
        //saves every day in an array
        var selectedDates = [];
    
        $('.form-days-table td').click(function () {
            var id = $(this).attr('id');
    
            if (id) {
                var index = selectedDates.indexOf(id);
                if (index === -1) {
                    selectedDates.push(id);
                    $('#' + id).css({
                        "background-color": "var(--main-bg-color)",
                        "color": "white"
                    });
                } else {
                    selectedDates.splice(index, 1);
                    $('#' + id).css({
                        "background-color": "transparent",
                        "color": "black"
                    });
                }
            }
            localStorage.setItem("Dates", selectedDates);
        });
})