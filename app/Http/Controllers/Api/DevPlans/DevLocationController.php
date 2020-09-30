<?php

namespace App\Http\Controllers\Api\DevPlans;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\QueVillageDevPlans;
use App\Http\Models\QueTopics;
use App\Http\Models\Ref\RefDistricts;
use App\Http\Models\Ref\RefSubDistricts;
use App\Http\Models\Ref\RefVillages;

use Illuminate\Support\Facades\DB;

class DevLocationController extends Controller
{
    public function index(Request $request){
        $district_id = $request->district_id;
        $sub_district_id = $request->sub_district_id;
        $village_id = $request->village_id;

        $districts = null;
        $sub_districts = null;
        $villages = null;
        if(!$district_id && !$sub_district_id && !$village_id){
            $districts = QueVillageDevPlans::selectRaw("substring(village_id,1,4) as did")->distinct()->get();
            foreach ($districts as $district){
                $d = RefDistricts::where('id',$district->did)->first();
                $district->district_name_th = $d->district_name_th;
                $district->district_name_en = $d->district_name_en;
                $district->latitude = $d->latitude;
                $district->longitude = $d->longitude;
            }
        }

        if($district_id){
            $sids = QueVillageDevPlans::selectRaw("substring(village_id,1,6) as sid, substring(village_id,1,4) as did")
                            ->distinct()->get();
            $sub_districts = $sids->where('did',$district_id)->values();
            foreach ($sids as $sub_district){
                $s = RefSubDistricts::where('id',$sub_district->sid)->first();
                $sub_district->sub_district_name_th = $s->sub_district_name_th;
                $sub_district->sub_district_name_en = $s->sub_district_name_en;
                $sub_district->latitude = $s->lat;
                $sub_district->longitude = $s->lng;
            }
        }

        if($sub_district_id){
            $vills = QueVillageDevPlans::selectRaw("substring(village_id,1,4) as did, substring(village_id,1,6) as sid, village_id")->distinct()->get();
            $villages = $vills->where('sid',$sub_district_id)->values();
            foreach ($villages as $vill){
                $v = RefVillages::where('id',$vill->village_id)->first();
                $vill->village_name_th = $v->village_name_th;
                $vill->village_name_en = $v->village_name_en;
                $vill->latitude = $v->latitude;
                $vill->longitude = $v->longitude;
            }
        }

        return response()->json( compact('district_id','sub_district_id','village_id','districts','sub_districts','villages') );

    }
}
