<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrnFamilyHealth extends Model
{
    use SoftDeletes;
    protected $table = 'trn_family_health';
    protected $fillable = [
      'ref_icd_code',
      'member_id',
      'description',
      'member_role',
      'height',
      'weight',
      'symptom',
      'blood_pressure',
      'body_temp',
      'blood_sugar',
      'check_date'
    ];

    public function icd() {
      return $this->hasOne('\App\Http\Models\Ref\RefICD', 'icd_code', 'ref_icd_code');
    }

    public function family_member() {
      return $this->hasOne('\App\Http\Models\MasFamilies', 'id', 'family_id');
    }

    public function sub_district() {
      return $this->hasOne('\App\Http\Models\Ref\RefSubDistricts', 'id', 'sub_district_id');
    }

    public function village() {
      return $this->hasOne('\App\Http\Models\Ref\RefVillages', 'id', 'mas_surin_village_id');
    }
}
