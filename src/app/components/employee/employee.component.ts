import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  list: any
  constructor(private service: EmployeeService, private firestore: AngularFireStorage) { }
  empFormGroup = new FormGroup({
    id: new FormControl(''),
    fullname: new FormControl('', Validators.required),
    position:new FormControl(''),
    empcode:new FormControl(''),
    mobile:new FormControl('')
  });
  ngOnInit(): void {

  }
  resetForm() {
    this.empFormGroup.reset();
  }
  onSubmit(formdata) {
    console.log("formData::",formdata);
   
  }
  onEdit(emp) {

  }
  onDelete(emp) {

  }

}
