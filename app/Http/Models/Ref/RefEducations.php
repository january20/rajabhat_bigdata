<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefEducations extends Model
{
    use SoftDeletes;
    protected $table = 'ref_educations';

    public function families() {
      return $this->hasMany('\App\Http\Models\MasFamilies', 'education_id', 'id');
    }
}
