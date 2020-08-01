<?php

namespace App\Http\Controllers\Api\Human;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\MasHumanSecurities;
use App\Http\Models\Ref\RefHumanSecurityTypes;

class HumanSecurityController extends Controller
{
    public function index(Request $request,$route){

        switch($route){
            case 'total':
                return response()->json( $this->total() );
            break;
            case 'types':
                return response()->json( $this->types() );
            break;
            case 'area':
                return response()->json( $this->area() );
            break;
            case 'districts':
                return response()->json( $this->districts( $request->get('id') ) );
            break;
            case 'sub_districts':
                return response()->json( $this->sub_districts( $request->get('id') ) );
            break;
            default:
                return response()->json( $this->all() );

        }
    }
    private function all(){

        $total = $this->total();
        $area = $this->area();
        $types = $this->types();

        return compact('total','area','types');

        
    }
    private function sub_districts($id=0){

        $sub_districts = MasHumanSecurities::selectRaw("house_moo, house_moo as xField, count(house_moo) AS yField")
        ->where('house_sub_district_id',$id)
        ->where('house_moo','LIKE','%ห%')
        ->groupBy('house_moo')
        ->get();

        foreach($sub_districts as $moo){

            $types = MasHumanSecurities::join('ref_human_security_types','mas_human_securities.ref_human_security_type_id','ref_human_security_types.id')
            ->selectRaw("ref_human_security_types.id,ref_human_security_types.security_th as security_th, count(mas_human_securities.ref_human_security_type_id) AS total")
            ->where('mas_human_securities.house_moo',$moo->xField)
            ->where('house_sub_district_id',$id)
            ->orderBy('ref_human_security_type_id')
            ->groupBy('ref_human_security_type_id')
            ->get();
            
            $moo->types=$types;
        }

        return $sub_districts;
    }
    private function districts($id=0){
        
        $districts = MasHumanSecurities::join('ref_sub_districts','mas_human_securities.house_sub_district_id','ref_sub_districts.id')
        ->selectRaw("mas_human_securities.house_sub_district_id,ref_sub_districts.sub_district_name_th as xField, count(mas_human_securities.house_sub_district_id) AS yField")
        ->where('mas_human_securities.house_district_id',$id)
        ->groupBy('mas_human_securities.house_sub_district_id')
        ->get();

        foreach($districts as $sub_district){
            $types = MasHumanSecurities::join('ref_human_security_types','mas_human_securities.ref_human_security_type_id','ref_human_security_types.id')
            ->selectRaw("ref_human_security_types.id,ref_human_security_types.security_th as security_th, count(mas_human_securities.ref_human_security_type_id) AS total")
            ->where('mas_human_securities.house_sub_district_id',$sub_district->house_sub_district_id)
            ->orderBy('ref_human_security_type_id')
            ->groupBy('ref_human_security_type_id')
            ->get();
            
            $sub_district->types=$types;
        }


        return $districts;



    }
    private function area(){

        $area = MasHumanSecurities::join('ref_districts','mas_human_securities.house_district_id','ref_districts.id')
        ->selectRaw("ref_districts.id,ref_districts.district_name_th as xField, count(mas_human_securities.house_district_id) AS yField")
        ->groupBy('mas_human_securities.house_district_id')
        ->get();
        foreach($area as $district){
            $types = MasHumanSecurities::join('ref_human_security_types','mas_human_securities.ref_human_security_type_id','ref_human_security_types.id')
            ->selectRaw("ref_human_security_types.id,ref_human_security_types.security_th as security_th, count(mas_human_securities.ref_human_security_type_id) AS total")
            ->where('mas_human_securities.house_district_id',$district->id)
            ->orderBy('ref_human_security_type_id')
            ->groupBy('ref_human_security_type_id')
            ->get();
            
            $district->types=$types;
        }
        return $area;

    }
    private function types(){
        $securities = MasHumanSecurities::join('ref_human_security_types','mas_human_securities.ref_human_security_type_id','ref_human_security_types.id')
        ->selectRaw("ref_human_security_types.id,ref_human_security_types.security_th as xField,count(mas_human_securities.ref_human_security_type_id) AS yField")
        ->groupBy('ref_human_security_type_id')
        ->orderBy('id')
        ->get();
        return $securities;

    }
    private function total(){
        $total = MasHumanSecurities::select('national_id')->distinct()->count();
        return $total;

    }
}
