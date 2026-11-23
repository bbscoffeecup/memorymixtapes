<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>All Feedbacks</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 40px;
        }

        h2 {
            text-align: center;
            color: #2d3e50;
            margin-bottom: 30px;
        }

        table {
            border-collapse: collapse;
            width: 70%;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        th, td {
            padding: 12px 15px;

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
            border-radius: 8px;
            transition: 0.3s;
        }

        .back-link a:hover {
            background-color: #cc0000;
        }

        .no-data {
            text-align: center;
            padding: 20px;
            color: #777;
        }
    </style>
</head>
<body>

    <h2>All Submitted Feedbacks</h2>

    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
        </tr>
        
    </table>
    
    <div class="back-link">
        <a href='index.php'>➕ Give Another Feedback</a>
    </div>

</body>
</html>
