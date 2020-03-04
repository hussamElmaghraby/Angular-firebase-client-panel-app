import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthGuard implements CanActivate {
   
        constructor(
            private router : Router,
            private afAuth : AngularFireAuth,
        ){ }
        //we need to attach canActivate to wantever we want to protect whatever route
        canActivate() : Observable<boolean> {
            return this.afAuth.authState.pipe(map(auth => {
                if(!auth){
                    this.router.navigate(['/login']);
                    return false;
                }else{
                    return true;
                }
            }));
        }
        

    }

