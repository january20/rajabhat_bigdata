<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrnIotData extends Model
{
    //dfd
    use SoftDeletes;
    protected $table = 'trn_iot_data';

}
