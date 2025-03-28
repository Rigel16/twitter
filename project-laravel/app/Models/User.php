<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasProfilePhoto, TwoFactorAuthenticatable;

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    //protected $primaryKey = 'user_id';  // Définit 'user_id' comme clé primaire

    /**
     * The data type of the primary key.
     *
     * @var string
     */
    protected $keyType = 'string';  

    /**
     * Indicates if the primary key is auto-incrementing.
     *
     * @var bool
     */

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'display_name',
        'email',
        'password_hash',
        'bio',
        'date_of_birth',
        'theme_id',
        'profile_picture',
        'cover_photo',
        'user_id', 
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password_hash',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Attribute casting.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the theme associated with the user.
     */
    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id');
    }

    //Liste des abonnements (ceux que l'utilisateur suit)
    public function following()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id');
    }
}
