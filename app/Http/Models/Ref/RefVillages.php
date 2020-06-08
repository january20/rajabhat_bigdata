<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefVillages extends Model {

    use SoftDeletes;
    protected $table = 'ref_villages';
    public function province(){
    	return $this->hasOne("\App\Http\Models\Ref\RefProvinces",'id','province_id');
    }
    public function district(){
    	return $this->hasOne("\App\Http\Models\Ref\RefDistricts",'id','district_id');
    }
    public function sub_district(){
    	return $this->hasOne("\App\Http\Models\Ref\RefSubDistricts",'id','sub_district_id');
    }
    public function families() {
        return $this->hasMany("\App\Http\Models\MasFamilies", 'mas_surin_village_id', 'id');
    }
}
