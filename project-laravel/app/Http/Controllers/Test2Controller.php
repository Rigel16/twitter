<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test2;

class Test2Controller extends Controller
{
    public function getResult(){
        $result = Test2::paginate(3) ;
        return view('test',['results' => $result]);
    }
}
