<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;

class RefThaiQmEffects extends Model
{
    protected $table = 'ref_thaiqm_effects';

    public function effect(){
        return $this->hasMany("\App\Http\Models\MasTacnapThaiQM", 'effect', 'id')->count();
    }

    //
}
