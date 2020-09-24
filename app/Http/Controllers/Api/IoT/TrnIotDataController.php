<?php

namespace App\Http\Controllers\Api\IoT;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Models\TrnIotData;
use App\Http\Models\TrnMqttIotName;
use App\Http\Models\MasIotDevices;
use App\Http\Models\Ref\RefIotTypes;
use Auth;
use Mqtt;
use Carbon\Carbon;

class TrnIotDataController extends Controller
{
    //fdsf
    public function index(Request $request){

      if(!$request->has('device_id')){
        return response()->json( ['code'=>-1, 'message'=>'Device not found!'], 401 );
      }
      return $this->store_data($request);

    }


  public function store(Request $request){

    if(!$request->has('device_id')){
      return response()->json( ['code'=>-1, 'message'=>'Device not found!'], 401 );
    }
    return $this->store_data($request);

  }

  private function store_data(Request $request){

    $data_id = TrnIotData::insertGetId([
      'mas_iot_device_id'=>$request->get('device_id'),
      'dht_humidity'=>$request->get('dht_humidity'),
      'dht_temperature'=>$request->get('dht_temperature'),
      'hcsr04_distance'=>$request->get('hcsr04_distance'),
      'smoke'=>$request->get('smoke'),
      'lpg'=>$request->get('lpg'),
      'methane'=>$request->get('methane'),
      'hydrogen'=>$request->get('hydrogen'),
      'ldr'=>$request->get('ldr'),
      'carbon_monoxide'=>$request->get('carbon_monoxide'),
      'pm25'=>$request->get('pm25'),
      'pm10'=>$request->get('pm10')

    ]);

    // $device = MasIotDevices::where('id',  $request->get('device_id') )
    //   ->with(['mqtt_names' => function($query) {
    //     return $query->with('iot_types');
    // }])->first();


    $device = MasIotDevices::where('id',  $request->get('device_id') )
      ->with('mqtt_names')->first();
    $device->ip = $request->ip();
    $device->save();

     $now = Carbon::now('+7:00');

     foreach ($device->mqtt_names as $name) {
       $iot_type = RefIotTypes::where('id','=',$name->ref_iot_type_id)->first();
       //$name->field = $iot_type->field;
       if(empty($request->get($iot_type->field))){
           continue;
       }
       Mqtt::ConnectAndPublish($name->mqtt_name,  $request->get($iot_type->field) );
     }

    // foreach($device->mqtt_names as $name) {
    //   if(!$request->has($name->iot_types->field)){
    //     continue;
    //   }
    //   if(empty($request->get($name->iot_types->field))){
    //     continue;
    //   }
    //
    //   Mqtt::ConnectAndPublish($name->mqtt_name,  $request->get($name->iot_types->field) );
    // }

    return response()->json(['code'=>1,'data'=>$data_id, 'message'=>'Ok!'], 200);

  }

}
