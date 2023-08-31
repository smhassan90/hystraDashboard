import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/Login/login.service';
import { AuthenticationService } from '../../Services/Auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public LoginForm: FormGroup;
  public Submitted: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      username: new FormControl('', [Validators.required/*, Validators.email*/]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  ngOnDestroy() {
  }

  public OnSubmit(): void {
    this.Submitted = true;
    console.log("Submit click: " + this.Submitted);

    if (this.LoginForm.valid) {
      const username = this.LoginForm.get('username').value;
      const pass = this.LoginForm.get('password').value;

      this.loginService.Login(username, pass).subscribe((result) => {
        console.log(result);
        let statusCode = result.statusCode;
        
        if(statusCode == 404)
        {
          console.log("Invalid Username or Password");
          alert("Invalid Username or Password");
        }
        else
        if(statusCode == 200)
        {
          let token = result.token;
          this.auth.SaveToken(token);
          this.router.navigateByUrl("/dashboard");
        }
      });
      // if (email == 'admin' && pass == 'admin') {
      //   this.router.navigateByUrl("/dashboard");
      // }
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
