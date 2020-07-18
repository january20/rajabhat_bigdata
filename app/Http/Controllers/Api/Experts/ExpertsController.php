<?php

namespace App\Http\Controllers\Api\Experts;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\TrnExperts;
use App\Http\Models\Ref\RefExpertises;
use App\Http\Models\Ref\RefExperts;
use App\Http\Models\Ref\RefPrefix;
use App\Http\Models\SysUsers;

class ExpertsController extends Controller
{
  public function index(Request $request) {

    $params_expert_type = !$request->has('expert_type') || $request->get('expert_type') == 0 ? 'TRUE' : 'expert_type = '.$request->get('expert_type');
    $params_expertise_id = !$request->has('expertise_id') || $request->get('expertise_id') == 0 ? 'TRUE' : 'expertise_id = '.$request->get('expertise_id');

    $experts = TrnExperts::select('id', 'title', 'description', 'img_path', 'sys_user_id', 'expert_type', 'expertise_id')
      ->whereRaw($params_expert_type)
      ->whereRaw($params_expertise_id)
      ->with('sys_user')
      ->with('expertType')
      ->with('expertise')
      ->get();
    
    return response()->json($experts);
  }

  public function show($id) {
    $expert = TrnExperts::where('id', $id)
      ->with('sys_user')
      ->with('expertType')
      ->with('expertise')
      ->first();

    if($expert->img_path) {

      $images_folder = Storage::allFiles('images/experts/'.$expert->img_path);
      $images = collect();
      foreach($images_folder as $path) {
        // $url = Storage::url($path);
        // // $img = file_get_contents(storage_path());
        // $img = file_get_contents(storage_path().'/app/'.$path);
        // $base64img = 'data:image/png;base64,'.base64_encode($img);
        $images->push(basename($path));
      }

      $expert->pictures = $images;

    }

    if($expert->file_path != null) {
      $files = Storage::allFiles('files/experts/'.$expert->file_path);
      $file_array = collect();

      foreach($files as $file) {
        $encrypt_string = explode('.', pathinfo($file)['basename']);
        $file_name = Crypt::decryptString($encrypt_string[0]);
        $file_array->push([
          'file_name' => $file_name,
          'path' => $expert->file_path.'/'.pathinfo($file)['basename']
          ]);
      }

      $expert->files = $file_array;
    }   

    return response()->json($expert);
  }

  public function create() {
    $expert_types = RefExperts::all();
    $expertises = RefExpertises::all();
    $prefixes = RefPrefix::limit(3)->get();

    return response()->json(compact('expert_types', 'expertises', 'prefixes'));
  }

  public function edit($id) {
    $expert = TrnExperts::where('id', $id)
      ->with('sys_user')
      ->first();

    if($expert->img_path) {
      $image_list = Storage::allFiles('/images/experts/'.$expert->img_path);
      $images = collect();

      foreach($image_list as $image) {
        $images->push(['src' => basename($image), 'status' => 1]);
      }
    } else {
      $images = null;
    }

    if($expert->file_path) {
      $files_list = Storage::allFiles('/files/experts/'.$expert->file_path);
      $files = collect();

      foreach($files_list as $file) {
        $encrypt_string = explode('.', pathinfo($file)['basename']);
        $file_name = Crypt::decryptString($encrypt_string[0]);

        $files->push([
          'file_name' => $file_name,
          'path' => $expert->file_path.'/'.pathinfo($file)['basename'],
          'status' => 1
          ]);
      }
    } else {
      $files = null;
    }

    $expert->images = $images;
    $expert->files = $files;
    
    return response()->json($expert);
  }

  public function mylist() {
    $experts = TrnExperts::where('informant_id', auth('api')->user()->id)
      ->with('sys_user')
      ->with('expertType')
      ->with('expertise')
      ->get();

    return response()->json($experts);
  }

  public function store(Request $request) {
    $afiles = collect($request->get('files'));
    $images = $afiles->filter(function($val, $key) {
      $file_type = explode("/",$val['mimeType']);
      return $file_type[0] === 'image';
    });
    $files = $afiles->filter(function($val, $key) {
      $file_type = explode("/",$val['mimeType']);
      return $file_type[0] !== 'image';
    });
    $avatar = $request->get('avatar');

    $sys_user = SysUsers::updateOrCreate(
      [
        'firstname' => $request->get('firstname'),
        'lastname' => $request->get('lastname')
      ],
      [
        'prefix_id' => $request->get('prefix'),
        'lat' => $request->get('lat'),
        'lng' => $request->get('lng'),
        'tel' => $request->get('tel'),
        'email' => $request->get('email'),
        'profile_image' => $avatar['base64'] ? $this->storeAvatar($avatar, null) : null
      ]
    );

    $result = TrnExperts::create([
      'expert_type' => $request->get('expert_type'),
      'sys_user_id' => $sys_user->id,
      'expertise_id' => $request->get('expertise'),
      'title' => $request->get('expertise_name'),
      'description' => $request->get('expertise_description'),
      'img_path' => count($images) > 0 ? $this->storeImages($images, null) : null,
      'file_path' => count($files) > 0 ? $this->storeFiles($files, null) : null,
      'informant_id' => auth('api')->user()->id
    ]);

    return response()->json($result, 201);
  }

  public function update(Request $request, $id) {
    
    $afiles = collect($request->get('files'));
    $images = $afiles->filter(function($val, $key) {
      $file_type = explode("/",$val['mimeType']);
      return $file_type[0] === 'image';
    });
    $files = $afiles->filter(function($val, $key) {
      $file_type = explode("/",$val['mimeType']);
      return $file_type[0] !== 'image';
    });
    $avatar = $request->get('avatar');
    
    $expert = TrnExperts::find($id);
    $sys_user = SysUsers::find($expert->sys_user_id);

    $sys_user->firstname = $request->get('firstname');
    $sys_user->lastname = $request->get('lastname');
    $sys_user->prefix_id = $request->get('prefix');
    $sys_user->lat = $request->get('lat');
    $sys_user->lng = $request->get('lng');
    $sys_user->tel = $request->get('tel');
    $sys_user->email = $request->get('email');
    $sys_user->profile_image = $avatar['base64'] ? $this->storeAvatar($avatar, $sys_user->profile_image) : $sys_user->profile_image;

    $expert->expert_type = $request->get('expert_type');
    $expert->expertise_id = $request->get('expertise');
    $expert->title = $request->get('expertise_name');
    $expert->description = $request->get('expertise_description');
    $expert->img_path = count($images) > 0 ? $this->storeImages($images, $expert->img_path ? $expert->img_path : null) : $expert->img_path;
    $expert->file_path = count($files) > 0 ? $this->storeFiles($images, $expert->file_path ? $expert->file_path : null) : $expert->file_path;

    if(count($request->get('deleted_files')) > 0) {
      $this->deleteFiles($request->get('deleted_files'));
    }

    if(count($request->get('deleted_images')) > 0) {
      $this->deleteImages($expert->img_path, $request->get('deleted_images'));
    }

    $sys_user->save();
    $expert->save();

    return response()->json($expert->id);
  }

  public function destroy($id) {
    $expert = TrnExperts::find($id); 

    if($expert->img_path) {
      Storage::deleteDirectory('images/experts/'.$expert->img_path);        
    }
    if($expert->file_path) {
      Storage::deleteDirectory('files/experts/'.$expert->file_path);        
    }

    $expert->delete();

    return response()->json('deleted', 204);
  }

  public function count() {
    $count = TrnExperts::where('informant_id', auth('api')->user()->id)->count();

    return response()->json($count);
  }

  public function expertises() {
    $expertises = RefExpertises::all();

    return response()->json($expertises);
  }

  private function storeAvatar($avatar, $filename) {
    if($filename) {
      Storage::delete('images/users/avatar/'.$filename);
    }

    $base64 = $avatar['base64'];
    $data = substr($base64, strpos($base64, ',') + 1);
    $data = base64_decode($data);
    $explode_filename = explode(".", $avatar['filename']);
    $ext = $explode_filename[count($explode_filename) - 1];
    $file_name = str_random(60).'.'.$ext;    

    Storage::disk('local')->put('images/users/avatar/'.$file_name, $data);

    return $file_name;
  }

  private function storeImages($images, $foldername) {
    if(!$foldername) {
      $folder_name = str_random(60);
    } else {
      $folder_name = $foldername;
    }
    Storage::makeDirectory('/images/experts/'.$folder_name, 0777);

    foreach($images as $image) {
      $base64 = $image['base64'];
      $data = substr($base64, strpos($base64, ',') + 1);
      $data = base64_decode($data);
      $explode_filename = explode(".", $image['filename']);
      $ext = $explode_filename[count($explode_filename) - 1];
      $file_name = str_random(60).'.'.$ext;
      
  
      Storage::disk('local')->put('images/experts/'.$folder_name.'/'.$file_name, $data);
    }

    return $folder_name;
  }

  private function storeFiles($files, $foldername) {
    if(!$foldername) {
      $folder_name = str_random(60);
    } else {
      $folder_name = $foldername;
    }
    Storage::makeDirectory('/files/experts/'.$folder_name, 0777);

    foreach($files as $file) {
      $base64 = $file['base64'];
      $data = substr($base64, strpos($base64, ',') + 1);
      $data = base64_decode($data);
      $explode_filename = explode(".", $file['filename']);
      $ext = $explode_filename[count($explode_filename) - 1];
      $file_name = Crypt::encryptString($file['filename']).'.'.$ext;      
  
      Storage::disk('local')->put('files/experts/'.$folder_name.'/'.$file_name, $data);
    }

    return $folder_name;
  }

  private function deleteFiles($files) {
    foreach($files as $file) {
      Storage::delete('files/experts/'.$file['path']);
    }    
  }

  private function deleteImages($folder, $images) {
    foreach($images as $image) {
      Storage::delete('images/experts'.$folder.'/'.$image['src']);
    }    
  }

  public function files($folder, $name) {
    return Storage::download('files/experts/'.$folder.'/'.$name);
  }
}
