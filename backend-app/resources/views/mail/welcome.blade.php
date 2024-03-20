<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Community!</title>
    <style>
        /* CSS styles can be placed here or linked externally */
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Welcome to Our Community!</h1>
        <p>Dear {{ $user['full_name'] }},</p>
        <p>We are thrilled to welcome you to our community. Your registration is complete, and we're excited to have you
            on board!</p>
        <p>Feel free to explore our platform and discover everything it has to offer. If you have any questions or need
            assistance, don't hesitate to contact us.</p>
        <p>Once again, welcome aboard!</p>
        <p>Best regards,<br>Your Team</p>
        <a href="#" class="cta-button">Explore Now</a>
    </div>
</body>

</html>
