<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\BanRequest;
use App\Http\Requests\User\SetRoleRequest;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function ban(BanRequest $request)
    {

    }
    public function role(SetRoleRequest $request)
    {
        $user = User::find($request->user_id);
        $user->assignRole($request->role);
        return response()->json([
            'success' => true,
            'message' => 'Set role successfully!'
        ]);
    }
    public function stats()
    {
        $post_count = Post::where('status', 'publish')->count();
        $user_count = User::count();
        $comment_count = Comment::count();
        $view_count = Post::where('status', 'publish')->sum('view_count');

        return response()->json([
            'success' => true,
            'data' => [
                'post_count' => $post_count,
                'user_count' => $user_count,
                'comment_count' => $comment_count,
                'view_count' => $view_count
            ]
        ]);
    }
    public function index()
    {
        $users = User::get();
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}
