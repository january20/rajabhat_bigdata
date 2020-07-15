<?php

namespace App\Http\Controllers\Api\Ref;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefWeatherDuration;
use App\Http\Models\Weathers;
use App\Http\Models\WeatherStations;


class WeatherDurationController extends Controller
{
    //
    public function index(Request $request){
      $duration = RefWeatherDuration::all();
      return response()->json($duration);
    }

}
