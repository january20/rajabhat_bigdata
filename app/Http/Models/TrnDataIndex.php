<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrnDataIndex extends Model
{
    
    use SoftDeletes;
    protected $table = 'trn_data_index';


}
