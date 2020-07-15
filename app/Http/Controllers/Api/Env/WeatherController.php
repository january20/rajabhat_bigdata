<?php

namespace App\Http\Controllers\Api\Env;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Weathers;
use App\Http\Models\WeatherStations;

class WeatherController extends Controller
{
  public function index() {

  }

  public function stations() {
    $stations = WeatherStations::all();

    foreach($stations as $station) {
      $weather = Weathers::where('weather_station_id', $station->id)
        ->orderBy('id', 'desc')
        ->first();
      
      $station->weather = $weather;
    }

    return response()->json($stations);
  }
}
