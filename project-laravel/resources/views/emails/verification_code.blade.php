<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de votre compte</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background-color: #007bff;
            padding: 12px 24px;
            display: inline-block;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
        }
        .button {
            background-color: #28a745;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 Vérification de votre compte</h1>
        <p>Bonjour,</p>
        <p>Bienvenue dans notre communauté ! Pour sécuriser votre compte et vous donner accès à toutes nos fonctionnalités, nous avons besoin de vérifier votre adresse email.</p>
        
        <p>Veuillez entrer le code ci-dessous sur notre site :</p>
        
        <div class="code">{{ $code }}</div>

        <p>Vous pouvez également cliquer sur le bouton ci-dessous et entrer votre code sur la page de validation :</p>


        <p>🔔 **Important :** Ce code est valide pendant une durée limitée. Ne le partagez pas avec d’autres personnes.</p>

        <p>Si vous n’avez pas demandé cette vérification, vous pouvez ignorer cet email en toute sécurité.</p>

        <p>Besoin d’aide ? Contactez notre support, nous serons ravis de vous assister !</p>

        <p class="footer">Merci de faire confiance à App RMAJ ! 🚀</p>
        <img src="https://www.internetmatters.org/wp-content/uploads/2024/08/x-formerly-twitter-article-hero.webp" alt="" style="width: 150px; height: 100px;">

    </div>
</body>
</html>
