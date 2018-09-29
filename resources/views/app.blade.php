<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ env('APP_NAME', 'Pet registration system') }}</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Fonts -->
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    </head>
    <body>

        <div id="loader"></div>
        <div id="app"></div>

        <script src="{{ asset('js/app.js') }}"></script>

    </body>
</html>
