<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class TrnFamilyEducation extends Model
{
  use SoftDeletes;
  protected $table = 'trn_family_education';
  protected $fillable = [
    'mas_family_id',
    'ref_education_id',
    'member_role'
  ];
}
