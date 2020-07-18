<?php

namespace App\Http\Controllers\Api\Bio;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Bio\BioMasAnimals;
use App\Http\Models\Bio\BioTrnBioFiles;

class AnimalController extends Controller
{
  public function show($id) {
    $animal = BioMasAnimals::find($id);
    $animal->images = BioTrnBioFiles::where('file_group_id', $animal->bio_trn_bio_file_group_id)->get();

    return response()->json($animal);
  }
}
