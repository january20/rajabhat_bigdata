<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class MasOtopProducts extends Model
{
  use SoftDeletes;
  
  protected $table = 'mas_otop_products';
  protected $fillable = [
    'code_name',
    'name',
    'description',
    'price',
    'category_id',
    'sub_district_id',
    'images',
    'tags',
    'note'
  ];

  public function category() {
    return $this->hasOne('\App\Http\Models\Ref\RefOtopCategories', 'id', 'category_id');
  }

  public function sub_district() {
    return $this->hasOne('\App\Http\Models\Ref\RefSubDistricts', 'id', 'sub_district_id');
  }

  public function district() {
    return $this->hasOne('\App\Http\Models\Ref\RefDistricts', 'id', 'district_id');
  }

  public function province() {
    return $this->hasOne('\App\Http\Models\Ref\RefProvinces', 'id', 'province_id');
  }
}
