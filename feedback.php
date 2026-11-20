<?php

$Usersname = $_POST["name"] ?? "";
$UserEmail = $_POST["email"] ?? "";
$UserGender = $_POST["gender"] ?? "";
$DateTime = $_POST["datetime"] ?? "";
$UserFeedback = $_POST["feedback"] ?? "";

$DateTimeNew = !empty($DateTime) ? new DateTime($DateTime) : null;

?>

<!DOCTYPE html>
<html>
<head>
    <title>Your Feedback</title>

    <style>
        
body {
    margin: 0;
    padding: 30px 15px;
    font-family: "Trebuchet MS", sans-serif;
    background-color: #F5EBD5;
    background-image: radial-gradient(#D9C5E5 1.5px, transparent 1.5px);
    background-size: 22px 22px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #FFF9EC;
    width: 420px;
    padding: 35px;
    border: 4px solid #633C82;
    border-radius: 30px;
    box-shadow: 8px 8px 0px #D98A43;
}

h1 {
    text-align: center;
    color: #633C82;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.subtitle {
    text-align: center;
    color: #D16A37;
    font-weight: bold;
    letter-spacing: 2px;
}

.divider {
    width: 80px;
    height: 5px;
    background-color: #E5A04C;
    margin: 25px auto;
    border-radius: 10px;
}

.detail {
    background-color: #E9DDF0;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
    border-left: 5px solid #9B70B5;
}

.label {
    color: #754C91;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.value {
    color: #49335D;
    font-size: 16px;
    overflow-wrap: anywhere;
}

.success {
    background-color: #E5A04C;
    color: #543568;
    text-align: center;
    padding: 16px;
    border-radius: 30px;
    margin-top: 25px;
    font-weight: bold;
}

.footer {
    text-align: center;
    color: #754C91;
    font-weight: bold;
    margin-top: 25px;
    letter-spacing: 2px;
}


    </style>
</head>

<body>

<div class="container">

    <h1>Thank You!</h1>

    <p class="subtitle">
        Your feedback is truly appreciated.
    </p>

    <div class="divider"></div>

    <div class="detail">
        <div class="label">NAME</div>
        <div class="value">
            <?php echo htmlspecialchars($Usersname); ?>
        </div>
    </div>

    <div class="detail">
        <div class="label">EMAIL</div>
        <div class="value">
            <?php echo htmlspecialchars($UserEmail); ?>
        </div>
    </div>

    <div class="detail">
        <div class="label">GENDER</div>
        <div class="value">
            <?php echo htmlspecialchars($UserGender); ?>
        </div>
    </div>

    <div class="detail">
        <div class="label">DATE & TIME</div>
        <div class="value">
            <?php
            echo $DateTimeNew
                ? $DateTimeNew->format('d-m-Y')
                : "";
            ?>
        </div>
    </div>

    <div class="detail">
        <div class="label">YOUR FEEDBACK</div>
        <div class="value">
            <?php echo nl2br(htmlspecialchars($UserFeedback)); ?>
        </div>
    </div>

    <div class="success">
        ✓ Your feedback has been submitted successfully!
    </div>

    <div class="footer">
        <a href="feedbackform.html"> CONTINUE LISTENING TO MUSIC </a>
    </div>

</div>

</body>
</html>
