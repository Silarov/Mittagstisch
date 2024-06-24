<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once '../mail/vendor/autoload.php';
$config = require_once '../../config.php';

$smtpHost = $config['smtpHost'];
$smtpUsername = $config['smtpUsername'];
$smtpPassword = $config['smtpPassword'];
$smtpSecure = $config['smtpSecure'];
$smtpCharSet = $config['smtpCharSet'];
$smtpContentType = $config['smtpContentType'];
$smtpEncoding = $config['smtpEncoding'];
$privateEmail = $config['privateEmail'];

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



$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$mailBody;

// Define the email content
$mail->setFrom($smtpUsername, 'Form Submission');
$mail->addAddress('info@probst-severin.ch', 'Severin Probst');
$mail->AddCC($privateEmail);
$mail->Subject = 'Formular Submission';

$mailBody = "
<p>
Name: $name <br>
Email: $email <br>
---------------------------------------- <br>
Message: <br>
$message
";

// Email content
$mail->isHTML(true);

$mail->Body = "
<h1> There was a new Submission from $name</h1> <br><br>
---------------------------------------- <br>
" . $mailBody;

try {
    // Send the email
    $mail->send();
    $successTitle = 'Success!';
    $successMessage = "Thanks for getting in touch with me! I'll get in touch with you as soon as possible!";
    $successClass = 'success';
} catch (Exception $e) {
    $successTitle = 'Error';
    $successMessage = "There was an error with sending the mail. Please try again or write me at info@probst-severin.ch";
    $successClass = 'error';
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/navbar.css">
    <link rel="stylesheet" href="/css/others.css">
    <link rel="shortcut icon" href="/img/logo/logo_notext2.png" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="/js/navbar.js"></script>
    <title>Anmeldung</title>
</head>

<body>
    <header></header>
    <main>
        <h1 class="text-about">
            <?php echo $successTitle; ?>
        </h1><br>
        <h2 class="text-about">
            <?php
            echo $successMessage; 
            ?>
        </h2>
        <div class="small-break"></div><br><br>
        <a href="../index.html">Back to the Home Page</a>
    </main>
    <footer></footer>

</html>