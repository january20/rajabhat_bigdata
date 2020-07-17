<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class MasWelfareCards extends Model
{
    use SoftDeletes;
  
    protected $table = 'mas_welfare_cards';


}
