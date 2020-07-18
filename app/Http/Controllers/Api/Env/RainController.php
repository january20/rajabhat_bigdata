<?php

namespace App\Http\Controllers\Api\Env;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Weathers;
use App\Http\Models\WeatherStations;
use Carbon\Carbon;

class RainController extends Controller
{
    //
    public function index(Request $request){
        $now = Carbon::now()->year;
        $weeks = collect([]);//range(1,53);
        $series = collect([]);//range(2018,$now);//
        $year_data = collect([]);

        $station_id=1;
        if($request->has('station_id')){
            $station_id = $request->get('station_id');
        }
        $current = WeatherStations::where('id',$station_id)->first();
        $current->weather = Weathers::where('weather_station_id',$station_id)->orderBy('created_at','desc')->first();

        foreach(range(2018,$now) as $year){
            $series->push('y'.$year);
            $epoch = Carbon::parse($year.'-1-1');

            if($request->has('station_id')){

                $trn = Weathers::where('weather_station_id',$station_id)
                    ->where('weather','=','Rain')
                    ->selectRaw('WEEK(created_at) AS xField,
                    CONCAT("y",YEAR(created_at)) AS series,
                    count(weather) as yField')
                    ->whereBetween('created_at',[$epoch->copy()->startOfYear(),$epoch->copy()->endOfYear()])
                    ->groupBy(\DB::raw('xField'))
                    ->get(['xField','yField']);
                $year_data = $year_data->merge($trn);


            }else{
                $trn = Weathers::where('weather','=','Rain')
                    ->selectRaw('WEEK(created_at) AS xField,
                    CONCAT("y",YEAR(created_at)) AS series,
                    count(weather) as yField')
                    ->whereBetween('created_at',[$epoch->copy()->startOfYear(),$epoch->copy()->endOfYear()])
                    ->groupBy(\DB::raw('xField'))
                    ->get(['xField','yField']);
                $year_data = $year_data->merge($trn);
            }
               
        }
        foreach(range(1,53) as $week){
            $obj = (object)[];
            $obj->week = $week;
            $obj->xField = 'สัปดาห์ '.$week;
            foreach($series as $ser){
                $obj->$ser = 0;

                $tmp = $year_data->where('series',$ser)->where('xField',$week)->first();
                if( $tmp ){
                    $obj->$ser = $tmp->yField;//count($tmp);
                }
            }
           $weeks->push($obj);
        }
        return response()->json( compact('series', 'current', 'weeks') );
    }
   

}
