<?php

namespace App\Http\Controllers\Api\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefGoverments;
use App\Http\Models\Ref\RefProvinces;
use App\Http\Models\Institutions\AcademicInstitution;

use Carbon\Carbon;
 
class HomesController extends Controller
{
    public function index(Request $request, $id=0){

        $limit = 6;
        $offset = 0;
  
        if($request->has('limit')){
          $limit = $request->get('limit');
        }
        if($request->has('offset')){
          $offset = $request->get('offset');
        }
  
        if($request->has('province')){
  
          $like = '';
          if($request->has('group')){
            $like = $request->get('group');
          }
          $acad = AcademicInstitution::where('province','LIKE','%'. $request->get('province').'%')
                  ->where('institution_type','LIKE','%'.$like.'%')
                  ->orderBy('institution_name_th')
                  //->limit(10)
                  ->get();
                  
          return response()->json( $acad );
        }
  
        if($id <=0 ){
          return $this->list_all_instutions($offset,$limit);
        }
  
        return response()->json( AcademicInstitution::where('id',$id)->first() );
      }
  
      private function list_all_instutions($offset,$limit){
        $acad = AcademicInstitution::offset($offset)
                ->limit($limit)
                ->get(['id','institution_name_th','sub_district','district','province']);
        return response()->json( $acad );
      }
  
      public function groups(){
        $groups = AcademicInstitution::whereNotNull('institution_type')
                ->where('province','LIKE','%สุรินทร์%')
                ->where('institution_type','<>',"")->groupBy('institution_type')->get(['institution_type']);
        return response()->json( $groups );
  
      }
  }