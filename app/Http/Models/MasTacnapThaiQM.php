<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class MasTacnapThaiQM extends Model
{
    protected $table = 'mas_tcnap_thaiqm';

    public function village(){
        return $this->hasOne('\App\Http\Models\Ref\RefVillages', 'id', 'mcode')->select(['id','village_name_th','latitude','longitude']);
    }
    public function sub_district(){
        return $this->hasOne('\App\Http\Models\Ref\RefSubDistricts', 'id', 'tcode')->select(['id','sub_district_name_th']);
    }
    public function district(){
        return $this->hasOne('\App\Http\Models\Ref\RefDistricts', 'id', 'acode')->select(['id','district_name_th']);
    }
    // public function daily_income(){
    //     return $this->hasOne('\App\Http\Models\MasTacnapThaiQM', 'mcode', 'mcode')->whereNotNull('income_day')->avg();
    // }
}
