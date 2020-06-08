<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrnFamilyOccupations extends Model
{
    use SoftDeletes;
    protected $table = 'trn_family_occupations';
    protected $fillable = [
      'mas_family_id',
      'ref_occupation_id',
      'member_role'
    ];
}
