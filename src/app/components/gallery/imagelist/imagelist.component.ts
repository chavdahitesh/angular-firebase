import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service'
import { AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-imagelist',
  templateUrl: './imagelist.component.html',
  styleUrls: ['./imagelist.component.css']
})
export class ImagelistComponent implements OnInit {
  imageList: AngularFireList<any>
  images: any = []
  constructor(private imgServie: GalleryService) {
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.imgServie.getImageDetailList().snapshotChanges().subscribe(res => {
      this.images = res.map(m => { return m.payload.val() });
    })
  }

}
