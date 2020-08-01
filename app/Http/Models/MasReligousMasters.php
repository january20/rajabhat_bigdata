<?php

namespace App\Http\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Model;

class MasReligousMasters extends Model
{
    use SoftDeletes;
    protected $table = 'mas_ceremony_masters';

}
