<?php

namespace App\Http\Controllers\Api\Villages;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\QueVillageDevPlans;
use App\Http\Models\QueTopics;
use Illuminate\Support\Facades\DB;
class VillagePlansController extends Controller
{
    //

    public function index(){
        $total = QueVillageDevPlans::select(['village_id'])->distinct()->count();
        $years = QueVillageDevPlans::select(['year'])->groupBy('year')->get();
        $topics = QueTopics::select(['id','que_id','topic_th','unit'])->get();//all();
        $cols = 'year';
        for($i = 1;$i<75;$i++){
            $name = str_pad($i,3,"0",STR_PAD_LEFT);
            $cols = $cols.', avg(que_'.$name.') as que_'.$name;
        }

        $que = QueVillageDevPlans::selectRaw($cols)->groupBy('year')->get();
        foreach ($years as $year){
            $year->name = 'y'.$year->year;
            $tmp = $que->where('year',$year->year)->values()->first();
            foreach ($topics as $topic){
                $name='y'.$year->year;
                $value = $topic->que_id;
                $topic->$name = $tmp->$value;
            }
        }
        return response()->json( compact('total','years','topics') );
    }
}
