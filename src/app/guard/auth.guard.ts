import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


//define AuthGuard class that implements CanActivate interface
export class AuthGuard implements CanActivate {

  //costructor takes instances 
  //parameters
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) { }

  //implement canActivate method of CanActivate interface. This method is callled to determine if a route can be activated 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //if the user is logged i nit returns true, allowing navigation to the requested route
    if (this.service.IsLoggedIn()) {
      return true
    } else {
      //if the user is not loggged in it navigates to the login route using Router Service and returns false
      this.router.navigate(['login'])
      return false
    }
  }

}


