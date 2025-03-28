<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostMedia extends Model
{
    protected $table = 'PostMedia';
    public $timestamps = false;

    protected $fillable = [
        'post_id',
        'media_id',
    ];

    public function media()
    {
        return $this->belongsTo(Media::class, 'media_id', 'media_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id', 'post_id');
    }
}