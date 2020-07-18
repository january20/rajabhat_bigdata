<?php

namespace App\Http\Controllers\Api\Bio;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Models\Bio\BioMasAnimals;
use App\Http\Models\Bio\BioMasPlants;
use App\Http\Models\Bio\BioTrnBioFiles;

class DiversityController extends Controller
{
  public function store(Request $request){
    // return response()->json($request->all());
    switch($request->get('method')) {
      case 'browser': {
        return $this->store_browser($request);
        break;
      }
      default: {
        if(!$request->file('image')) {
          return response()->json('error', 500);
        }
    
        if($request->get('diversity_group') == 1){
             
          BioMasPlants::insert([
            'name_th'=>$request->get('name'),
            'bio_ref_plant_structure_id'=>$request->get('organs'),
            'lat'=>$request->get('lat'),
            'lng'=>$request->get('lng'),
            'informant'=>$request->get('informant'),
            'user_agent'=>$request->headers->get('user-agent'),
            'req_ip'=>request()->ip(),
            'bio_trn_bio_file_group_id'=> $this->mobile_file($request->file('image'))
          ]);
              
        }else if($request->get('diversity_group') == 2){
             
          BioMasAnimals::insert([
            'name_th'=>$request->get('name'),
            'lat'=>$request->get('lat'),
            'lng'=>$request->get('lng'),
            'bio_ref_animal_structure_id'=>$request->get('organs'),
            'bio_trn_bio_file_group_id'=>$this->mobile_file($request->file('image'))
          ]);
             
        }
        
        return response()->json(['status' => 'success']);

        break;
      }
    }
    
  }

  public function store_browser(Request $request) {
    // return response()->json($request);
    if(count($request->get('images')) === 0) {
      return response()->json('error', 500);
    }

    if($request->get('diversity_group') == 1){
         
      BioMasPlants::insert([
        'name_th'=>$request->get('name'),
        'bio_ref_plant_structure_id'=>$request->get('organs'),
        'lat'=>$request->get('lat'),
        'lng'=>$request->get('lng'),
        'informant'=>$request->get('informant'),
        'user_agent'=>$request->headers->get('user-agent'),
        'req_ip'=>request()->ip(),
        'bio_trn_bio_file_group_id'=> $this->browser_file($request->get('images'))
      ]);
          
    }else if($request->get('diversity_group') == 2){
         
      BioMasAnimals::insert([
        'name_th'=>$request->get('name'),
        'lat'=>$request->get('lat'),
        'lng'=>$request->get('lng'),
        'bio_ref_animal_structure_id'=>$request->get('group'),
        'bio_trn_bio_file_group_id'=>$this->browser_file($request->get('images'))
      ]);
         
    }
    
    return response()->json(['status' => 'success']);
  }

  public function mobile_file($images){
    if(!$images) return null;

    $group_id = str_random(64);
      
    foreach($images as $image) {
      $extension = $image->getClientOriginalExtension();
      $save_name = str_random(128).'.'.$extension;
      $image->move(base_path('storage/app/images/bio'), $save_name);
      
      BioTrnBioFiles::insert([
        'file_name'=>$save_name,
        'file_group_id'=>$group_id
      ]);
    }

    
    return $group_id;
  }

  private function browser_file($images) {
    $group_id = str_random(64);

    foreach($images as $image) {
      $base64 = $image['base64'];
      $data = substr($base64, strpos($base64, ',') + 1);
      $data = base64_decode($data);
      $explode_filename = explode(".", $image['filename']);
      $ext = $explode_filename[count($explode_filename) - 1];
      $file_name = str_random(128).'.'.$ext;      
  
      Storage::disk('local')->put('images/bio/'.$file_name, $data);

      BioTrnBioFiles::insert([
        'file_name'=>$file_name,
        'file_group_id'=>$group_id
      ]);
    }

    return $group_id;
  }
}
