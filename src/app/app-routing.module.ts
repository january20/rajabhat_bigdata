import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'home', loadChildren: './views/home/home.module#HomeModule' },
  { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule' },
  { path: 'admin', loadChildren: './views/admin/admin.module#AdminModule' },
  { path: 'login', loadChildren: './views/auth/auth.module#AuthModule' },
  { path: 'projects', loadChildren: './views/projects/projects.module#ProjectsModule' },
  { path: 'bio', loadChildren: './views/bio/bio.module#BioModule' },
  { path: 'experts', loadChildren: './views/experts/experts.module#ExpertsModule' },
  { path: 'families', loadChildren: './views/families/families.module#FamiliesModule' },
  { path: 'otop', loadChildren: './views/otop/otop.module#OtopModule' },
  { path: 'download', loadChildren: './views/download/download.module#DownloadModule' },
  { path: 'media', loadChildren: './views/media/media.module#MediaModule' },
  { path: 'info', loadChildren: './views/info/info.module#InfoModule' },
  { path: 'kpi', loadChildren: './views/kpi/kpi.module#KpiModule' },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  // {
  //   path: '**',
  //   component: xx
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
