import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toast: ToastrService, private router: Router){}

  canActivate(): Observable<boolean> {
    return this.accountService.curentUser$.pipe(
      map(user => {
        if(user)
        {
          return true;
        }
        else{
          console.log('failed');
           this.toast.error('You need to login first!');
           this.router.navigateByUrl('/');
            return false;
          }
      })
    );
  }

}
