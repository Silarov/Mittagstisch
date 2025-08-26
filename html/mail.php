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

// Retrieve form data with checks
$fnameChild = isset($_POST['Vorname_Kind']) ? htmlspecialchars($_POST['Vorname_Kind']) : 'Nicht angegeben';
$lnameChild = isset($_POST['Nachname_Kind']) ? htmlspecialchars($_POST['Nachname_Kind']) : 'Nicht angegeben';
$classChild = isset($_POST['Klasse_Kind']) ? htmlspecialchars($_POST['Klasse_Kind']) : 'Nicht angegeben';
$teacherChild = isset($_POST['Lehrer_Kind']) ? htmlspecialchars($_POST['Lehrer_Kind']) : 'Nicht angegeben';
$birthdayChild = isset($_POST['Geburtstag']) ? $_POST['Geburtstag'] : 'Nicht angegeben';
$fnameParent = isset($_POST['Vorname_Elternteil_1']) ? htmlspecialchars($_POST['Vorname_Elternteil_1']) : 'Nicht angegeben';
$lnameParent = isset($_POST['Nachname_Elternteil_1']) ? htmlspecialchars($_POST['Nachname_Elternteil_1']) : 'Nicht angegeben';
$address = isset($_POST['Adresse_1']) ? htmlspecialchars($_POST['Adresse_1']) : 'Nicht angegeben';
$tel = isset($_POST['Telefonnummer_1']) ? htmlspecialchars($_POST['Telefonnummer_1']) : 'Nicht angegeben';
$email = isset($_POST['Mail_Adresse_1']) ? htmlspecialchars($_POST['Mail_Adresse_1']) : 'Nicht angegeben';
$comment = isset($_POST['Bemerkung']) ? htmlspecialchars($_POST['Bemerkung']) : 'Keine Bemerkung';
$day = isset($_POST['Betreuungstermin_ab']) ? $_POST['Betreuungstermin_ab'] : 'Nicht angegeben';
$selectedDates = isset($_POST['selectedDates']) ? $_POST['selectedDates'] : [];
$validFor = isset($_POST['validFor']) ? $_POST['validFor'] : [];

$dateBegin = new DateTime($day);
$formattedDateBegin = $dateBegin->format('d.m.Y');

$dateBirthDay = new DateTime($birthdayChild);
$formattedBirthDay = $dateBirthDay->format('d.m.Y');

// Email content
$mail->setFrom('anmeldung@mittagstisch-hirschthal.ch', 'Anmeldung Mittagstisch Hirschthal');
$mail->addAddress('info@mittagstisch-hirschthal.ch', 'Mittagstisch Hirschthal');
$mail->Subject = 'Formular Einreichung';

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

// Add second person details if provided
if (isset($_POST['secondPersonCheck'])) {
    $fnameParent2 = isset($_POST['Vorname_Elternteil_2']) ? htmlspecialchars($_POST['Vorname_Elternteil_2']) : 'Nicht angegeben';
    $lnameParent2 = isset($_POST['Nachname_Elternteil_2']) ? htmlspecialchars($_POST['Nachname_Elternteil_2']) : 'Nicht angegeben';
    $address2 = isset($_POST['Adresse_2']) ? htmlspecialchars($_POST['Adresse_2']) : 'Nicht angegeben';
    $tel2 = isset($_POST['Telefonnummer_2']) ? htmlspecialchars($_POST['Telefonnummer_2']) : 'Nicht angegeben';
    $email2 = isset($_POST['Mail_Adresse_2']) ? htmlspecialchars($_POST['Mail_Adresse_2']) : 'Nicht angegeben';

    $mailBody .= "
    <p>
    Bezugsperson 2: <br><br>

    Vorname Bezugsperson: $fnameParent2 <br>
    Nachname Bezugsperson: $lnameParent2 <br>
    Adresse: $address2 <br>
    Telefonnummer: $tel2 <br>
    E-Mail: $email2 <br>
    ----------------------------------------</p>
    ";
}

$mailBody .= "Betreuungstage: <br>";
if (!empty($selectedDates)) {
    foreach ($selectedDates as $date) {
        $mailBody .= "- $date <br>";
    }
} else {
    $mailBody .= "Keine Betreuungstage wurden ausgewählt.<br>";
}

$mailBody .= "<br>
    Betreuungstermin: $formattedDateBegin <br>
    Gültig für: <br>";

// Ensure 'validFor' values are added
if (!empty($validFor)) {
    foreach ($validFor as $valid) {
        $mailBody .= "- $valid <br>";
    }
}

$automatischeVerlaengerung = isset($_POST['AutomatischeVerlaengerung']) ? $_POST['AutomatischeVerlaengerung'] : 'Nicht angegeben';
$nachBetreuungNachHause = isset($_POST['NachBetreuungNachHause']) ? $_POST['NachBetreuungNachHause'] : 'Nicht angegeben';
$alleineNachHause = isset($_POST['AlleineNachHause']) ? $_POST['AlleineNachHause'] : 'Nicht angegeben';
$allergien = isset($_POST['Allergien']) ? $_POST['Allergien'] : 'Nicht angegeben';
$lebensmittelallergien = isset($_POST['Lebensmittelallergien']) ? $_POST['Lebensmittelallergien'] : 'Nicht angegeben';
$medikamente = isset($_POST['Medikamente']) ? $_POST['Medikamente'] : 'Nicht angegeben';
$schulhausplatz = isset($_POST['Schulhausplatz']) ? $_POST['Schulhausplatz'] : 'Nicht angegeben';

// Check if there are text areas and 'yes' is selected
$allergienDetails = ($allergien == 'yes') ? isset($_POST['Allergien-details']) ? $_POST['Allergien-details'] : 'Nicht angegeben' : 'Nicht angegeben';
$lebensmittelallergienDetails = ($lebensmittelallergien == 'yes') ? isset($_POST['Lebensmittelallergien-details']) ? $_POST['Lebensmittelallergien-details'] : 'Nicht angegeben' : 'Nicht angegeben';
$medikamenteDetails = ($medikamente == 'yes') ? isset($_POST['Medikamente-details']) ? $_POST['Medikamente-details'] : 'Nicht angegeben' : 'Nicht angegeben';

$mailBody .= "
    ---------------------------------------- <br>
    Automatische Verlängerung: $automatischeVerlaengerung <br>
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

// Final email body
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
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/signin.css">
    <link rel="shortcut icon" href="/Mittagstisch/img/logo/logo_notext2.png" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/anmeldung.js"></script>
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