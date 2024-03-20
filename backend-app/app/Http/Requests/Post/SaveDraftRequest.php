<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SaveDraftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'nullable|min:5|max:255',
            'content' => 'nullable',
            'excerpt' => 'nullable',
            'category_id' => 'nullable|numeric|exists:categories,id',
            'status' => 'nullable|in:publish,schedule,disable',
            'tags' => 'nullable',
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
