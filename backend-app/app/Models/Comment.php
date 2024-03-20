<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $primaryKey = 'comment_id';

    protected $fillable = [
        'post_id', 'author_id', 'content'
    ];

    // Định nghĩa quan hệ với bảng Users
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Định nghĩa quan hệ với bảng Posts
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
