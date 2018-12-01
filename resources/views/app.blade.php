<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <title>Pet registration system</title>
        <base href="/">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="{{ asset('dist/favicon.ico') }}">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body>
        <app-root></app-root>
        <script type="text/javascript" src="{{ asset('dist/runtime.js') }}"></script>
        <script type="text/javascript" src="{{ asset('dist/polyfills.js') }}"></script>
        <script type="text/javascript" src="{{ asset('dist/styles.js') }}"></script>
        <script type="text/javascript" src="{{ asset('dist/vendor.js') }}"></script>
        <script type="text/javascript" src="{{ asset('dist/main.js') }}"></script>
    </body>
</html>

