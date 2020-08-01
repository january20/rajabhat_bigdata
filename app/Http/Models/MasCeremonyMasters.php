<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasCeremonyMasters extends Model
{
    use SoftDeletes;
    protected $table = 'mas_ceremony_masters';

}
