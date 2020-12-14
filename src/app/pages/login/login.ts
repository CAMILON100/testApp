import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { MyService } from '../../providers/myService';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
   sendData:any;

  constructor(
    public userData: UserData,
    public router: Router,
    public myService: MyService
  ) { }






  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      this.sendData = {Username: this.login.username, Password:this.login.password}

      this.myService.apiData('POST','/api/login', this.sendData, null).subscribe(  
    
         (result) => {
           if(result==="Username and password are incorrect, please try again")
           {
             console.log(result);
             this.router.navigateByUrl('/app/tabs/about');
           }
           else
           {
          console.log(result);
          console.log(this.login.username);
          console.log(this.login.password);
          this.userData.login(this.login.username);
          this.router.navigateByUrl('/app/tabs/schedule');
           }
         },
           //revisar esto 
         (error) => {
          console.log(error);
          this.router.navigateByUrl('/app/tabs/about');}
    
       );
     
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
