import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


    formUser: FormGroup
    userName: string;
    showModal: boolean = false;
  
    constructor(private route: Router,  private formBuilder: FormBuilder) { }

    buildForm(){
      this.formUser = this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    }

    login(){
        sessionStorage.setItem("user", this.userName)
        this.route.navigate(['home'])
    }



}
