<?php

namespace App\Http\Controllers\Api\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefGoverments;
use App\Http\Models\Ref\RefProvinces;


use Carbon\Carbon;
 
class HomesController extends Controller
{
    
    public function index(Request $request, $id=0){

      if($id>0){
        return response()->json( RefGoverments::where('id',$id)->first() );
      }
      return response()->json( RefGoverments::all() );
    }
}
