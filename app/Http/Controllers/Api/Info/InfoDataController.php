<?php

namespace App\Http\Controllers\Api\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefIotTypes;
use App\Http\Models\TrnIotData;
use App\Http\Models\TrnMqttIotName;
use Carbon\Carbon;


class InfoDataController extends Controller
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
        //translate time

        if($hr>0 && $hr<=24){
          $trn = TrnIotData::where('mas_iot_device_id','=',$mas_iot_device_id)
             ->selectRaw('DATE_FORMAT(created_at,"%H:%i")  as xField,
                         mas_iot_device_id,
                         '.$field.',
                         AVG('.$field.') as '.$field)
             ->whereBetween('created_at',[$now->copy()->subHours($hr),$now->copy()])
             //->groupBy('mas_iot_device_id')
             ->groupBy(\DB::raw('xField'))
             ->get(['mas_iot_device_id','xField',$field]);
         return response()->json( $trn );

       }else if($hr>24 && $hr<=168){

         $trn = TrnIotData::where('mas_iot_device_id','=',$mas_iot_device_id)
            ->selectRaw('DATE_FORMAT(created_at,  "%d, %H:%i")  as xField,
                        mas_iot_device_id,
                        '.$field.',
                        AVG('.$field.') as '.$field)
            ->whereBetween('created_at',[$now->copy()->subHours($hr),$now->copy()])
            //->groupBy('mas_iot_device_id')
            ->groupBy(\DB::raw('xField'))
            ->get(['mas_iot_device_id','xField',$field]);
        return response()->json( $trn );

      }else if($hr>168 && $hr<=720){
        $trn = TrnIotData::where('mas_iot_device_id','=',$mas_iot_device_id)
           ->selectRaw('DATE_FORMAT(created_at,  "%d-%m, %H:00")  as xField,
                       mas_iot_device_id,
                       '.$field.',
                       AVG('.$field.') as '.$field)
           ->whereBetween('created_at',[$now->copy()->subHours($hr),$now->copy()])
           //->groupBy('mas_iot_device_id')
           ->groupBy(\DB::raw('xField'))
           ->get(['mas_iot_device_id','xField',$field]);
        return response()->json( $trn );
      }else if($hr>760 && $hr<=8760){
        $trn = TrnIotData::where('mas_iot_device_id','=',$mas_iot_device_id)
           ->selectRaw('DATE_FORMAT(created_at,  "%d-%m-%y")  as xField,
                       mas_iot_device_id,
                       '.$field.',
                       AVG('.$field.') as '.$field)
           ->whereBetween('created_at',[$now->copy()->subDays( ($hr/24) ),$now->copy()])
           //->groupBy('mas_iot_device_id')
           ->groupBy(\DB::raw('xField'))
           ->get(['mas_iot_device_id','xField',$field]);
        return response()->json( $trn );
      }else{
        $trn = TrnIotData::where('mas_iot_device_id','=',$mas_iot_device_id)
           ->selectRaw('CONCAT(YEAR(created_at),"-w", WEEK(created_at)) AS xField,
                       mas_iot_device_id,
                       '.$field.',
                       AVG('.$field.') as '.$field)
           ->whereBetween('created_at',[$now->copy()->subWeeks( ($hr/168) ),$now->copy()])
           //->groupBy('mas_iot_device_id')
           ->groupBy(\DB::raw('xField'))
           ->get(['mas_iot_device_id','xField',$field]);
        return response()->json( $trn );

      }

        // }else if($hr > ){
        //
        // }
      //  $t2 = $now->copy();
        //$period = $request->get('period');

        //$previous = $request->get('field');
        ///$field = $request->get('field');




    }

    public function device(Request $request){
      $mas_iot_device_id = $request->get('mas_iot_device_id');
      $field = RefIotTypes::where('field',$request->get('field'))->first();
      return response()->json( compact("field") );

    }
}
