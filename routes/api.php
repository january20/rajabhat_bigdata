<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/debug', 'DebugController@indexxx');
// Route::post('/dbg_login', 'DebugController@login');
// Route::post('/dbg_roles', 'DebugController@roles');

Route::get('/', function (Request $request) {
  return response()->json(['app' => 'SURIN API', 'version'=>"0.68"]);
});

Route::post('login', 'Auth\UserController@login');
Route::post('ext_login', 'Auth\UserController@ext_login');

Route::group(['middleware' => ['jwt.auth']], function() {
  Route::post('ext_register', 'Auth\UserController@ext_register');
  Route::get('user', 'Auth\UserController@getAuthenticatedUser');
  Route::get('check_token', 'Auth\UserController@checkToken');
  Route::get('ext_user_list', 'Auth\UserController@index');
});

Route::prefix('projects')->group(function() {
  Route::prefix('assessment')->group(function() {
    Route::post('/', 'Api\Projects\ProjectAssessmentController@store')->middleware('jwt.auth');
    Route::get('/list', 'Api\Projects\ProjectAssessmentController@list')->middleware('jwt.auth');
    Route::get('/kpi', 'Api\Projects\ProjectAssessmentController@kpi')->middleware('jwt.auth');
    Route::get('/{projectId}', 'Api\Projects\ProjectAssessmentController@assessment');
    Route::get('/{projectId}/results', 'Api\Projects\ProjectAssessmentController@results');
    Route::get('/{projectId}/pdf', 'Api\Projects\ProjectAssessmentController@pdf');
  });
  Route::resource('/activity', 'Api\Projects\ProjectActivityController')->middleware('jwt.auth');

  // Route::resource('/assessment', 'Api\Projects\ProjectAssessmentController')->middleware('jwt.auth');
  Route::get('/', 'Api\Projects\ProjectsController@index');
  Route::get('/info/{uuid}', 'Api\Projects\ProjectsInfoController@index');

  Route::post('/', 'Api\Projects\ProjectsController@store')->middleware('jwt.auth');
  // Route::post('/test_store', 'Api\Projects\ProjectsController@test_store')->middleware('jwt.auth');
  Route::post('/manage', 'Api\Projects\ProjectsController@manage')->middleware('jwt.auth');
  Route::post('/accept_editing', 'Api\Projects\ProjectsController@accept_editing')->middleware('jwt.auth');
  Route::post('/upload', 'Api\Projects\ProjectsController@upload')->middleware('jwt.auth');
  Route::get('/create', 'Api\Projects\ProjectsController@create')->middleware('jwt.auth');
  Route::get('/reference', 'Api\Projects\ProjectsController@reference');
  Route::get('/result', 'Api\Projects\ProjectsController@result');
  Route::get('/being_revised', 'Api\Projects\ProjectsController@being_revised');
  // Route::get('/test_create', 'Api\Projects\ProjectsController@test_create')->middleware('jwt.auth');
  Route::get('/mylist', 'Api\Projects\ProjectsController@mylist')->middleware('jwt.auth');
  Route::get('/search_staffs', 'Api\Projects\ProjectsController@search_staffs')->middleware('jwt.auth');
  Route::delete('/{id}', 'Api\Projects\ProjectsController@destroy')->middleware('jwt.auth');
  Route::get('/{id}', 'Api\Projects\ProjectsController@show')->middleware('jwt.auth');
  Route::post('/{id}', 'Api\Projects\ProjectsController@update')->middleware('jwt.auth');
  Route::get('/check_manage_permission/{id}', 'Api\Projects\ProjectsController@check_manage_permission')->middleware('jwt.auth');
  Route::get('/check_owner/{id}', 'Api\Projects\ProjectsController@check_owner')->middleware('jwt.auth');
  Route::get('/transaction/{id}', 'Api\Projects\ProjectsController@get_transaction')->middleware('jwt.auth');
  Route::get('/{id}/edit', 'Api\Projects\ProjectsController@edit')->middleware('jwt.auth');
});

Route::prefix('old_projects')->group(function() {

  Route::get('/', 'Api\OldProjects\ProjectsController@index');
  Route::post('/', 'Api\OldProjects\ProjectsController@store')->middleware('jwt.auth');

  Route::prefix('summary')->group(function() {
    Route::get('/', 'Api\OldProjects\ProjectAssessmentSummaryController@index');
    Route::get('/srru_strategies', 'Api\OldProjects\ProjectAssessmentSummaryController@srru_strategies');
  });

  Route::get('/create', 'Api\OldProjects\ProjectsController@create')->middleware('jwt.auth');
  Route::get('/my_projects', 'Api\OldProjects\ProjectsController@user_project_list')->middleware('jwt.auth');
  Route::get('/mylist', 'Api\OldProjects\ProjectsController@myList')->middleware('jwt.auth');
  Route::get('/result', 'Api\OldProjects\ProjectsController@result');
  Route::resource('/activity', 'Api\Projects\ProjectActivityController')->middleware('jwt.auth');
  Route::get('/assessment/project_list', 'Api\Projects\ProjectAssessmentController@project_list');
  Route::get('/assessment/result', 'Api\Projects\ProjectAssessmentController@result');
  Route::resource('/assessment', 'Api\Projects\ProjectAssessmentController')->middleware('jwt.auth');
  Route::delete('/{id}', 'Api\OldProjects\ProjectsController@destroy')->middleware('jwt.auth');
  Route::get('/test/{id}', 'Api\OldProjects\ProjectsController@test_show');
  Route::get('/{id}', 'Api\OldProjects\ProjectsController@show');
  Route::put('/{id}', 'Api\OldProjects\ProjectsController@update')->middleware('jwt.auth');
  Route::get('/{id}/edit', 'Api\OldProjects\ProjectsController@edit')->middleware('jwt.auth');

});
Route::prefix('experts')->group(function() {
  Route::get('/', 'Api\Experts\ExpertsController@index');
  Route::post('/', 'Api\Experts\ExpertsController@store')->middleware('jwt.auth');
  Route::get('/create', 'Api\Experts\ExpertsController@create');
  Route::get('/expertises', 'Api\Experts\ExpertsController@expertises');
  Route::get('/mylist', 'Api\Experts\ExpertsController@mylist')->middleware('jwt.auth');
  Route::get('/count', 'Api\Experts\ExpertsController@count')->middleware('jwt.auth');
  Route::delete('/{id}', 'Api\Experts\ExpertsController@destroy')->middleware('jwt.auth');
  Route::get('/{id}', 'Api\Experts\ExpertsController@show');
  Route::put('/{id}', 'Api\Experts\ExpertsController@update')->middleware('jwt.auth');
  Route::get('/{id}/edit', 'Api\Experts\ExpertsController@edit')->middleware('jwt.auth');
});
Route::prefix('families')->group(function() {
  Route::get('/', 'Api\Families\FamiliesController@index')->middleware('jwt.auth');
  Route::post('/', 'Api\Families\FamiliesController@store')->middleware('jwt.auth');
  Route::resource('/health', 'Api\Families\FamilyHealthController');
  Route::get('/create', 'Api\Families\FamiliesController@create')->middleware('jwt.auth');
  Route::get('/family_members', 'Api\Families\FamiliesController@family_members');
  Route::get('/vid/{vid}', 'Api\Families\FamiliesController@vid');
  Route::delete('/{id}', 'Api\Families\FamiliesController@destroy')->middleware('jwt.auth');
  Route::get('/{id}', 'Api\Families\FamiliesController@show')->middleware('jwt.auth');
  Route::put('/{id}', 'Api\Families\FamiliesController@update')->middleware('jwt.auth');
  Route::get('/{id}/edit', 'Api\Families\FamiliesController@edit')->middleware('jwt.auth');
});
Route::prefix('otop')->group(function() {
  Route::get('/', 'Api\Otop\OtopController@index');
  Route::post('/', 'Api\Otop\OtopController@store')->middleware('jwt.auth');
  Route::get('/category/{cat_id}', 'Api\Otop\OtopController@by_category');
  Route::get('/create', 'Api\Otop\OtopController@create');
  Route::get('/all', 'Api\Otop\OtopController@all');
  Route::get('/mylist', 'Api\Otop\OtopController@mylist')->middleware('jwt.auth');
  Route::get('/categories', 'Api\Otop\OtopController@otop_categories');
  Route::get('/related', 'Api\Otop\OtopController@related_products');
  Route::get('/count', 'Api\Otop\OtopController@count')->middleware('jwt.auth');
  Route::delete('/{id}', 'Api\Otop\OtopController@destroy')->middleware('jwt.auth');
  Route::get('/{id}', 'Api\Otop\OtopController@show');
  Route::put('/{id}', 'Api\Otop\OtopController@update')->middleware('jwt.auth');
  Route::get('/{id}/edit', 'Api\Otop\OtopController@edit')->middleware('jwt.auth');
});

Route::prefix('kpi')->group(function() {
  Route::get('/', function (Request $request) {
    return response()->json(['app' => 'KPI', 'version'=>"0.01"]);
  });
  Route::get('/srru', 'Api\Kpi\SrruStrategyController@index');
  Route::get('/rajabhat', 'Api\Kpi\RajabhatStrategies@index');
  Route::get('/national', 'Api\Kpi\NationalStrategies@index');
  Route::get('/schemes', 'Api\Kpi\ProjectSchemes@index');
  Route::get('/benefits', 'Api\Kpi\ProjectBenefits@index');

});

Route::resource('/villages', 'Api\VillagesController');

Route::prefix('bio')->group(function() {
  Route::resource('/', 'Api\Bio\BioController');
  Route::resource('/plants', 'Api\Bio\PlantController');
  Route::resource('/animals', 'Api\Bio\AnimalController');
  Route::get('/animals_count', 'Api\Bio\BioController@countAnimals')->middleware('jwt.auth');
  Route::get('/plants_count', 'Api\Bio\BioController@countPlants')->middleware('jwt.auth');
});

Route::get('/mis', 'Api\MISController@index');


Route::prefix('instutions')->group(function() {
  Route::get('/', 'Api\Institutions\AcademicInstitutionController@index');
  Route::get('/academic', 'Api\Institutions\AcademicInstitutionController@index');
  Route::get('/academic/{id}', 'Api\Institutions\AcademicInstitutionController@index');

  Route::get('/groups', 'Api\Institutions\AcademicInstitutionController@groups');


  Route::get('/ministry', 'Api\Institutions\MinistryController@index');
  Route::get('/ministry/{id}', 'Api\Institutions\MinistryController@index');
  Route::get('/directorate', 'Api\Institutions\DirectorateController@index');
  Route::get('/directorate/{id}', 'Api\Institutions\DirectorateController@index');
  Route::get('/department', 'Api\Institutions\DepartmentController@index');
  Route::get('/department/{id}', 'Api\Institutions\DepartmentController@index');

});

Route::prefix('ref')->group(function () {

  Route::get('/', function (Request $request) {
        return response()->json(['apps' => ['provinces','districts'], 'version'=>"1.0"]);
  });

  Route::resource('provinces', 'Api\Ref\ProvincesController');
  Route::resource('districts', 'Api\Ref\DistrictsController');
  Route::resource('sub_districts', 'Api\Ref\SubDistrictsController');
  Route::resource('villages', 'Api\Ref\VillagesController');
  Route::resource('icd', 'Api\Ref\ICDController');
  Route::resource('srru_strategies', 'Api\Ref\SrruStrategiesController');
  Route::resource('rajabhat_strategies', 'Api\Ref\RajabhatStrategiesController');
  Route::resource('national_strategies', 'Api\Ref\NationalStrategiesController');
  Route::resource('project_schemes', 'Api\Ref\ProjectSchemesController');
  Route::resource('project_benefits', 'Api\Ref\ProjectBenefitsController');
  Route::resource('plant_organs', 'Api\Ref\BioRefPlantController');
  Route::resource('animal_organs', 'Api\Ref\BioRefAnimalController');
  Route::resource('srru_faculty', 'Api\Ref\SrruFacultyController');
  Route::resource('misc', 'Api\Ref\MiscController');

  Route::get('weather/duration', 'Api\Ref\WeatherDurationController@index');
  Route::get('weather/stations', 'Api\Ref\WeatherStationController@index');
  Route::get('weather/{station}/{duration}', 'Api\Ref\WeatherStationController@show');

});

Route::prefix('info')->group(function() {

  Route::prefix('thaiqm')->group(function() {
    Route::get('/p1', 'Api\Info\ThaiQMController@p1');
    Route::get('/p2', 'Api\Info\ThaiQMController@p2');
    Route::get('/p3', 'Api\Info\ThaiQMController@p3');
    Route::get('/p4', 'Api\Info\ThaiQMController@p4');
    Route::get('/details', 'Api\Info\ThaiQMController@details');


    Route::get('/villages', 'Api\Info\ThaiQMController@villages');


  });


  Route::prefix('population')->group(function() {
    Route::resource('/', 'Api\Population\PopulationController');
    Route::resource('/occupation', 'Api\Population\OccupationController');
    Route::resource('/education', 'Api\Population\EducationController');
    Route::resource('/income', 'Api\Population\IncomeController');
    Route::resource('/age', 'Api\Population\AgeController');
  });
  // Route::prefix('data')->group(function() {
  //
  // });
  Route::get('/data', 'Api\Info\InfoDataController@index');
  Route::get('/device', 'Api\Info\InfoDataController@device');

    // Route::resource('/experts', 'Api\Experts\ExpertsController');
  Route::prefix('')->group(function() {
    Route::get('/', 'Api\Info\InfoController@index');
    Route::post('/', 'Api\Info\InfoController@store')->middleware('jwt.auth');
    Route::get('/create', 'Api\Info\InfoController@create');
    Route::delete('/{id}', 'Api\Info\InfoController@destroy')->middleware('jwt.auth');
    Route::get('/{id}', 'Api\Info\InfoController@show');
    Route::put('/{id}', 'Api\Info\InfoController@update')->middleware('jwt.auth');
    Route::get('/{id}/edit', 'Api\Info\InfoController@edit')->middleware('jwt.auth');
  });







    // Route::resource('/nature', 'Api\Data\Nature\NatureController');
    // Route::resource('/agriculture', 'Api\Data\Agriculture\AgricultureController');
    Route::resource('/health', 'Api\Health\HealthController');
    Route::resource('/families', 'Api\Data\Families\FamiliesController');

    Route::prefix('air')->group(function() {
      Route::get('/', 'Api\Air\AirStationController@index');
      Route::get('stations', 'Api\Air\AirStationController@stations');
      Route::get('/period/{period}', 'Api\Air\AirStationController@period');
    });

    Route::prefix('weather')->group(function() {
      Route::get('stations', 'Api\Env\WeatherController@stations');
    });



});



Route::prefix('trash')->group(function() {
  Route::get('/{id}', 'Api\Trash\TrashController@index');
});

// Route::prefix('iot')->group(function () {
//     Route::get('pm25', 'Api\IoTController@pm25')->middleware('token');
//     //https://surin.srru.ac.th/api/iot/pm25?token=1&v=12
// });

//Route::group(['prefix' => 'iot','middleware' => ['token']], function() {
    //https://surin.srru.ac.th/api/iot/pm25?token=1&v=12
Route::prefix('iot')->group(function() {

    Route::get('pm25', 'Api\IoTController@pm25')->middleware('token');
    Route::get('config', 'Api\IoTController@config')->middleware('token');
    Route::resource('water', 'Api\IoT\WaterQualityController')->middleware('token');
    Route::resource('air', 'Api\IoT\AirQualityController')->middleware('token');
    Route::resource('weather', 'Api\IoT\WeatherController')->middleware('token');
    Route::resource('data', 'Api\IoT\TrnIotDataController')->middleware('token');

    Route::get('device', 'Api\IoT\IotDeviceController@index');



});

Route::prefix('schools')->group(function() {
  Route::get('', 'Api\Schools\SchoolsController@index');
  Route::get('{area_code}', 'Api\Schools\SchoolsController@index');
  Route::get('areas', 'Api\Schools\SchoolsController@areas');
  Route::get('areas/{province_id}', 'Api\Schools\SchoolsController@areas');


  Route::get('schoolmis', 'Api\SchoolsController@schoolmis');
  Route::get('school_list', 'Api\SchoolsController@school_list');
});

Route::prefix('areas')->group(function($route) {
  $route->get('districts', 'Api\AreasController@districts');
  $route->get('sub_districts', 'Api\AreasController@sub_districts');
  $route->get('villages', 'Api\AreasController@villages');
});

Route::prefix('dashboard')->group(function() {
  Route::get('/my_projects', 'Api\Dashboard\DashboardController@my_projects');
  Route::get('/my_villages', 'Api\Dashboard\DashboardController@my_villages');
});



Route::resource('home', 'Api\HomeController');
Route::resource('dev', 'Api\Developers\DevelopersController');
Route::resource('test', 'Api\TestController');
// Route::resource('info', 'Api\Info\InfoController');
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// bacheler parking project

Route::prefix('parking')->group(function() {
  Route::get('/', 'Api\Parking\ParkingController@index');
});

Route::get('jpt2tacnap', 'Api\Data\Jpt2TacnapController@index');

