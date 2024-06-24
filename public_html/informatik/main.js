document.addEventListener('DOMContentLoaded', function () {
    // Your Excel file URL
    const excelUrl = 'masterplan.xlsx';

    // Fetch the Excel file
    fetch(excelUrl)
        .then(response => response.arrayBuffer())
        .then(data => {
            // Parse the Excel data
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const upcomingDateElement = document.getElementById('upcomingDate');
            const upcomingDate = document.getElementById('date');
            const nameExplanation = document.getElementById('nameExplanation');

            // Get today's date
            const today = new Date();

            var nextLearningMode;

            // Find the next upcoming date
            for (let rowNum = 9; rowNum <= 60; rowNum++) {
                const cell = sheet[`B${rowNum}`];

                const learningMode = sheet[`D${rowNum}`];

                if (!cell) {
                    continue;
                }

                const dateCellValue = new Date(cell.w);


                const day = dateCellValue.getDate().toString().padStart(2, '0');
                const month = (dateCellValue.getMonth() + 1).toString().padStart(2, '0');
                const year = dateCellValue.getFullYear();

                const formattedDateString = `${day}.${month}.${year}`;


                if (today < dateCellValue) {
                    if (learningMode) {
                        console.log(learningMode.v + ": " + cell.w);
                        upcomingDateElement.innerHTML = "Nächste Woche haben wir " + "<b>" + learningMode.v + "</b>";
                        upcomingDate.innerHTML = "Datum vom nächsten Mal: " + formattedDateString;
                        nameExplanation.innerHTML += learningMode.v + ": ";
                        nextLearningMode = learningMode.v;
                        break;
                    } else {
                        console.log("Ferien")
                        continue;
                    }
                }
            }

            const sheetName2 = workbook.SheetNames[1];
            const sheet2 = workbook.Sheets[sheetName2];

            for (let rowNum = 2; rowNum < 6; rowNum++) {
                const short = sheet2[`B${rowNum}`]; // Assuming dates are in column B
                const long = sheet2[`A${rowNum}`]; // Assuming dates are in column A

                if (!short) {
                    continue;
                }
                
                var shortedVar = short.v;

                if(shortedVar) {
                    nameExplanation.innerHTML += long.v;
                    break;
                }
                
            }
        })
        .catch(error => console.error('Error fetching Excel file:', error));
});
