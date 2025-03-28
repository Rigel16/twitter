<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<style>
    .pagination {
        display: flex;
        justify-content: center;
        list-style: none;
        padding: 0;
    }
    .pagination li {
        margin: 0 5px;
        display: inline-block;
    }
    .pagination li a, .pagination li span {
        padding: 6px 12px;
        text-decoration: none;
        color: #007bff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .pagination li a:hover {
        background-color: #007bff;
        color: white;
    }
    .pagination .active span {
        background-color: #007bff;
        color: white;
        border: 1px solid #007bff;
    }
</style>

    <ul>
        @foreach ($results as $res)
        <li>Email: {{ $res->email }} | Nom: {{ $res->lastname }} | Prénom: {{ $res->firstname }}</li>
        @endforeach
</ul>
    {{ $results->links() }}

</body>
</html>