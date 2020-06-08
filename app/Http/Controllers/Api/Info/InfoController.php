<?php

namespace App\Http\Controllers\Api\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefIotTypes;
use App\Http\Models\TrnIotData;
use App\Http\Models\TrnMqttIotName;
use Carbon\Carbon;

class InfoController extends Controller
{

  public function index() {



    $info = RefIotTypes::with(['mqtt_name'=>function($query){
      return $query->with('device');
    }])->get();

    // $info = RefIotTypes::with(['mqtt_name' => function($query) {
    //     return $query->with('device')->with(['data' => function($query) {
    //       return $query->whereBetween('created_at', [Carbon::now('+7:00')->subHour(3), Carbon::now('+7:00')])->get();
    //     }]);
    //   }])
    //   ->get();
    // $data = collect();
    // $now = Carbon::now('+7:00');

    // foreach($info as $if) {
    //   foreach($if->mqtt_name as $name) {
    //     $data[$name->field] = TrnIotData::where('mas_iot_device_id', $name->mas_iot_device_id)
    //       ->selectRaw($if->field.' as val, created_at')
    //       ->whereBetween('created_at', [Carbon::now('+7:00')->subHour(8), Carbon::now('+7:00')])
    //       ->get();
    //   }
    // }

    return response()->json($info);
  }

  public function show(Request $request, $id) {

    if($request->get('previous') === 'w') {
      $info = TrnMqttIotName::where('id', $id)
        ->with('iot_type')
        ->with('device')
        ->with(['data' => function($query) use($request) {
          return $query->select(\DB::raw('mas_iot_device_id, AVG(dht_humidity) as sum_dht_humidity, AVG(dht_temperature) as sum_dht_temperature, AVG(hcsr04_distance) as sum_hcsr04_distance, AVG(pm25) as sum_pm25, AVG(pm10) as sum_pm10, AVG(ratio) as sum_ratio, AVG(particles) as sum_particles, AVG(ugm3) as sum_ugm3, AVG(aqi) as sum_aqi, AVG(pressure) as sum_pressure, AVG(smoke) as sum_smoke, AVG(lpg) as sum_lpg, AVG(methane) as sum_methane, AVG(hydrogen) as sum_hydrogen, AVG(ldr) as sum_ldr, AVG(carbon_monoxide) as sum_carbon_monoxide, DATE(created_at) as date'))
            ->whereBetween('created_at', [Carbon::now('+7:00')->subWeek(), Carbon::now('+7:00')])
            // ->groupBy('mas_iot_device_id')
            ->groupBy('mas_iot_device_id', 'date')

            ->get();
        }])
        ->first();
        return response()->json($info);
    }

    if($request->get('previous') === 'm') {
      $info = TrnMqttIotName::where('id', $id)
        ->with('iot_type')
        ->with('device')
        ->with(['data' => function($query) use($request) {
          return $query->select(\DB::raw('mas_iot_device_id, AVG(dht_humidity) as sum_dht_humidity, AVG(dht_temperature) as sum_dht_temperature, AVG(hcsr04_distance) as sum_hcsr04_distance, AVG(pm25) as sum_pm25, AVG(pm10) as sum_pm10, AVG(ratio) as sum_ratio, AVG(particles) as sum_particles, AVG(ugm3) as sum_ugm3, AVG(aqi) as sum_aqi, AVG(pressure) as sum_pressure, AVG(smoke) as sum_smoke, AVG(lpg) as sum_lpg, AVG(methane) as sum_methane, AVG(hydrogen) as sum_hydrogen, AVG(ldr) as sum_ldr, AVG(carbon_monoxide) as sum_carbon_monoxide, DATE(created_at) as date'))
            ->whereBetween('created_at', [Carbon::now('+7:00')->subMonth(), Carbon::now('+7:00')])
            // ->groupBy('mas_iot_device_id')
            ->groupBy('mas_iot_device_id', 'date')

            ->get();
        }])
        ->first();
        return response()->json($info);
    }

    if($request->get('previous') === 'y') {
      $info = TrnMqttIotName::where('id', $id)
        ->with('iot_type')
        ->with('device')
        ->with(['data' => function($query) use($request) {
          return $query->select(\DB::raw('mas_iot_device_id, AVG(dht_humidity) as sum_dht_humidity, AVG(dht_temperature) as sum_dht_temperature, AVG(hcsr04_distance) as sum_hcsr04_distance, AVG(pm25) as sum_pm25, AVG(pm10) as sum_pm10, AVG(ratio) as sum_ratio, AVG(particles) as sum_particles, AVG(ugm3) as sum_ugm3, AVG(aqi) as sum_aqi, AVG(pressure) as sum_pressure, AVG(smoke) as sum_smoke, AVG(lpg) as sum_lpg, AVG(methane) as sum_methane, AVG(hydrogen) as sum_hydrogen, AVG(ldr) as sum_ldr, AVG(carbon_monoxide) as sum_carbon_monoxide, MONTH(created_at) as month'))
            ->whereBetween('created_at', [Carbon::now('+7:00')->subYear(), Carbon::now('+7:00')])
            // ->groupBy('mas_iot_device_id')
            ->groupBy('mas_iot_device_id', 'month')
            ->get();
        }])
        ->first();
        return response()->json($info);
    }

    $info = TrnMqttIotName::where('id', $id)
      ->with('iot_type')
      ->with('device')
      ->with(['data' => function($query) use($request) {
        return $query->whereBetween('created_at', [Carbon::now('+7:00')->subHour($request->get('previous')), Carbon::now('+7:00')])->get();
      }])
      ->first();
    return response()->json($info);
  }
}
