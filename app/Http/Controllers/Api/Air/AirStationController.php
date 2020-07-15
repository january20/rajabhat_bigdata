<?php

namespace App\Http\Controllers\Api\Air;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Env\EnvAirStations;
use App\Http\Models\MasIotDevices;
use App\Http\Models\TrnIotData;
use Carbon\Carbon;


class AirStationController extends Controller
{

    public function index(Request $request){

        $now = Carbon::now('+7:00');
        $stations = EnvAirStations::selectRaw('
          id,
          CONCAT("station_",id) as col_name,
          name, lat, lng, mas_iot_device_id
        ')
        ->get();

        foreach ($stations as $st) {
          $tmp = TrnIotData::where('mas_iot_device_id',$st->mas_iot_device_id)->orderBy('created_at','desc')->first();
          if($tmp){
            $st->aqi = $tmp->aqi;
          }else{
            $st->aqi = null;
          }
        }

        $envs = TrnIotData::selectRaw('mas_iot_device_id,
            CONCAT("station_",mas_iot_device_id) as col_name,
            DATE_FORMAT(created_at,"%y-%m-%d %H")  as xField,
            ROUND(AVG(aqi)) as aqi,
            ROUND(AVG(ugm3)) as ugm3
        ')
        ->whereBetween('created_at',[$now->copy()->subDays(1),$now->copy()])
        ->groupBy('mas_iot_device_id')
        ->groupBy(\DB::raw('xField'))
        ->get();

        $data = TrnIotData::selectRaw('DATE_FORMAT(created_at,"%y-%m-%d %H")  as xField')
        ->whereBetween('created_at',[$now->copy()->subDays(1),$now->copy()])
        ->groupBy(\DB::raw('xField'))
        //->limit(24)
        ->get();

        foreach($data as $xField){
          foreach ($envs as $env) {
            if($xField->xField == $env->xField){
              $col_name = $env->col_name;
              $xField->$col_name =  $env->aqi;
            }
          }
        }

      return response()->json( compact('stations','data') );

    }

  public function stations() {
    $stations = EnvAirStations::all();

    foreach($stations as $station) {
      $air = TrnIotData::where('mas_iot_device_id', $station->id)
        ->orderBy('id', 'desc')
        ->first();

      $station->air = $air;
    }

    return response()->json($stations);
  }

  public function period(Request $request,$period=0){

    if($period == 0){
      return $this->index($request);
    }
    if($period>10){
      $period = 100;
    }
    //
    $now = Carbon::now('+7:00');
    $stations = EnvAirStations::selectRaw('
      id,
      CONCAT("station_",id) as col_name,
      name, lat, lng, mas_iot_device_id
    ')
    ->get();
    foreach ($stations as $st) {
      $tmp = TrnIotData::where('mas_iot_device_id',$st->id)->orderBy('created_at','desc')->first();
      if($tmp){
        $st->aqi = $tmp->aqi;
      }else{
        $st->aqi = null;
      }
    }
    //
    //
    // //
    $data = TrnIotData::selectRaw(
      'CONCAT(YEAR(created_at),"-w", WEEK(created_at)) AS xField'
    )
    ->whereBetween('trn_iot_data.created_at',[$now->copy()->subWeeks(45*$period),$now->copy()])
    ->groupBy(\DB::raw('xField'))
    //->orderBy('created_at','desc')
    ->get();
    //
    $envs = TrnIotData::selectRaw('mas_iot_device_id,
        CONCAT("station_",mas_iot_device_id) as col_name,
        CONCAT(YEAR(created_at),"-w", WEEK(created_at)) AS xField,
        ROUND(AVG(aqi)) as aqi,
        ROUND(AVG(ugm3)) as ugm3
    ')
    ->whereBetween('created_at',[$now->copy()->subWeeks(45*$period),$now->copy()])
    ->groupBy('mas_iot_device_id')
    ->groupBy(\DB::raw('xField'))
    ->get();

    foreach($data as $xField){
      foreach ($envs as $env) {
        if($xField->xField == $env->xField){
          $col_name = $env->col_name;
          $xField->$col_name =  $env->aqi;
        }
      }
    }

    return response()->json( compact('stations', 'data') );

  }

}
