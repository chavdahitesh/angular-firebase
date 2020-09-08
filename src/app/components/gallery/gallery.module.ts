import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagelistComponent } from './imagelist/imagelist.component';


@NgModule({
  declarations: [GalleryComponent, ImagelistComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class GalleryModule { }
