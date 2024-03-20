<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $rules = [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // max:5120 là kích thước tối đa 5MB (5120 KB)
            ];
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors()]);
            }
            $path = $request->file('image')->store('uploads', 'public');
            return response()->json([
                'success' => true,
                'path' => $path,
                'url' => env('APP_URL') . '/storage/' . $path
            ], 200);
        }
        return response()->json([
            'success' => 'false',
            'message' => 'Please upload image'
        ]);
    }
}
