<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefHumanSecurityTypes extends Model
{
    use SoftDeletes;
    protected $table = 'ref_human_security_types';

}
