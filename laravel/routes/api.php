<?php

use App\Http\Controllers\ArticalController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RoleUserController;
use App\Http\Controllers\SetupPageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// login
Route::post('login', [LoginController::class,'login']);

// setup api for crud
Route::apiResource('artical', ArticalController::class);
Route::apiResource('banner', BannerController::class);
Route::apiResource('roleUser', RoleUserController::class);
Route::apiResource('setUpPage', SetupPageController::class);

Route::get('getBannerByIsActive', [BannerController::class,'getByIsActive']);
