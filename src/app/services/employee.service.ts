import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore:AngularFireStorage) { }

  addEmp(){
    return new Promise<any>((resolve, reject) =>{
      // this.firestore
      //     .collection("coffeeOrders")
      //     .add(data)
      //     .then(res => {}, err => reject(err));
  });
  }
  updateEmp(){

  }
  deleteEmp(){

  }
  listEmp(){
    
  }
}
