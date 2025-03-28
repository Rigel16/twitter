<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = "Media";
    protected $primaryKey = "media_id";
    public $timestamps = false;
    protected $fillable = ['file_name', 'short_url'];

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'PostMedia', 'media_id', 'post_id');
    }
}