<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Weathers extends Model
{
    use SoftDeletes;
    protected $table = 'weathers';
}
