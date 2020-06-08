<?php

namespace App\Http\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;
class SysUsers extends Authenticatable implements JWTSubject
{
  use Notifiable;
  use SoftDeletes;
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $table = 'sys_users';
  protected $fillable = [
      'username', 'email', 'password',
      'mis_staff_id','uuid','ref_sys_user_group_id',
      'firstname', 'lastname', 'tel',
      'lat', 'lng', 'profile_image', 'mis_avatar', 'prefix_id', 'village_id', 'auth_key', 'display_name'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
      'password', 'remember_token',
  ];

  public function getJWTIdentifier() {
    return $this->getKey();
  }

  public function getJWTCustomClaims() {
    return [];
  }

  public function user_group() {
    return $this->belongsTo("\App\Http\Models\Ref\RefSysUserGroups", 'ref_sys_user_group_id');
  }

  public function village() {
    return $this->hasOne("\App\Http\Models\Ref\RefVillages", 'id', 'village_id');
  }
}
