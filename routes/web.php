<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('home');
    Route::prefix('menu')->name('menu.')->group(function () {
        Route::get('/', 'MenuController@index')->name('index');
        Route::post('/search', 'MenuController@search')->name('search');
        Route::post('/detail/{id}', 'MenuController@detail')->name('detail');
        Route::post('/get-data', 'MenuController@getData')->name('get-data');
    });
    Route::prefix('cart')->name('cart.')->group(function () {
        // Route::get('/', 'CartController@index')->name('index');
        // Route::post('/search', 'MenuController@search')->name('search');
        Route::get('/', 'CartController@index')->name('index');
        Route::post('/add', 'CartController@add')->name('add');
        Route::put('/update', 'CartController@update')->name('update');
        Route::post('/remove', 'CartController@remove')->name('add');
    });

    Route::prefix('order')->name('order.')->group(function () {
        Route::get('/', 'OrderController@index')->name('index');
        Route::post('/get-data', 'OrderController@getData')->name('get-data');
        Route::post('/order', 'OrderController@order')->name('order');
        Route::get('/placed', 'OrderController@placed')->name('placed');
        Route::post('/placed-detail', 'OrderController@placedDetail')->name('order');
    });
});





require __DIR__ . '/auth.php';
