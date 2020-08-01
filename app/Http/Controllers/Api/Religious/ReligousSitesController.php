<?php

namespace App\Http\Controllers\Api\Religious;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\MasReligousSites;
use App\Http\Models\MasCeremonyMasters;

class ReligousSitesController extends Controller
{
    public function index(Request $request, $route=null){
        switch($route){
            case null:
                return $this->summary();
            break;
            case 'location':
                return $this->location();
            break;
            case 'area':
                return response()->json( ['x'=>'0', 'y'=>$route]);
            break;
            case 'districts':
                return response()->json( ['x'=>'0', 'y'=>$route]);
            break;
            case 'sub_districts':
                return response()->json( ['x'=>'0', 'y'=>$route]);
            break;
            default:
                return response()->json( ['code'=>-1, 'message'=>'route '.$route." not found" ]);
            break;
        }
    }
    private function summary(){

        $sections = MasReligousSites::selectRaw('sect as xField, count(sect) as yField')->groupBy('sect')->get();
        $site_count = MasReligousSites::select(['site_code'])->distinct()->count();

        
        $districts = MasReligousSites::join('ref_districts','mas_religous_sites.district_id','ref_districts.id')
            ->selectRaw('ref_districts.id as district_id, ref_districts.district_name_th as xField')
            ->groupBy('mas_religous_sites.district_id')
            ->distinct()
            ->get();//, count(mas_religous_sites.district_id) as yField

        foreach($districts as $district){
            $district->sect1 = MasReligousSites::where('district_id',$district->district_id)
                ->where("sect",'LIKE','มหานิกาย')
                ->count();
            $district->sect2 = MasReligousSites::where('district_id',$district->district_id)
                ->where("sect",'LIKE','ธรรมยุต')
                ->count();
        }
        
        $masters=MasCeremonyMasters::select(['position'])->distinct()->get();

        return response()->json( compact('site_count','sections','districts') );
    }
    private function location(){

        return response()->json( compact('site_count','sections') );
    }
}
