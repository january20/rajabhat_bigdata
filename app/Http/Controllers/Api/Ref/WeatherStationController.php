<?php

namespace App\Http\Controllers\Api\Ref;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\WeatherStations;
use App\Http\Models\Weathers;
use App\Http\Models\Ref\RefWeatherDuration;

class WeatherStationController extends Controller
{
    //WeatherStationController
    public function index(Request $request){

      $stations = WeatherStations::all();
      return response()->json( $stations );

    }
    public function show($station,$duration){

      switch ($duration) {
        case 1:
            return $this->aYear($station);
            break;
        default:
            return $this->years($station,$duration);
          break;
      }

    }

    private function years($station,$duration){

      $du = RefWeatherDuration::find($duration);
      $limit = $du->duration*365;
      $years = Weathers::select([
        \DB::raw('CONCAT(YEAR(created_at),"-w", WEEK(created_at)) AS name'),
        \DB::raw('ROUND(AVG(temp)) as avg_temp'),
        \DB::raw('ROUND(AVG(wind_speed)) as wind_speed'),
        \DB::raw('ROUND(AVG(humidity)) as humidity'),
        \DB::raw('ROUND(AVG(clouds)) as clouds')
      ])->limit($limit)->groupBy('name')->get();
       return response()->json( $years );
    }

    private function aYear($station){

      $previous = Weathers::where('weather_station_id','=',$station)
       ->selectRaw('
         date(created_at) as name,
         ROUND(AVG(temp)) as avg_temp,
         ROUND(AVG(wind_speed)) as wind_speed,
         ROUND(AVG(humidity)) as humidity,
         ROUND(AVG(clouds)) as clouds
       ')
       ->groupBy(\DB::raw('name'))
       ->orderBy('name')
       ->get(['name']);
       return response()->json( $previous );

    }



}
