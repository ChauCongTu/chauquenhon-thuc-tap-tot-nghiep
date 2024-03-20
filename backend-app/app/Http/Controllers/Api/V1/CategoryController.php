<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::orderBy('created_at', 'DESC')->paginate($request->perPage);
        return response()->json([
            'success' => true,
            'message' => 'Get list categories successfully',
            'data' => $categories
        ]);
    }

    public function theme()
    {
        $categories = Category::select('categories.id', 'categories.name', 'categories.summary', 'categories.slug', DB::raw('COUNT(posts.id) as post_count'))
            ->with(['posts' => function ($query) {
                $query->where('status', 'publish')->get();
            }])
            ->leftJoin('posts', 'categories.id', '=', 'posts.category_id')
            // ->where('posts.status', 'publish')
            ->groupBy('categories.id', 'categories.name', 'categories.summary', 'categories.slug')
            ->orderByDesc('post_count')
            ->limit(3)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'Get list categories successfully',
            'data' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request)
    {
        $categoryData = $request->validated();
        $categoryData['slug'] = Str::slug($categoryData['name']);
        $createdCategory = Category::create($categoryData);

        return $createdCategory
            ? response()->json(['success' => true, 'message' => 'Create category successfully', 'data' => $createdCategory])
            : response()->json(['success' => false, 'message' => 'Create category fail']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::with('posts')->findOrFail($id);
        return response()->json([
            'success' => true,
            'message' => 'Get category successfully',
            'data' => $category
        ]);
    }

    public function posts(string $slug, Request $request)
    {
        $category = Category::where('slug', $slug)->first();
        $posts = Post::with('comments')->with('likes')->with('author')->where('status', 'publish')->where('category_id', $category->id)->orderByDesc('published_at')->paginate($request->input('perPage', 12));
        if ($category) {
            return response()->json([
                'success' => true,
                'category' => $category,
                'data' => $posts
            ]);
        }
        return response()->json([
            'success' => false
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\App\Http\Requests\UpdateCategoryRequest $request, string $id)
    {
        $category = Category::findOrFail($id);
        $categoryData = $request->validated();
        $categoryData['slug'] = Str::slug($categoryData['name']);
        $updated = $category->update($categoryData);

        return $updated
            ? response()->json(['success' => true, 'message' => 'Update category successfully'])
            : response()->json(['success' => false, 'message' => 'Update category fail']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $deleted = $category->delete();

        return $deleted
            ? response()->json(['success' => true, 'message' => 'Category deleted successfully'])
            : response()->json(['success' => false, 'message' => 'Delete category fail'], 400);
    }
}
