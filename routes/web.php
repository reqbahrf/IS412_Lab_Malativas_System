<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('index');
})->name('home');

Route::get('/login', function () {return view('login');})
    ->name('login');

Route::post('/logout', [AuthController::class, 'logout'])
    ->name('logout');

Route::post('/login', [AuthController::class, 'login'])
    ->name('submit_login');

Route::get('/register', function () {
    return view('register');
})->name('register');

Route::post('/register', [AuthController::class, 'register'])
    ->name('submit_register');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return view('dashboard');})
        ->name('dashboard');

    Route::resource('/Product', ProductController::class);

    Route::get('/sold-products', SalesController::class)
        ->name('sold-products');
});
