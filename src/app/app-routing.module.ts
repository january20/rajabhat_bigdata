import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'home', loadChildren: './views/home/home.module#HomeModule' },
  { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule' },
  { path: 'login', loadChildren: './views/auth/auth.module#AuthModule' },
  { path: 'projects', loadChildren: './views/projects/projects.module#ProjectsModule' },
  { path: 'bio', loadChildren: './views/bio/bio.module#BioModule' },
  { path: 'experts', loadChildren: './views/experts/experts.module#ExpertsModule' },
  { path: 'otop', loadChildren: './views/otop/otop.module#OtopModule' },
  { path: 'download', loadChildren: './views/download/download.module#DownloadModule' },
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
