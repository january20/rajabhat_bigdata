import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRolesGuard implements CanActivate  {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    const expectedRole = route.data.expectedRole;

    if(currentUser && currentUser.roles[expectedRole]) {
      return true;
    }
    
    this.router.navigate(['/401']);
    return false;
  }
  
}
