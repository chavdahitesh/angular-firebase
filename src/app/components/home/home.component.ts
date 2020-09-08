import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ContactService}from '../../services/contact.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSubmit = false
  formValue : any
  contactForm = new FormGroup({
    name : new FormControl('',Validators.required),
    email:new  FormControl('',[Validators.email,Validators.required]),
    subject:new FormControl('',Validators.required),
    msg:new FormControl('',Validators.required)
  })
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {

  }
  formSubmit(formvalue){
    this.formValue=formvalue
    console.log("formSubmit Called:",this.formValue);
    
    if(this.contactForm.valid){
      this.isSubmit = true
      this.contactService.addContact(formvalue);
      this.resetForm();
    }
  }
  resetForm(){
    this.contactForm.reset()
  }
}
