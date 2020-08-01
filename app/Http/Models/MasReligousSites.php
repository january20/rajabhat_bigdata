<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasReligousSites extends Model
{
    use SoftDeletes;
    protected $table = 'mas_religous_sites';

}
