<?php

namespace App\Http\Controllers\Api\Welfare;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\MasWelfareCards;

class WelfareControllers extends Controller
{
    //
    public function index(){
        $total = MasWelfareCards::whereNotNull('national_id')->count();
        $ability_groups = MasWelfareCards::selectRaw('ability_status, count(ability_status) as total')->groupBy('ability_status')->get(['ability_status']);

        return response()->json( compact('total', 'ability_groups') );
    
    }

}
