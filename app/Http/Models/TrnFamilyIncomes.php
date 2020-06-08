<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrnFamilyIncomes extends Model
{
    use SoftDeletes;
    protected $table = 'trn_family_incomes';
    protected $fillable = [
      'mas_family_id',
      'monthly_income',
      'member_role'
    ];
}
