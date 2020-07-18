<?php

namespace App\Http\Controllers\Api\Bio;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Bio\BioMasPlants;
use App\Http\Models\Bio\BioTrnBioFiles;

class PlantController extends Controller
{
  public function show($id) {
    $plant = BioMasPlants::find($id);
    $plant->images = BioTrnBioFiles::where('file_group_id', $plant->bio_trn_bio_file_group_id)->get();

    return response()->json($plant);
  }
}
