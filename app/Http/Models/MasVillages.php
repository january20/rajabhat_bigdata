<?php

namespace App\Http\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasVillages extends Model {

  use SoftDeletes;
  
  protected $table = 'mas_villages';
  protected $fillable = [
    'id',
    'name',
    'description',
    'lat',
    'lng'
  ];

  public function polygon(){
    	return $this->hasMany("\App\Http\Models\MasPolygon",'village_id','id');
  }
  public function village(){
    	return $this->hasOne("\App\Http\Models\Ref\RefVillages",'id','village_id');
  }
  public function projects() {
    return $this->hasMany('\App\Http\Models\Old\MasProjects', 'village_id', 'village_id')->where('approved', 1);
  }
  // public function count_projects() {
  //   return $this->hasMany('\App\Http\Models\MasProjects', 'village_id', 'village_id')->where('approved', 1);
  // }

}
