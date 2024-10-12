<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ServiceController;
use App\Mail\recoverMailable;

/* --- Rutas Usuarios --- */

Route::get('/view', [UserController::class, 'index']);
Route::post('/registre', [UserController::class, 'store']);
Route::get('/search/{id}', [UserController::class,'show']);
Route::delete('/delete/{id}', [UserController::class,'destroy']);

Route::post('/restaurarPass', [UserController::class,'restorePassword']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class,'logout']);

/* --- Rutas Productos --- */

Route::get('/view/product', [ProductController::class,'index']);
Route::post('/registre/product', [ProductController::class,'store']);
Route::get('/show/product/{id}', [ProductController::class,'show']);
Route::put('/update/product/{id}', [ProductController::class,'update']);
Route::delete('/delete/product/{id}', [ProductController::class,'destroy']);

/* --- Rutas Servicios --- */

Route::get('/view/service', [ServiceController::class,'index']);
Route::post('/registre/service', [ServiceController::class,'store']);
Route::get('/show/service/{id}', [ServiceController::class,'show']);
Route::put('/update/service/{id}', [ServiceController::class,'update']);
Route::delete('/delete/service/{id}', [ServiceController::class,'destroy']);

/* --- Rutas Factura --- */

Route::get('/view/factura', [ServiceController::class,'index']);
Route::post('/registre/factura', [ServiceController::class,'store']);
Route::get('/show/factura/{id}', [ServiceController::class,'show']);
Route::put('/update/factura/{id}', [ServiceController::class,'update']);
Route::delete('/delete/factura/{id}', [ServiceController::class,'destroy']);


/* ---- Envio de correo ---- */
Route::post('/send', [UserController::class, 'send']);