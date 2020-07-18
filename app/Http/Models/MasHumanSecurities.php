<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasHumanSecurities extends Model
{
    use SoftDeletes;
    protected $table = 'mas_human_securities';
  
}
