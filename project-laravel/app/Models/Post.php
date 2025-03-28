<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'Posts';

    protected $primaryKey = 'post_id';

    protected $fillable = ['user_id', 'content', 'reply_to']; 

    public $timestamps = false; 

    // Relation : un post appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Relation : un post peut avoir des médias
    public function media()
    {
        return $this->belongsToMany(Media::class, 'PostMedia', 'post_id', 'media_id');
    }

    // Relation : un post peut avoir plusieurs commentaires
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'post_id');
    }

    // Relation : un post peut avoir plusieurs likes
    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id', 'post_id');
    }

    // Relation : un post peut être reposté plusieurs fois
    public function reposts()
    {
        return $this->hasMany(Repost::class, 'post_id', 'post_id');
    }

    // Relation : un post peut être sauvegardé par plusieurs utilisateurs
    public function savedPosts()
    {
        return $this->hasMany(SavedPost::class, 'post_id', 'post_id');
    }

    public function hashtags()
    {
        return $this->belongsToMany(Hashtag::class, 'PostHashtag', 'post_id', 'hashtag_id');
    }
    
    
}