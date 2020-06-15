<?php

namespace App\Http\Controllers\Api\Cleaner;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TravelerController extends Controller
{
    //

    public function index(){
        return response()->json(['msg'=>'test']);

    }
}
