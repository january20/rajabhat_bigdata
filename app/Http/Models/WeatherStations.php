<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class WeatherStations extends Model
{
  use SoftDeletes;
  protected $table = 'weather_stations';

  public function weather() {
    return $this->hasOne('\App\Http\Models\Weathers', 'weather_station_id', 'id');
  }
}
