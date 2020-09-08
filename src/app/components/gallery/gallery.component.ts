import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { GalleryService } from '../../services/gallery.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  selectedImage: any;
  imageUrl: any;
  gallryTemp = new FormGroup({
    img_url: new FormControl('')
  })
  isSubmitted = false
  constructor(private fireStorage: AngularFireStorage, private galservice: GalleryService) { }

  ngOnInit(): void {
    this.resetForm()
  }
  onFileSelect(event: any) {
    this.selectedImage = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => this.imageUrl = e.target.result;
      fileReader.readAsDataURL(this.selectedImage)
    }
    else {
      this.selectedImage = null
    }

  }
  onSubmit(formValue) {
    this.isSubmitted = true
    // this.galservice.insertImageDetails(formValue);
    if (this.gallryTemp.valid) {
      var filepath = `gallery/${new Date().getTime()}_${this.selectedImage.name.split('.').slice(0, -1).join('.')}`
      const fileRef = this.fireStorage.ref(filepath)
      this.fireStorage.upload(filepath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['img_url'] = url
            this.galservice.insertImageDetails(formValue);
            this.resetForm()
          })
        })
      ).subscribe();
    }

  }
  resetForm() {
    this.gallryTemp.reset();
    this.gallryTemp.setValue({
      img_url: null
    })
    this.selectedImage = '';
    this.imageUrl = null
  }

}
