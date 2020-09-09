import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSubmit = false
  isEdit = false
  formValue: any
  contactList = []
  editKey: any
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    subject: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required)
  })
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContactList().snapshotChanges().subscribe(res => {
      this.contactList = [];
      res.forEach(m => {
        let a = m.payload.toJSON()
        a['$key'] = m.key;
        this.contactList.push(a)
        // console.log("contactList:::", this.contactList);

      })
    });
  }
  formSubmit(formvalue) {
    this.formValue = formvalue
    // console.log("formSubmit Called:", this.formValue);
    if (this.contactForm.valid) {
      this.isSubmit = true
      this.contactService.addContact(formvalue);
      this.resetForm();
    }
  }
  resetForm() {
    this.contactForm.reset()
  }

  onEdit(contact) {
    // console.log("contact", contact);
    this.contactForm.patchValue(contact);
    this.editKey = contact.$key

    this.isEdit = true
  }
  onDelete(contact) {
    this.contactService.deleteContact(contact.$key)
  }
  updateContact(value) {
    this.contactService.updateContact(value, this.editKey);
    this.isEdit = false
    this.resetForm()
  }
}
