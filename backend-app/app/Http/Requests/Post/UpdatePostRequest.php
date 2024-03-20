<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|min:5|max:255|unique:posts,title,' . $this->route('post'),
            'content' => 'required',
            'excerpt' => 'nullable',
            'author_id' => 'nullable|numeric|exists:users,id',
            'category_id' => 'required|numeric|exists:categories,id',
            'status' => 'required|in:publish,schedule,disable',
            'tags' => 'nullable|array',
            'tags.*' => 'max:255',
            'published_at' => 'nullable',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        // dd($validator);
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()
        ]));
    }
}
