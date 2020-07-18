<?php

namespace App\Http\Controllers\Api\Welfare;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\MasWelfareCards;
use App\Http\Models\MasHumanSecurities;
use App\Http\Models\MasTacnapFamilies;
use App\Http\Models\Ref\RefSubDistricts;


class WelfareControllers extends Controller
{
    public function index(Request $request){


        if($request->has('district_id')){
            return $this->filterDistrict($request->get('district_id'));
        }

        $total = MasWelfareCards::whereNotNull('national_id')->count();
        $ability_groups = MasWelfareCards::selectRaw('ability_status, count(ability_status) as total')->groupBy('ability_status')->get(['ability_status']);
        $avg_age = round(MasWelfareCards::avg('age'));
        //$total_disability_person = MasHumanSecurities::count();

        $total_familty = MasTacnapFamilies::selectRaw('explanation_year, count(explanation_year) as total')->groupBy('explanation_year')->get();
        $total_familty = $total_familty->where('total', $total_familty->max('total'))->first(); // ['name' => 'test', 'price' => 600]
        $districts = MasWelfareCards::selectRaw('district_id, district as xField, count(district) as yField')->groupBy('district')->get();

        
        
        return response()->json( compact('total', 'ability_groups','avg_age', 'total_familty','districts') );

    }

    private function filterDistrict($district_id){
        $sub_districts = MasWelfareCards::selectRaw('sub_district_id, count(*) as yField')
            ->where('district_id',$district_id)
            ->groupBy('sub_district_id')
            ->get();
        foreach($sub_districts as $sub){
            $tmp = RefSubDistricts::where('id',$sub->sub_district_id)->first();
            $sub->xField = $tmp->sub_district_name_th;
        }
        
        return response()->json( $sub_districts );

    }
}
