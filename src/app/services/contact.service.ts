import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
contactListRef : AngularFireList<any>;
contactRef :AngularFireObject<any>;
  constructor(private db :AngularFireDatabase) { }

  addContact(data){
    if(!this.contactListRef){
      this.contactListRef = this.getContactList();
    }
    this.contactListRef.push(data);
  }
  getContactList(){
    this.contactListRef = this.db.list('contact-list')
    return this.contactListRef;
  }
  getContact(id:string){
    this.contactRef = this.db.object('contact-list/'+id)
    return this.contactRef;
  }
  updateContact(contact){
    this.contactRef.update(contact)
  }
  deleteContact(id:String){
    this.contactRef = this.db.object('contact-list/'+id);
    return this.contactRef.remove();
  }
}
