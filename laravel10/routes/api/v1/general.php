<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\UploadFileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum'
])->prefix('')->group(function () {
    Route::get('check-auth', function (Request $request) {
        return $request->user() ? response()->json(['authenticated' => true, 'user' => $request->user()], 200) : response()->json(['authenticated' => false], 401);
    });
});
Route::post('uploadFiles',[UploadFileController::class,'uploadFiles']);
Route::post('uploadVideos',[UploadFileController::class,'uploadVideos']);
