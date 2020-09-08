import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database'
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  imgDetailList:AngularFireList<any>
  constructor(private fireBb :AngularFireDatabase) { }


  getImageDetailList(){
    this.imgDetailList = this.fireBb.list('image-gallery');
    return this.imgDetailList;
  }
  insertImageDetails(img){
    if(!this.imgDetailList){
     this.getImageDetailList();
    }
    this.imgDetailList.push({image:img.img_url})
  }

}
