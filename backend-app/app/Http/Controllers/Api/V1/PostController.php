<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\CommentRequest;
use App\Http\Requests\Post\CreatePostRequest;
use App\Http\Requests\Post\GetPostRequest;
use App\Http\Requests\Post\SaveDraftRequest;
use App\Http\Requests\Post\SearchRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\PostSaved;
use Carbon\Carbon;
use Hamcrest\Type\IsArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetPostRequest $request)
    {
        $perPage = $request->input('perPage', 10);
        $status = $request->input('status', null);
        $category = $request->input('category_id', null);
        $orderBy = $request->input('orderBy', 'published_at');

        $postQuery = Post::query();
        if ($status) {
            $postQuery = $postQuery->where('status', $status);
        }
        if ($category) {
            $postQuery = $postQuery->where('category_id', $category);
        }
        $posts = $postQuery->with('author')->with('comments')->with('likes')->with('category')->orderBy($orderBy, 'DESC')->orderBy('published_at', 'DESC')->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Get posts successfully',
            'data' => $posts,
        ]);
    }
    public function saveDraft(SaveDraftRequest $request)
    {
        $post = $request->validated();
        $post['slug'] = isset($post['title']) ? Str::slug($post['title']) : null;
        $post['tags'] = isset($post['tags']) ? (is_array($post['tags']) ? implode('|', $post['tags']) : null) : null;

        $postDraft = json_encode($post);
        $redisKey = 'draft_' . (Auth::check() ? Auth::id() : null);
        $result = Redis::set($redisKey, $postDraft);
        if ($result == "OK") {
            return response()->json([
                'success' => true,
                'message' => 'Lưu trữ bản nháp bài viết thành công',
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Lưu trữ bản nháp bài viết thất bại',
        ]);
    }

    public function preview()
    {
        $redisKey = 'draft_' . (Auth::check() ? Auth::id() : null);
        $post = json_decode(Redis::get($redisKey));
        return response()->json([
            'data' => $post
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePostRequest $request)
    {
        $post = $request->validated();
        if (!$request->published_at) {
            $post['published_at'] = Carbon::now()->format('Y-m-d H:i:s');
        }
        $post['slug'] = Str::slug($post['title']);
        $post['tags'] = implode('|', $post['tags']);
        $post['author_id'] = Auth::id();
        $createdPost = Post::create($post);
        if ($createdPost) {
            $createdPost['tags'] = explode('|', $createdPost['tags']);
            return response()->json([
                'success' => true,
                'message' => 'Create post successfully',
                'data' => $createdPost
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Create post fail',
            'data' => null
        ]);
    }
    public function save(int $post_id)
    {
        if (PostSaved::where('post_id', $post_id)->where('user_id', Auth::id())->doesntExist()) {
            $createdSave = PostSaved::create([
                'post_id' => $post_id,
                'user_id' => Auth::id()
            ]);
            if ($createdSave) {
                return response()->json([
                    'success' => true,
                    'message' => 'Save post successfully',
                    'data' => $createdSave
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => 'Save post failed',
                'data' => null
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Save post failed',
            'data' => null
        ]);
    }
    public function unsave(int $post_id)
    {
        if (PostSaved::where('post_id', $post_id)->where('user_id', Auth::id())->doesntExist()) {
            return response()->json([
                'success' => false,
                'message' => 'This post was not saved',
                'data' => null
            ]);
        }
        $createdSave = PostSaved::where([
            'post_id' => $post_id,
            'user_id' => Auth::id()
        ])->delete();

        if ($createdSave) {
            return response()->json([
                'success' => true,
                'message' => 'Save post successfully',
                'data' => $createdSave
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Save post failed',
            'data' => null
        ]);
    }

    public function like($post_id)
    {
        $userId = Auth::id();

        $existingLike = Like::where('user_id', $userId)
            ->where('post_id', $post_id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            return response()->json([
                'success' => true,
                'message' => 'Bài viết đã được bỏ like thành công!',
                'data' => 'unlike'
            ]);
        } else {
            Like::create([
                'user_id' => $userId,
                'post_id' => $post_id
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Bài viết đã được like thành công!',
                'data' => 'like'
            ]);
        }
    }
    public function features($post_id)
    {
        $post = Post::where('id', $post_id)->first();

        if ($post->is_feature == 0) {
            $post->is_feature = 1;
            $post->save();
            return response()->json([
                'success' => true,
                'message' => 'Unfeatures post successfully',
                'type' => 'unfeatures'
            ]);
        } else {
            $post->is_feature = 0;
            $post->save();
            return response()->json([
                'success' => true,
                'message' => 'Set features post successfully',
                'type' => 'unfeatures'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $post = Post::with('author')->with('category')->with('likes')->with('comments')->where('slug', $slug)->first();

        if ($post) {
            $post['view_count'] = $post['view_count'] + 1;
            $post->save();
            $post['tags'] = explode('|', $post['tags']);
            return response()->json([
                'success' => true,
                'message' => 'Get post successfully',
                'data' => $post,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Post not found',
            'data' => null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id)
    {
        $post = Post::find($id);

        if ($post) {
            $updatedPost = $request->validated();
            $updatedPost['slug'] = Str::slug($updatedPost['title']);
            if (is_array($updatedPost['tags'])) {
                $updatedPost['tags'] = implode('|', $updatedPost['tags']);
            }

            $updatedPost['author_id'] = Auth::id();

            $post->update($updatedPost);

            $post['tags'] = explode('|', $post['tags']);

            return response()->json([
                'success' => true,
                'message' => 'Update post successfully',
                'data' => $post,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Post not found',
            'data' => null,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);

        if ($post) {
            Like::where('post_id', $id)->delete();
            Comment::where('post_id', $id)->delete();
            Post::destroy($id);

            return response()->json([
                'success' => true,
                'message' => 'Delete post successfully',
                'data' => null,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Post not found',
            'data' => null,
        ]);
    }
    public function comment(CommentRequest $request, $post_id)
    {
        $comment = $request->validated();
        $comment['author_id'] = Auth::id();
        $comment['post_id'] = $post_id;

        $createdComment = Comment::create($comment);
        if ($createdComment) {
            $createdComment['author'] = $createdComment->author;
            return response()->json([
                'success' => true,
                'message' => 'Comment successfully',
                'data' => $createdComment,
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Comment failed',
            'data' => null,
        ]);
    }
    public function destroyComment($id)
    {
        $comment = Comment::findOrFail($id);  // Tìm comment theo ID
        $comment->delete();                   // Xóa comment
        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully'
        ]);
    }
    public function updateComment(CommentRequest $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->update($request->validated());  // Cập nhật comment với dữ liệu validate
        return response()->json([
            'success' => true,
            'message' => 'Comment updated successfully',
            'data' => $comment  // Trả về comment đã cập nhật
        ]);
    }

    public function status($post_id, Request $request)
    {
        $post = Post::find($post_id);

        if ($post) {
            $post->status = $request->status;
            $post->save();
            return response()->json([
                'success' => true,
                'message' => 'Set post\'s status successfully',
                'data' => null,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Post not found',
            'data' => null,
        ]);
    }

    public function search(SearchRequest $request)
    {
        $key = $request->input('keyword', null);
        $status = $request->input('status', null);
        $perPage = $request->input('perPage', null);
        $postQuery = Post::query();
        if ($status) {
            $postQuery = $postQuery->where('status', $status);
        }
        $posts = $postQuery->with('author')->with('comments')->with('likes')->whereRaw('MATCH (title) AGAINST ("' . $key . '") > 0')->paginate($perPage);
        return response()->json([
            'success' => true,
            'message' => 'Found ' . $posts->total() . ' result',
            'data' => $posts
        ]);
    }
    public function tag(Request $request)
    {
        $key = $request->input('tags', null);
        $perPage = $request->input('perPage', null);
        $postQuery = Post::query();

        $posts = $postQuery->with('author')->with('comments')->with('likes')->where('tags', 'LIKE', '%' . $key . '%')->paginate($perPage);
        return response()->json([
            'success' => true,
            'message' => 'Found ' . $posts->total() . ' result',
            'data' => $posts
        ]);
    }

    public function getComments($post_id)
    {
        $comments = Comment::with('author')->where('post_id', $post_id)->orderBy('created_at', 'DESC')->paginate(8);
        return response()->json([
            'success' => true,
            'message' => 'Found result',
            'data' => $comments
        ]);
    }
}
