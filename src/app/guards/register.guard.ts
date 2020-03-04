import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import {SettingsService} from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
   
        constructor(
            private router : Router,
            private settingsService : SettingsService
        ){ }
        //we need to attach canActivate to wantever we want to protect whatever route
        canActivate() : boolean {
           if(this.settingsService.getSettings().allowRegisteration){
            return true;
           }else{
            this.router.navigate(['/login']);
            return false
           }

        }
        

    }

