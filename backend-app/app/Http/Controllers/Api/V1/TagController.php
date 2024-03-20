<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::orderBy('id', 'DESC')->get();
        return $tags
            ? response()->json(['success' => true, 'message' => 'Get tag successfully', 'data' => $tags])
            : response()->json(['success' => false, 'message' => 'get tag fail']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTagRequest $request)
    {
        $tag = $request->validated();
        $createdTag = Tag::create($tag);

        return $createdTag
            ? response()->json(['success' => true, 'message' => 'Create tag successfully', 'data' => $createdTag])
            : response()->json(['success' => false, 'message' => 'Create tag fail']);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $tag = Tag::findOrFail($id);
        $deleted = $tag->delete();
        dd($deleted);

        return $deleted
            ? response()->json(['success' => true, 'message' => 'Tag deleted successfully'])
            : response()->json(['success' => false, 'message' => 'Delete tag fail']);
    }
}
