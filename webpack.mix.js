const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js").postCss(
    "resources/css/app.css",
    "public/css",
    [require("postcss-import"), require("tailwindcss"), require("autoprefixer")]
);

mix.styles("resources/css/style.css", "public/css/style.css");

mix.copyDirectory("resources/js/common.js", "public/js/common.js");
mix.copyDirectory("resources/js/sweetalert2.js", "public/js/sweetalert2.js");
mix.copyDirectory("resources/js/menu.js", "public/js/menu.js");
mix.copyDirectory("resources/js/order.js", "public/js/order.js");
mix.copyDirectory("resources/js/order-placed.js", "public/js/order-placed.js");
mix.copyDirectory("resources/adminlte3-1-0", "public/adminlte3-1-0");
