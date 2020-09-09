import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from './employee';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  list: any
  isEdit = false
  isFormSubmitted = false
  idValue = new Date().valueOf()
  employees = []
  Key: any
  constructor(private service: EmployeeService, private firestore: AngularFireStorage) { }
  empFormGroup = new FormGroup({
    fullname: new FormControl('', Validators.required),
    position: new FormControl(''),
    empcode: new FormControl(''),
    mobile: new FormControl('')
  });
  ngOnInit(): void {
    this.getAllEmpLiat()
  }
  resetForm() {
    this.empFormGroup.reset();
    this.isEdit = false
  }
  onSubmit(formdata) {
    if (this.empFormGroup.valid) {
      this.isFormSubmitted = true
      this.service.addEmp(formdata)
      this.resetForm();
    }
    console.log("formData::", formdata);
  }
  onEdit(emp) {
    console.log("EditValue:", emp);
    this.Key = emp.$key
    console.log("key", this.Key);

    this.isEdit = true
    this.empFormGroup.patchValue(emp);

  }
  onDelete(emp) {
    this.service.deleteEmp(emp.$key)
  }
  getAllEmpLiat() {
    this.service.getEmpList().snapshotChanges().subscribe(res => {
      this.employees = []
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.employees.push(a as Employee)
      })
      console.log("lsit::", this.employees);
    });
  }

  onUpdate(formdata) {
    console.log("UpdateFormData", formdata);
    this.service.updateEmp(formdata, this.Key)
    this.isEdit= false
    this.resetForm();
  }
}
