import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public LoginForm: FormGroup;
  public Submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required/*, Validators.email*/]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  ngOnDestroy() {
  }

  public OnSubmit(): void {
    this.Submitted = true;
    console.log("Submit click: " + this.Submitted);

    if (this.LoginForm.valid) {
      const email = this.LoginForm.get('email').value;
      const pass = this.LoginForm.get('password').value;

      if (email == 'admin' && pass == 'admin') {
        this.router.navigateByUrl("/dashboard");
      }
    }

  }

  public Login(email: string, pass: string): void {
    console.log("Login Click: " + email + " pass: " + pass);

    if (email == "admin" && pass == "admin") {
      console.log("Authentication Successfull");
      this.router.navigateByUrl("/dashboard");
    }
    else {
      console.log("Invalid Email or Password");
    }
  }

}
