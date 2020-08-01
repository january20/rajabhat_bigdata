<?php

namespace App\Http\Controllers\Api\Religious;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReligousMastersController extends Controller
{
    public function index(Request $request, $route=null){
        switch($route){
            case null:
                return response()->json( ['x'=>'0', 'y'=>$route] );
            break;
            case 'types':
                return response()->json( ['x'=>'0', 'y'=>$route] );
            break;
            case 'area':
                return response()->json( ['x'=>'0', 'y'=>$route] );
            break;
            case 'districts':
                return response()->json( ['x'=>'0', 'y'=>$route] );
            break;
            case 'sub_districts':
                return response()->json( ['x'=>'0', 'y'=>$route] );
            break;
            default:
                return response()->json( ['code'=>-1, 'message'=>'route '.$route." not found" ]);
            break;
        }
    }

    
}
