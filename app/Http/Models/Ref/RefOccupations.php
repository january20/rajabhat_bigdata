<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefOccupations extends Model
{
    use SoftDeletes;
    protected $table = 'ref_occupations';

    public function families() {
      return $this->hasMany('\App\Http\Models\MasFamilies', 'occupation_id', 'id');
    }

    public function family_members() {
      return $this->hasMany('\App\Http\Models\MasFamilyMembers', 'occupation_id', 'id');
    }
    // public function iso() {
    //   return $this->hasMant('\App\Http\Models\MasFamilies');
    // }
}
