<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Mail\recoverMailable;

/* --- Rutas Usuarios --- */

Route::get('/view', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/registre', [UserController::class, 'store']);
Route::post('/search/{id}', [UserController::class,'show']);

/* ---- Envio de correo ---- */
Route::post('/send', [UserController::class, 'send']);