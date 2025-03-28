<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        // Récupère tous les tests
        $tests = Test::all();
        
        // Retourne les données sous forme de JSON
        return response()->json($tests);
    }
}
