<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostSaved extends Model
{
    use HasFactory;
    protected $table = 'post_saved';
    protected $fillable = [
        'user_id', 'post_id'
    ];

    public function post()
    {
        return $this->belongsTo('posts', 'post_id');
    }
    public function author()
    {
        return $this->belongsTo('users', 'user_id');
    }
}
