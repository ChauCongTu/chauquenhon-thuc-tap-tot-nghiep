<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|min:5|max:255|unique:posts',
            'content' => 'required',
            'excerpt' => 'nullable',
            'category_id' => 'required|numeric|exists:categories,id',
            'status' => 'required|in:publish,schedule,disable',
            'tags' => 'nullable|array',
            'thumb' => 'required',
            'published_at' => 'nullable'
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
