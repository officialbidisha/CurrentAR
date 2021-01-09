import { CsvuploadComponent } from './csvupload/csvupload.component';

import { AboutusComponent } from './aboutus/aboutus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {​​ path: '', pathMatch: 'full', redirectTo: '/csvupload' }​​,
    {path:"csvupload",component:CsvuploadComponent},
  {path:"aboutus", component:AboutusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {​​​​ useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
