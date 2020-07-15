<?php

namespace App\Http\Controllers\Api\IoT;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\Http\Models\Weathers;

class WeatherController extends Controller
{
  // public function index(Request $request) {
    
  //   switch($request->get('t')){
  //       case 'latest':
  //           return $this->latest();
  //           break;
  //       case 'plot24':
  //           return $this->plot();
  //           break;
  //       default:
  //         return $request->all();
  //         break;
  //   }  

  // }

  // private function latest(){
  //   $air_stations =EnvAirStations::get();
  //   foreach($air_stations as $station){
  //       $station->air = EnvAirQuality::where('env_air_station_id','=',$station->id)->latest()->first();
  //   }
  //   return response()->json($air_stations);
  // }
  
  public function store(Request $request){
    
      //{}
      
      
      Weathers::insert([
        'weather_station_id'=> $request->get('weather_station_id'),
        'weather'=>      $request->get('weather'),
        'description'=>  $request->get('description'),
        'temp'=>         $request->get('temp'),
        'temp_min'=>     $request->get('temp_min'),
        'temp_max'=>     $request->get('temp_max'),
        'pressure'=>     $request->get('pressure'),
        'humidity'=>    $request->get('humidity'),
        'sea_level'=>    $request->get('sea_level'),
        'grnd_level'=>   $request->get('grnd_level'),
        'wind_speed'=>   $request->get('wind_speed'),
        'wind_deg'=>     $request->get('wind_deg'),
        'clouds'=>       $request->get('clouds'),
        'sunrise'=>      $request->get('sunrise'),
        'sunset'=>       $request->get('sunset')
      ]);
      
      return response()->json( $request->all() );
  }
  
}