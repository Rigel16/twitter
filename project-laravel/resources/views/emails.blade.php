<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Emails</title>
</head>
<body>
    <h1>Liste des Emails</h1>
    <ul>
        @foreach ($emails as $email)
            <li>{{ $email }}</li>
        @endforeach
    </ul>
</body>
</html>
