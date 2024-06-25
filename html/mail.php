<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once '../phpmailer/vendor/autoload.php';
$config = require_once '../../config.php';

$smtpHost = $config['smtpHost'];
$smtpUsername = $config['smtpUsername'];
$smtpPassword = $config['smtpPassword'];
$smtpSecure = $config['smtpSecure'];
$smtpCharSet = $config['smtpCharSet'];
$smtpContentType = $config['smtpContentType'];
$smtpEncoding = $config['smtpEncoding'];

// PHPMailer Object
$mail = new PHPMailer(true); // Argument true in constructor enables exceptions

// SMTP settings for Stackmail
$mail->isSMTP();
$mail->Host = $smtpHost;
$mail->SMTPAuth = true;
$mail->Username = $smtpUsername;
$mail->Password = $smtpPassword;
$mail->SMTPSecure = $smtpSecure;
$mail->Port = 465;
$mail->CharSet = $smtpCharSet;
$mail->ContentType = $smtpContentType;
$mail->Encoding = $smtpEncoding;

$fnameChild = $_POST['Vorname_Kind'];
$lnameChild = $_POST['Nachname_Kind'];
$classChild = $_POST['Klasse_Kind'];
$teacherChild = $_POST['Lehrer_Kind'];
$birthdayChild = $_POST['Geburtstag'];
$fnameParent = $_POST['Vorname_Elternteil_1'];
$lnameParent = $_POST['Nachname_Elternteil_1'];
$address = $_POST['Adresse_1'];
$tel = $_POST['Telefonnummer_1'];
$email = $_POST['Mail_Adresse_1'];
$comment = $_POST['Bemerkung'];
$day = $_POST['Betreuungstermin_ab'];
$validFor = [];
$selectedDates = isset($_POST['selectedDates']) ? $_POST['selectedDates'] : [];

$dateBegin = new DateTime($day);
$formattedDateBegin = $dateBegin->format('d.m.Y');

$dateBirthDay = new DateTime($birthdayChild);
$formattedBirthDay = $dateBirthDay->format('d.m.Y');



// Define the email content
$mail->setFrom('anmeldung@mittagstisch-hirschthal.ch', 'Anmeldung Mittagstisch Hirschthal');
$mail->addAddress('info@mittagstisch-hirschthal.ch', 'Mittagstisch Hirschthal');
$mail->Subject = 'Formular Einreichung';

// Check if the 'semester1' checkbox is selected
if (isset($_POST['Semester_1'])) {
    $validFor[] = '1. Semester';
}

// Check if the 'semester2' checkbox is selected
if (isset($_POST['Semester_2'])) {
    $validFor[] = '2. Semester';
}

// Check if the 'quartal1' checkbox is selected
if (isset($_POST['Quartal_1'])) {
    $validFor[] = '1. Quartal';
}

// Check if the 'quartal2' checkbox is selected
if (isset($_POST['Quartal_2'])) {
    $validFor[] = '2. Quartal';
}

// Check if the 'quartal3' checkbox is selected
if (isset($_POST['Quartal_3'])) {
    $validFor[] = '3. Quartal';
}

// Check if the 'quartal4' checkbox is selected
if (isset($_POST['Quartal_4'])) {
    $validFor[] = '4. Quartal';
}

// Check if the 'onetime' checkbox is selected
if (isset($_POST['Flexibel'])) {
    $validFor[] = 'Flexibel';
}

$mailBody = "
<p>
Vorname Kind: $fnameChild <br>
Nachname Kind: $lnameChild <br>
Klasse Kind: $classChild <br>
Lehrer Kind: $teacherChild <br>
Geburtstag: $formattedBirthDay <br>
---------------------------------------- <br>
Vorname Bezugsperson: $fnameParent <br>
Nachname Bezugsperson: $lnameParent <br>
Adresse: $address <br>
Telefonnummer: $tel <br>
E-Mail: $email <br>
----------------------------------------</p>
";

if (isset($_POST['secondPersonCheck'])) {
    $fnameParent = $_POST['Vorname_Elternteil_2'];
    $lnameParent = $_POST['Nachname_Elternteil_2'];
    $address = $_POST['Adresse_2'];
    $tel = $_POST['Telefonnummer_2'];
    $email = $_POST['Mail_Adresse_2'];

    $mailBody .= "
    <p>---------------------------------------- <br>
    Bezugsperson 2: <br><br>

    Vorname Bezugsperson: $fnameParent <br>
    Nachname Bezugsperson: $lnameParent <br>
    Adresse: $address <br>
    Telefonnummer: $tel <br>
    E-Mail: $email <br>
    ----------------------------------------</p>
    ";
}

$mailBody .= "Betreuungstage: <br>";
if (!empty($selectedDates)) {
    foreach ($selectedDates as $date) {
        // You can use $date as needed
        $mailBody .= "- $date <br>";
    }
} else {
    $mailBody .= "Keine Betreuungstage wurden ausgewählt.<br>";
}

$mailBody .= "<br>
    Betreuungstermin: $formattedDateBegin <br>
    Gültig für: <br>";

if (!empty($validFor)) {
    foreach ($validFor as $valid) {
        $mailBody .= "- $valid <br>";
    }
}

$nachBetreuungNachHause = isset($_POST['NachBetreuungNachHause']) ? $_POST['NachBetreuungNachHause'] : '';
$alleineNachHause = isset($_POST['AlleineNachHause']) ? $_POST['AlleineNachHause'] : '';
$allergien = isset($_POST['Allergien']) ? $_POST['Allergien'] : '';
$lebensmittelallergien = isset($_POST['Lebensmittelallergien']) ? $_POST['Lebensmittelallergien'] : '';
$medikamente = isset($_POST['Medikamente']) ? $_POST['Medikamente'] : '';
$schulhausplatz = isset($_POST['Schulhausplatz']) ? $_POST['Schulhausplatz'] : '';

// Check if there are text areas and 'yes' is selected
$allergienDetails = ($allergien == 'yes') ? $_POST['Allergien-details'] : '';
$lebensmittelallergienDetails = ($lebensmittelallergien == 'yes') ? $_POST['Lebensmittelallergien-details'] : '';
$medikamenteDetails = ($medikamente == 'yes') ? $_POST['Medikamente-details'] : '';

$mailBody .= "
    ---------------------------------------- <br>
    Nach Betreuung nach Hause: $nachBetreuungNachHause<br>
    Alleine nach Hause: $alleineNachHause<br>
    Allergien: $allergien<br>
    Allergien Details: $allergienDetails<br>
    Lebensmittelallergien: $lebensmittelallergien<br>
    Lebensmittelallergien Details: $lebensmittelallergienDetails<br>
    Medikamente: $medikamente<br>
    Medikamente Details: $medikamenteDetails<br>
    Schulhausplatz: $schulhausplatz<br>
";

$mailBody .= "
    ---------------------------------------- <br>
    Bemerkung: $comment
";

// Email content
$mail->isHTML(true);

$mail->Body = "
Guten Tag, es gab eine neue Anmeldung für den Mittagstisch Hirschthal <br><br>
---------------------------------------- <br>
" . $mailBody;

try {
    // Send the email
    $mail->send();
    $successMessage = 'Sie haben sich erfolgreich angemeldet!';
    $successClass = 'success';
} catch (Exception $e) {
    // Send error notification email
    $successMessage = 'Leider gab es ein Problem, probieren Sie es später erneut.';
    $successClass = 'error';
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Mittagstisch/css/all.css">
    <link rel="stylesheet" href="/Mittagstisch/css/signin.css">
    <link rel="shortcut icon" href="/Mittagstisch/img/logo/logo_notext2.png" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="/Mittagstisch/js/main.js"></script>
    <script src="/Mittagstisch/js/anmeldung.js"></script>
    <title>Anmeldung</title>
</head>

<body>
    <header></header>
    <main>
        <h1>
            <?php echo $successMessage; ?>
        </h1><br>
        <div class="small-break"></div>
        <?php if ($successClass === 'success') { ?>
            <h2>Dies sind Ihre angegebenen Daten:</h2>
            <?php echo $mailBody; ?>
        <?php } ?>
        <div class="small-break"></div>
        <a href="../index.html">Jetzt zurück auf die Startseite</a>
    </main>
    <footer></footer>
</html>
