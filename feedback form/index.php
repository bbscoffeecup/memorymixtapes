<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Feedback Form</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .form-container {
            background-color: #fff;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            width: 350px;
            text-align: center;
        }

        h2 {
            color: #2d3e50;
            margin-bottom: 20px;
            font-weight: 600;
        }

                input, textarea {
            width: 100%;
            padding: 10px 12px;
            margin: 8px 0;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 15px;
            background-color: #fafafa;
            transition: border 0.3s;
        }

        input:focus, textarea:focus {
            border: 1px solid #007bff;
            outline: none;
            background-color: #fff;
        }

        textarea {
            resize: none;
        }

        button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 0;
            width: 100%;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 10px;
        }

        button:hover {
            background-color: #0056b3;
        }
        .footer-text {
            margin-top: 10px;
            color: #777;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Feedback Form</h2>

        <form action="save_feedback.php" method="POST">

            <input type="text" name="name" placeholder="Your Name" required autocomplete="off">

            <input type="email" name="email" placeholder="Your Email" required autocomplete="off">

            <textarea name="message" rows="4" placeholder="Write your feedback..." required autocomplete="off"></textarea>

            <button type="submit">Submit Feedback</button>
        </form>
        <div class="footer-text">We value your opinion ❤️</div>
    </div>
</body>
</html>
