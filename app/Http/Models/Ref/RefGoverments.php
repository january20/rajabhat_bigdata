<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefGoverments extends Model {

    use SoftDeletes;
    protected $table = 'ref_goverments';


    public function province(){
    	return $this->hasOne("\App\Http\Models\Ref\RefProvinces",'id','province_id');
    }

}
