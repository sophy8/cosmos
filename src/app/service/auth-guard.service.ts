import { Injectable } from '@angular/core';
import { CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RegisterService } from '../service/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: RegisterService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/search/item/']);
    }
    return this.auth.isAuthenticated();

}
}
