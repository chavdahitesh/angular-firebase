import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { ImagelistComponent } from './imagelist/imagelist.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
   {path:'list',component:ImagelistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
