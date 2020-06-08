<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrnPopulationsAge extends Model
{
  use SoftDeletes;
  protected $table = 'trn_populations_age';
}
