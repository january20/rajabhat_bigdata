<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefSrruFaculty extends Model
{
    use SoftDeletes;
    protected $table = 'ref_srru_faculty';

    public function projects() {
      return $this->hasMany('\App\Http\Models\Projects\MasProjects', 'fac_id', 'global_fac_id');
    }
    public function old_projects() {
      return $this->hasMany('\App\Http\Models\Old\MasProjects', 'fac_id', 'global_fac_id');
    }
}
