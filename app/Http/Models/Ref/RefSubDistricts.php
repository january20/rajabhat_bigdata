<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefSubDistricts extends Model {
    // protected $table = 'ref_sub_districts';
    use SoftDeletes;
    protected $table = 'ref_sub_districts_coordinates';

    public function province(){
    	return $this->hasOne("\App\Http\Models\Ref\RefProvinces",'id','province_id');
    }
    public function district(){
    	return $this->hasOne("\App\Http\Models\Ref\RefDistricts",'id','district_id');
    }
}
