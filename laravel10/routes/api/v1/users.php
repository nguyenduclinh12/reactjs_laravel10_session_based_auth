<?php

use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum'
])->prefix('')->name('users.')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('index');
    Route::post('/logout', [UserController::class, 'logout']);
   
});

Route::post('/register', [UserController::class, 'store'])->name('register');
Route::post('/login', [UserController::class, 'login']);
