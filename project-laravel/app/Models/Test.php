<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $table = 'users'; // Nom de la table dans la base de données
    protected $fillable = ['mama']; // Champs manipulables
}
