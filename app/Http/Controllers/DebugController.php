<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Models\MasVillages;
use App\Http\Models\MasProjects;
use App\Http\Models\Bio\BioMasPlants;
use App\Http\Models\Bio\BioMasAnimals;
use App\Http\Models\TrnFamilyIncomes;
use App\Http\Models\Ref\RefVillages;
use App\Http\Models\Ref\RefSubDistricts;
use App\Http\Models\Ref\RefDistricts;
use App\Http\Models\Ref\RefProvinces;
use App\Http\Models\Env\EnvAirQuality;
use App\Http\Models\Weathers;
use App\Http\Models\WeatherStations;
use App\Http\Models\TrnExperts;
use App\Http\Models\SysUsers;
use App\Http\Models\SysUserRoles;
use App\Http\Models\TrnProjectSchemes;
use App\Http\Models\TrashedTrnProjectActivityReports;
use App\Http\Models\TrnIotData;
use Auth;
use QRCode;
use Storage;

class DebugController extends BaseController
{

  public function indexxx(Request $request){
    $total = 0;
    $tables = \DB::select("show tables");

    // foreach ($tables as $table) {
    //   $count = \DB::select("select count(*) as cnt from ".$table->Tables_in_surin);
    //   $table->cnt = $count[0];
    //   $total += $count[0]->cnt;
    // }

    return response()->json( count($tables) );
  }

  public function debug(Request $request){


    $client = new \GuzzleHttp\Client(['verify' => false ]);
      try {
        $login = $client->request('POST', 'http://smart.srru.ac.th/api/login',
          [
            'headers' => [
              'Accept' => 'application/json'
            ],
            'form_params' => [
              'username' => "jarunya.c",
              'password' => "3300101596202"
            ],
          ]);

          if($login->getStatusCode() == 200) {
            $staff = json_decode($login->getBody());
            return response()->json($staff);
          }else{
            return response()->json("No user");
          }


        } catch(ClientException $e) {
          return response()->json(['error' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง']);
        }

    return response()->json( $request->all() );
  }

  public function delaqi(Request $request){
    //$data = TrnIotData::where('hcsr04_distance',0)->delete();
    //return response()->json( $data );
  }


  public function activity(Request $request){
    $r = TrashedTrnProjectActivityReports::create([
      'trn_project_activity_report_id'    => 1,
      'images_path'                       => 'images_fdfadsafd'
    ]);
    $s = TrashedTrnProjectActivityReports::create([
      'trn_project_activity_report_id'    => 2,
      'files_path'                        => 'files_dfdsfds'
    ]);
    return response()->json( compact('r','s')  );
  }
  public function projectscheme(Request $request){
    $schemes = TrnProjectSchemes::all();
    return response()->json( $schemes );
  }
  public function roles(Request $request){
    // $sys_users = SysUsers::get(['id','ref_sys_user_group_id']);
    // foreach ($sys_users as $u) {
    //   // code...
    //   if($u->ref_sys_user_group_id==7){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->general_personnel = true;
    //     $role->save();
    //   }else if($u->ref_sys_user_group_id==1){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->admin = true;
    //     $role->save();
    //   }else if($u->ref_sys_user_group_id==2){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->srru_personnel = true;
    //     $role->save();
    //   }else if($u->ref_sys_user_group_id==4){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->village_headman = true;
    //     $role->save();
    //   }else if($u->ref_sys_user_group_id==8){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->project_assessor = true;
    //     $role->save();
    //   }else if($u->ref_sys_user_group_id==6){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->village_headman = true;
    //     $role->save();
    //   }else if($u->ref_sys_user_group_id==3){
    //     $role = new SysUserRoles;
    //     $role->sys_user_id = $u->id;
    //     $role->community_expert = true;
    //     $role->save();
    //   }
    //
    // }

    $r = SysUserRoles::get();
    return response()->json( $r );
  }
  public function login(Request $request){

    $client = new \GuzzleHttp\Client(['verify' => false]);
    try {
      $login = $client->request('POST', 'http://smart.srru.ac.th/api/login', [ 'form_params' => ['username' => $request->get('username'), 'password' => $request->get('password')]]);

      if($login->getStatusCode() == 200) {
        $staff = json_decode($login->getBody());
        return response()->json( $staff );


      }
    }catch(ClientException $e) {
      return response()->json(['error' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง']);
    }


  }

  private function get_mis_staff($login){
    if($login->email == 'chanoknet.c@ms.srru.ac.th'){
        $d = (object)[];
        $d->id = 1853;
        return $d;
    }
    $client = new \GuzzleHttp\Client(['verify' => false ]);
    $res = $client->request('GET', 'http://ws.srru.ac.th/office?doc=staff_id&uuid='.$login->localId,
      [
        'headers' => [
        'Authentication' => env('SRRU_KEY'),
      ]]);
    if($res->getStatusCode() == 200){
      return  json_decode($res->getBody());
    }

  }

  public function index(Request $request){
    //
    // $now = Carbon::now();
    // $start = $now->copy()->startOfMonth();
    //
    // // $plants = BioMasAnimals::where('created_at','>',$start)->get();
    // // // $projects = MasProjects::where('id','>',130)->get();
    // // foreach($plants as $p){
    // //  // $p->delete();
    // // }
    // $expert = TrnExperts::where('id','>',2)->get();
    // foreach ($expert as $exp) {
    //   // code...
    //   $exp->delete();
    // }
    // return response()->json($expert);


    $client = new \GuzzleHttp\Client(['verify' => false ]);
      try {
        $login = $client->request('POST', 'http://smart.srru.ac.th/api/login',
          [
            'form_params' => [
              'username' => "jarunya.c",
              'password' => "3300101596202"
            ],
          ]);

          if($login->getStatusCode() == 200) {
            $staff = json_decode($login->getBody());
            return response()->json($staff);
          }else{
            return response()->json("No user");
          }


        } catch(ClientException $e) {
          return response()->json(['error' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง']);
        }

            //return response()->download( storage_path().'/images/RVbBE7MD8UDxVT6iTax9ue6P9XNTLH3MOVbJqugmAPxmz6J0zBkSmis912eip075499S4692ZjCuAXhiWHClUKeYOWCuW82fTPRytbf2vS44HNibKGITAHuTpjeCNl6l.jpg' );

  }

  public function weathers(Request $request){


    $stations = WeatherStations::get();
    $labels = collect([]);
    foreach($stations as $st){
       $previous = Weathers::where('weather_station_id','=',$st->id)
        ->selectRaw('
          date(created_at) as date,
          ROUND(AVG(temp)) as avg_temp,
          ROUND(AVG(wind_speed)) as wind_speed,
          ROUND(AVG(humidity)) as humidity,
          ROUND(AVG(clouds)) as clouds
        ')
        ->limit(365)
        ->groupBy(\DB::raw('date'))
        ->orderBy('date','desc')
        ->get(['date']);
      $st->previous = $previous;
    }


    return response()->json( $stations );

  }

    public function polygon_geojson(Request $request){

      $client = new \GuzzleHttp\Client(['verify' => false]);
      try {
        $res = $client->request('GET', 'https://nominatim.openstreetmap.org/search.php?q=Surin+Thailand&polygon_geojson=1&format=json',
              [
                // 'headers' => [
                //     'Authentication' => env('SRRU_KEY'),
                // ],
              ]);
        if($res->getStatusCode() == 200){
           return json_decode($res->getBody());
        }
      }catch (RequestException $e) {
          return response()->json("ERROR");
      }

    }

     public function text_processing_index(Request $request){
      $history = MasProjects::where('id', 76)->first();

      // $encoded = mb_convert_encoding($history->history, "UTF-8");
      $seed = collect(preg_split('//u', $history->history, -1, PREG_SPLIT_NO_EMPTY));
      $txt = "";
      $i = 0;

      foreach ($seed as $c) {



        // if($c != ' '){

        //   $txt = $txt.$c;
        // }

        // if($c == ')'){
        //   $txt = $txt." ";
        // }

        // if($c == 'ๆ'){
        //   $txt = $txt." ";
        // }

        $txt = $txt.$c;

        if(($i%97) == 0 && $i > 0){

          if($c != ' '){
            $txt= $txt." ";
          }


        }

        $i++;
      }

      $history->history_tmp = $txt;
      $history->save();
      // $chars = collect(str_split($history->history));
      // $long_txt = "";

      // for($i = 0 ; $i < strlen($history) ; $i++) {
      //   $wrap = 336;

      //   $history = wordwrap($history, $wrap, " ");

      //   $wrap += $wrap+1;
      // }

      // $convert = wordwrap($history, 2, ' ', true);
      // 336


      return response()->json( ['data'=>$history->history_tmp] );
     }

    //  $projects = MasProjects::get();
    //     foreach($projects as $pro){
    //         $pro->access_code = str_random(10);
    //       // $pro->save();
    //     }


     public function __construct(){
        // $this->middleware('auth:user')->except('logout');
        // $this->middleware('auth:admin')->except('logout');
     }
}

/*
       // $villages = MasVillages::with('polygon')
        //         ->with('village')->get();

        // foreach($villages as $village){
        //     $village->sub_district = RefSubDistricts::where('id','=',$village->village->sub_district_id)->first();
        //     $village->district = RefDistricts::where('id','=',$village->sub_district->district_id)->first();
        //     $village->province = RefProvinces::where('id','=',$village->district->province_id)->first();
        // }


*/
