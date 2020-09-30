<?php

namespace App\Http\Controllers\Api\DevPlans;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\QueVillageDevPlans;
use App\Http\Models\QueTopics;
use Illuminate\Support\Facades\DB;
use App\Http\Models\Ref\RefDistricts;
use App\Http\Models\Ref\RefSubDistricts;
use App\Http\Models\Ref\RefVillages;


class DevPlansController extends Controller
{
    public function index(Request $request){

        
        $total = (object)[];

        $reqs = $request->all();
        $cols = QueVillageDevPlans::selectRaw("year, concat('y',year) as name")->groupBy('year')->get();
        $topic = QueTopics::select(['id','que_id','topic_th','unit'])
                  ->where('que_id',$request->topic_id)->first();//all();


        if($request->district_id){
            $total->villages = QueVillageDevPlans::selectRaw('substring(village_id,1,4) as did, substring(village_id,1,6) as sid')->distinct()->get()
                                ->where('did',$request->district_id)->values()->count();
            $total->data = $total->villages*74;

            $que = QueVillageDevPlans::selectRaw('year, substring(village_id,1,4) as did, substring(village_id,1,6) as name, round(avg('.$request->topic_id.')) as value')
                ->whereRaw('substring(village_id,1,4)='.$request->district_id)
                ->groupBy('name')
                ->groupBy('year')
                ->get();

            $data = QueVillageDevPlans::selectRaw('substring(village_id,1,6) as name')
                ->whereRaw('substring(village_id,1,4)='.$request->district_id)
                ->groupBy('name')->get();

            foreach($data as $dist){
                $subd = RefSubDistricts::where('id',$dist->name)->first();
                $dist->xField = 'ตำบล'.$subd->sub_district_name_th;
                $datum = $que->where('name',$dist->name)->values();
                foreach($cols as $year){
                    $col = $year->name;
                    $y = $datum->where('year',$year->year)->first();
                    $dist->$col = $y['value'] ? round($y['value']) : 0;
                }
            }

            return response()->json( compact('total','reqs','topic','cols','data') );

        }else if($request->sub_district_id){
            
            $total->villages = QueVillageDevPlans::selectRaw('substring(village_id,1,6) as sid')->distinct()->get()
                               ->where('sid',$request->sub_district_id)
                               ->values()
                               ->count();;
            $total->data = $total->villages*74;

            $que = QueVillageDevPlans::selectRaw('year, village_id as name, round(avg('.$request->topic_id.')) as value')
                ->whereRaw('substring(village_id,1,6)='.$request->sub_district_id)
                ->groupBy('name')
                ->groupBy('year')
                ->get();
            
            $data = QueVillageDevPlans::selectRaw('village_id as name')
                ->whereRaw('substring(village_id,1,6)='.$request->sub_district_id)
                ->groupBy('name')->get();
            
            foreach($data as $dist){
                $vill = RefVillages::where('id',$dist->name)->first();
                $dist->xField = 'บ้าน'.$vill->village_name_th;
                $datum = $que->where('name',$vill->id)->values();
                foreach($cols as $year){
                    $col = $year->name;
                    $y = $datum->where('year',$year->year)->first();
                    $dist->$col = $y['value'] ? round($y['value']) : 0;
                }
            }
            return response()->json( compact('total','reqs','topic','cols','data') );

        }else if($request->village_id){
            $total->villages = 1;
            $total->data = 74;

            $que = QueVillageDevPlans::selectRaw('year, village_id,  village_id as name, round(avg('.$request->topic_id.')) as value')
                ->where('village_id', $request->village_id)
                ->groupBy('name')
                ->groupBy('year')
                ->get();
            
            $data = QueVillageDevPlans::selectRaw('village_id, village_id as name')
                ->where('village_id',$request->village_id)
                ->groupBy('name')->get();

            return response()->json( compact('total','reqs','topic','cols','data','que') );

        }else{


            $total->villages = QueVillageDevPlans::select(['village_id'])->distinct()->count();
            $total->data = QueVillageDevPlans::count()*74;
            $que = QueVillageDevPlans::selectRaw('year, substring(village_id,1,4) as name, avg('.$request->topic_id.') as value')
                   ->groupBy('name')
                   ->groupBy('year')
                   ->get();

            $data = QueVillageDevPlans::selectRaw('substring(village_id,1,4) as name')
                    ->groupBy('name')->get();

            foreach($data as $dist){
                $district = RefDistricts::where('id',$dist->name)->first();
                $dist->xField = $district->district_name_th;
                $datum = $que->where('name',$dist->name)->values();
                foreach($cols as $year){
                    $col = $year->name;
                    $y = $datum->where('year',$year->year)->first();
                    $dist->$col = $y['value'] ? round($y['value']) : 0;
                }
            }
            return response()->json( compact('total','reqs','topic','cols','data') );

        }


        // for($i = 1;$i<75;$i++){
        //     $name = str_pad($i,3,"0",STR_PAD_LEFT);
        //     $cols = $cols.', round(avg(que_'.$name.')) as que_'.$name;
        // }

        // foreach ($topics as $topic){
        //     $data = collect([]);
        //     foreach ($years as $year){

        //         $tmp = $que->where('year',$year->year)->values()->first();

        //         $obj = (object)[];
        //         $obj->year = $year->year;
        //         $value = $topic->que_id;
        //         $obj->value =  $tmp->$value;
        //         $data->push($obj);
        //     }
        //     $topic->data = $data;
        // }


        return response()->json( compact('total','reqs','years','topic','que') );
    }

    private function districts($request){

      
    }
    public function topics(){
        $topics = QueTopics::select(['id','que_id','topic_th','unit'])->get();//all();

        return response()->json( $topics );

    }
    
}
