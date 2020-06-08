<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefICDGroups extends Model
{
    use SoftDeletes;
    protected $table = 'ref_icd_groups';

  public function icd() {
    return $this->hasMany('App\Http\Models\Ref\RefICD', 'icd_group_id', 'id');
  }
}
