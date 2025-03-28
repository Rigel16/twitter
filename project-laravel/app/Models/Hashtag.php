<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hashtag extends Model
{
    use HasFactory;

    protected $table = 'hashtags';
    protected $primaryKey = 'hashtag_id';
    protected $fillable = ['tag'];

    // Relation avec les posts
    public function posts()
    {
        return $this->belongsToMany(Post::class, 'PostHashtag', 'hashtag_id', 'post_id');
    }
    
    
}
