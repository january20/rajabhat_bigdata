<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Ref\RefDistricts;
use App\Http\Models\Ref\RefSubDistricts;
use App\Http\Models\Ref\RefVillages;

class AreasController extends Controller
{
    public function districts(Request $request) {
        $districts = RefDistricts::where('province_id', $request->input('province_id'))
            ->get();

        return response()->json($districts);
    }

    public function sub_districts(Request $request) {
        $sub_districts = RefSubDistricts::where('district_id', $request->input('district_id'))
            ->get();

        return response()->json($sub_districts);
    }

    public function villages(Request $request) {
        $villages = RefVillages::where('sub_district_id', $request->input('sub_district_id'))
            // ->with('province')
            ->with('district')
            ->with('sub_district')
            ->get();

        return response()->json($villages);
    }
}
