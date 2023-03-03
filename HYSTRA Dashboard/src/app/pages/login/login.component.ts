import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  ngOnDestroy() {
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
