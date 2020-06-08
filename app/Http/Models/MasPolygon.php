<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class MasPolygon extends Model {
    protected $table = 'mas_villages_polygon';
    protected $fillable = [
        'village_id',
        'lat',
        'lng'
    ];
}
