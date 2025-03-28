<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostHashtag extends Model
{
    use HasFactory;

    protected $table = 'PostHashtag';
    public $timestamps = false;

    protected $fillable = ['post_id', 'hashtag_id'];
}
