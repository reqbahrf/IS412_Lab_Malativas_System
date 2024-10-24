<?php

use App\Http\Controllers\AuthController;
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

Route::get('/dashboard', function () { return view('dashboard');})
    ->name('dashboard')
    ->middleware('auth');

