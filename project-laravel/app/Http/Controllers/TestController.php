<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test; // Import du modèle Test

class TestController extends Controller
{
    public function getEmails()
    {
        $emails = Test::pluck('firstname'); // Récupère tous les emails de la table
        return view('/emails', ['emails' => $emails]);
    }
} 
