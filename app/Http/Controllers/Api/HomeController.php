<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Old\MasProjects;
use App\Http\Models\Old\TrnProjectActivityReports;
use App\Http\Models\MasFamilies;
use App\Http\Models\MasFamilyMembers;
use App\Http\Models\TrnFamilyIncomes;
use App\Http\Models\MasOtopProducts;
use App\Http\Models\Bio\BioMasPlants;
use App\Http\Models\Bio\BioMasAnimals;
use App\Http\Models\WeatherStations;
use App\Http\Models\Weathers;
use App\Http\Models\Env\EnvAirStations;
use App\Http\Models\Env\EnvAirQuality;
use App\Http\Models\TrnIotData;
use App\Http\Models\TrnDataIndex;

class HomeController extends Controller
{
  public function index(){
    $data = TrnDataIndex::orderBy('prior')->get();
    return response()->json($data);
  }
  // public function index() {
  //   $count_projects = MasProjects::where('approved', 1)->count();
  //   $count_project_activities = TrnProjectActivityReports::count();
  //   $count_families = MasFamilies::count();
  //   $count_family_members = MasFamilyMembers::count();
  //   $avg_income_60 = TrnFamilyIncomes::where('year', '2560')->avg('monthly_income');
  //   $avg_income_61 = TrnFamilyIncomes::where('year', '2561')->avg('monthly_income');
  //   $count_otop = MasOtopProducts::count();
  //   $count_plants = BioMasPlants::count();
  //   $count_animals = BioMasAnimals::count();
  //   $count_weather_stations = WeatherStations::count();
  //   $count_air_stations = EnvAirStations::count();
  //   // $count_air = EnvAirQuality::count();
  //   $count_air = TrnIotData::whereNotNull('ugm3')->whereNotNull('aqi')->count();
  //   $count_weathers = Weathers::count();

  //   return response()->json(compact('count_projects', 'count_project_activities', 'count_families', 'count_family_members', 'avg_income_60', 'avg_income_61', 'count_otop', 'count_plants', 'count_animals', 'count_weather_stations', 'count_air_stations', 'count_air', 'count_weathers'));
  // }
}
