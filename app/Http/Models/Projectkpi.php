<?php

namespace App\Http\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Projectkpi extends Model
{
  use SoftDeletes;

  protected $table = 'project_kpi';

    // public function projects()
    // {
    //     return $this->hasMany('App\Http\Models\Proejcts','id','project_name');
    // }

    public function projects() {
      return $this->hasManyThrough(
        '\App\Http\Models\MasProjects',
        '\App\Http\Models\TrnProjectSrruStrategies',
        'ref_srru_strategy_id',
        'id',
        'id',
        'mas_project_id'
      );
    }

}
