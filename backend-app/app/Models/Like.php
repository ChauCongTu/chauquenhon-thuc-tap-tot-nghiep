<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    protected $fillable = [
        'post_id', 'user_id'
    ];

    // Định nghĩa quan hệ với bảng Users
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Định nghĩa quan hệ với bảng Posts
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
