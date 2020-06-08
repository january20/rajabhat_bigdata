<?php

namespace App\Http\Controllers\Api\Data;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\TrnExperts;
use App\Http\Models\Ref\RefExperts;
use App\Http\Models\Ref\RefExpertises;

class ExpertsController extends Controller
{
    public function index(Request $request) {

      $params_expert_type = !$request->has('expert_type') || $request->get('expert_type') == 0 ? 'TRUE' : 'expert_type = '.$request->get('expert_type');
      $params_expertise_id = !$request->has('expertise_id') || $request->get('expertise_id') == 0 ? 'TRUE' : 'expertise_id = '.$request->get('expertise_id');

      $experts = TrnExperts::select('id', 'title', 'description', 'img_path', 'sys_user_id', 'expert_type', 'expertise_id')
        ->whereRaw($params_expert_type)
        ->whereRaw($params_expertise_id)
        ->with('sys_user')
        ->with('expertType')
        ->with('expertise')
        ->get();
      
      return response()->json(
        compact('experts')
      );
    }
}
