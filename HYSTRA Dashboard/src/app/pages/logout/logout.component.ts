import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) {
    if (this.auth.IsLoggedIn()) {
      this.auth.Logout();
    }
  }

  ngOnInit(): void {


    // this.router.navigateByUrl('/login');
  }

}
