<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $table = 'Messages';

    protected $fillable = ['sender_id', 'receiver_id', 'content', 'sent_at'];

    public $timestamps = false;

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function media()
    {
        return $this->belongsToMany(Media::class, 'MessageMedia', 'message_id', 'media_id');
    }
}
