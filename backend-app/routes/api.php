<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ImageController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\UserController;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

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

Route::get('403', function () {
    return response()->json([
        'success' => false,
        'message' => 'You do not have the required authorization.'
    ]);
})->name('403');

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('/login/google', [AuthController::class, 'googleLogin']);
    Route::get('/login/google/callback/demo', function () {
    });
    Route::get('/login/google/callback', [AuthController::class, 'googleLoginCallback']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('/users/get', function () {
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        });
    });
    // Guest Permission
    Route::get('/search', [PostController::class, 'search'])->name('posts.search');
    Route::get('/tag', [PostController::class, 'tag'])->name('posts.tag');
    Route::get('/stats', [UserController::class, 'stats'])->name('posts.stats');
    Route::resource('/posts', PostController::class)->only('index', 'show');
    Route::resource('/categories', CategoryController::class)->only('index', 'show');
    Route::resource('/tags', TagController::class)->only('index', 'show');
    Route::get('/theme', [CategoryController::class, 'theme'])->name('categories.theme');
    Route::get('/categories/{slug}/posts', [CategoryController::class, 'posts'])->name('categories.posts');
    Route::get('/posts/{post_id}/get-comments', [PostController::class, 'getComments']);
    // User Permission
    Route::group(['middleware' => ['auth:api']], function () {
        Route::post('/upload-image', [ImageController::class, 'upload']);
        // Admin Permission
        Route::group(['middleware' => [ 'role:admin']], function () {
            // Route::post('/users/role', [UserController::class, 'role'])->name('users.set_role');
            // Route::resource('/categories', CategoryController::class)->only('store', 'update', 'destroy');
            // Route::post('/posts/{post_id}/features', [PostController::class, 'features'])->name('posts.feature');
        });
        Route::post('/users/role', [UserController::class, 'role'])->name('users.set_role');
        Route::resource('/categories', CategoryController::class)->only('store', 'update', 'destroy');
        Route::post('/posts/{post_id}/features', [PostController::class, 'features'])->name('posts.feature');
        Route::resource('/posts', PostController::class)->only('store', 'update', 'destroy');
        Route::post('/posts/{post_id}/save', [PostController::class, 'save'])->name('posts.save');
        Route::post('/posts/{post_id}/unsave', [PostController::class, 'unsave'])->name('posts.unsave');
        Route::post('/posts/{post_id}/like', [PostController::class, 'like'])->name('posts.like');
        Route::post('/posts/{post_id}/comment', [PostController::class, 'comment'])->name('post.comment');
        Route::delete('/posts/comment/{id}', [PostController::class, 'destroyComment'])->name('post.comment.destroy');
        Route::put('/posts/comment/{id}', [PostController::class, 'updateComment'])->name('post.comment.update');
        Route::post('/posts/draft', [PostController::class, 'saveDraft'])->name('posts.save_draft');
        Route::get('/posts/draft/preview', [PostController::class, 'preview'])->name('posts.preview_draft');
        Route::post('/posts/{post_id}/status-change', [PostController::class, 'status'])->name('posts.status_change');
        Route::resource('/tags', TagController::class)->only('store', 'update', 'destroy');
        Route::get('/profile/my-posts', function () {
            $posts = Post::with('category')->with('likes')->with('comments')->with('author')
                ->where('author_id', Auth::id())
                ->orderBy('id', 'DESC')->paginate(16);
            return response()->json([
                'success' => true,
                'data' => $posts
            ]);
        });
        Route::get('/profile/my-posts/publish', function () {
            $posts = Post::with('category')->with('likes')->with('comments')->with('author')
                ->where('status', 'publish')
                ->where('author_id', Auth::id())
                ->orderBy('id', 'DESC')->paginate(16);
            return response()->json([
                'success' => true,
                'data' => $posts
            ]);
        });
        Route::get('/profile/my-posts/schedule', function () {
            $posts = Post::with('category')->with('likes')->with('comments')->with('author')
                ->where('status', 'schedule')
                ->where('author_id', Auth::id())
                ->orderBy('id', 'DESC')->paginate(16);
            return response()->json([
                'success' => true,
                'data' => $posts
            ]);
        });
        Route::get('/profile/saved-post', function () {
        });
        Route::get('/users', [UserController::class, 'index']);
    });
});
Route::get('/roles', function () {
    $user = User::first();
    $user->assignRole('admin');
});
