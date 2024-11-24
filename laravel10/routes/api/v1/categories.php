<?php

use App\Http\Controllers\Api\v1\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum'
])->prefix('')->name('category.')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index'])->name('index');

    Route::get('/category/{category}', [CategoryController::class, 'show'])->name('show');
    Route::post('/category', [CategoryController::class, 'store'])->name('store');
    Route::post('/category-update-status/{category}', [CategoryController::class, 'updateStatus'])->name('updateStatus');
    Route::patch('/category/{category}', [CategoryController::class, 'update'])->name('update');
});
