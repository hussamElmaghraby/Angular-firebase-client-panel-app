import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../services/auth.service';
import{FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : string;
  password : string;

  constructor(
    private authService : AuthService,
    private flashMessages : FlashMessagesService,
    private router :Router
  ) { 
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>
      {
        if(auth){
      this.router.navigate(['/']);
        }
      });
    
  }

  onSubmit(){
    //you will return  a promise ..  when you grabbing onto a promise you want to use .then
    this.authService.login(this.email , this.password)
    .then(res=>{
      this.flashMessages.show('you are now logged in' , {cssClass:'alert-success' , timeout:4000});
      this.router.navigate(['/']);
      // if there is an error .. when we did reject .. we can get error inside the catch that we passed it into reject()
    }).catch(err=>{
      this.flashMessages.show(err.message , {cssClass:'alert-danger' , timeout:4000});
     
    });
  }
}

