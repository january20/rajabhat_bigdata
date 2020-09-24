<?php

namespace App\Http\Controllers\Api\Parking;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefIotTypes;
use App\Http\Models\TrnIotData;
use App\Http\Models\TrnMqttIotName;
use Carbon\Carbon;

class ParkingController extends Controller
{
    //
    public function index(Request $request){

      $mas_iot_device_id = $request->get('mas_iot_device_id');
      $field = $request->get('field');
      $hr = 1;

      if($request->has('hr')){
        $hr = $request->get('hr');
      }

      $now = Carbon::now('+7:00');

      $trn = TrnIotData::where('mas_iot_device_id','=',$mas_iot_device_id)
       ->selectRaw('DATE_FORMAT(created_at,"%H:00")  as label,
                   mas_iot_device_id,
                   '.$field.',
                   ROUND(AVG('.$field.')) as '.$field)
       ->whereBetween('created_at',[$now->copy()->subHours($hr),$now->copy()])
       //->groupBy('mas_iot_device_id')
       ->groupBy(\DB::raw('label'))
       ->get(['mas_iot_device_id','label',$field]);


       $label = $trn->pluck('label');
       $data = $trn->pluck($field);


      return response()->json( compact('label','data') );

    }
    public function available(){
      $r = rand(0,1);
      return response()->json($r);

    }
}
