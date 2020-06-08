<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrnExperts extends Model
{

    use SoftDeletes;

    
    protected $table = 'trn_experts';
    protected $fillable = [
      'sys_user_id',
      'expert_type',
      'expertise_id',
      'title',
      'description',
      'img_path',
      'file_path',
      'informant_id'
    ];

    public function sys_user() {
      return $this->hasOne('App\Http\Models\SysUsers', 'id', 'sys_user_id');
    }

    public function expertType() {
      return $this->hasOne('App\Http\Models\Ref\RefExperts', 'id', 'expert_type');
    }

    public function expertise() {
      return $this->hasOne('App\Http\Models\Ref\RefExpertises', 'id', 'expertise_id');
    }
}
