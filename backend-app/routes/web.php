<?php

use App\Models\Post;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect(env('APP_URL') . '/request-docs');
});

Route::get('/demo', function () {
    // Biến string đại diện cho thời gian cụ thể
    $timeString = '2024-03-20 18:54:00';

    // Chuyển đổi biến string thành đối tượng DateTime
    
});
