<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::get('/dashboard',[UserController::class,'dashboard']);
Route::post('/logout',[UserController::class,'logout']);

// Posts routes
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);
Route::patch('/posts/{id}/accept', [PostController::class, 'accept']);
Route::patch('/posts/{id}/complete', [PostController::class, 'complete']);

