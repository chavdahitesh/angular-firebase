import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Employee } from '../components/employee/employee'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  empListRef: AngularFireList<any>; // Reference to employe data list, its an Observable
  empRef: AngularFireObject<any>;
  constructor(private firedb: AngularFireDatabase) { }

  addEmp(data: Employee) {
    if (!this.empListRef) {
      this.empListRef = this.getEmpList();
    }
    this.empListRef.push({
      fullname: data.fullname,
      position: data.position,
      empcode: data.empcode,
      mobile: data.mobile
    });
  }
  getEmpList() {
    this.empListRef = this.firedb.list('emp-details');
    return this.empListRef;
  }
  updateEmp(emp: Employee, key) {
    console.log("emp_edit" + emp + 'keyy::' + key);
    this.empListRef = this.getEmpList();
    this.empListRef.update(key, emp);

  }
  deleteEmp(id: string) {
    console.log("deleteID::" + id);

    this.empRef = this.firedb.object('emp-details/' + id)
    this.empRef.remove();
  }
  getEmp(id: string) {
    this.empRef = this.firedb.object('emp-details/' + id);
    return this.empRef
  }
}