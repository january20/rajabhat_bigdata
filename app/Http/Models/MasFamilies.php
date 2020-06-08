<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasFamilies extends Model
{
  use SoftDeletes;
  protected $table = 'mas_families';

  protected $fillable = [
    'sub_district_id',
    'mas_surin_village_id',
    'moo',
    'house_address',
    'prefix_id',
    'gender_id',
    'firstname',
    'lastname',
    'occupation_id',
    'education_id',
    'monthly_income',
    'born',
    'email',
    'tel'
  ];
  
  public function district() {
    return $this->hasOne('\App\Http\Models\Ref\RefDistricts', 'id', 'district_id');
  }
  public function sub_district() {
    return $this->hasOne('\App\Http\Models\Ref\RefSubDistricts', 'id', 'sub_district_id');
  }
  public function village() {
    return $this->hasOne('\App\Http\Models\Ref\RefVillages', 'id', 'mas_surin_village_id');
  }
  public function family_owner_prefix() {
      return $this->hasOne('\App\Http\Models\Ref\RefPrefix', 'id', 'prefix_id');
  }
  public function family_owner_occupation() {
      return $this->hasOne('\App\Http\Models\Ref\RefOccupations', 'id', 'occupation_id');
  }
  public function family_owner_education() {
      return $this->hasOne('\App\Http\Models\Ref\RefEducations', 'id', 'occupation_id');
  }
  public function family_income() {
      return $this->hasMany('\App\Http\Models\TrnFamilyIncomes', 'mas_family_id', 'id');
  }
  public function family_members() {
      return $this->hasMany('\App\Http\Models\MasFamilyMembers', 'mas_family_id', 'id');
  }
  public function members() {
      return $this->hasMany('\App\Http\Models\MasFamilyMembers', 'mas_family_id', 'id');
  }
  public function income() {
    return $this->hasOne('\App\Http\Models\TrnFamilyIncomes', 'mas_family_id', 'id')
    ->where('member_role', '=', 1)
    ->orderBy('created_at', 'desc');
  }
  public function education() {
    return $this->hasOne('\App\Http\Models\TrnFamilyEducation', 'mas_family_id', 'id')
    ->where('member_role', '=', 1)
    ->orderBy('created_at', 'desc');
  }
  public function occupation() {
    return $this->hasOne('\App\Http\Models\TrnFamilyOccupations', 'mas_family_id', 'id')
    ->where('member_role', '=', 1)
    ->orderBy('created_at', 'desc');
  }
  // public function sub_district() {
  
  //   return $this->hasOne('\App\Http\Models\TrnFamilyIncomes', 'mas_family_id', 'id');
  // }
  
  public function family_occupation(){
      return $this->hasOne(
          '\App\Http\Models\Ref\RefOccupations',
          'id', 
          'occupation_id');
  }
  public function family_education(){
    return $this->hasOne(
        '\App\Http\Models\Ref\RefEducations',
        'id', 
        'education_id');
  }

  public function health() {
    return $this->hasMany('\App\Http\Models\TrnFamilyHealth', 'member_id', 'id')->where('member_role', 1);
  }
  public function gender() {
    return $this->hasOne('\App\Http\Models\Ref\RefGenders', 'id', 'gender_id');
  }
}


