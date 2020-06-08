<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefProvinces extends Model {

    use SoftDeletes;
    protected $table = 'ref_provinces';


    public function districts(){
    	return $this->hasMany("\App\Http\Models\Ref\RefDistricts",'province_id','id')->orderBy('id');
    }
    // public function sub_districts(){
    // 	return $this->hasMany("\App\Http\Models\Ref\RefSubDistricts",'province_id','id')->orderBy('id');
    // }

}
