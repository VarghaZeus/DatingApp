import { MembersService } from 'src/app/_services/members.service';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class memberDedailedResolver implements Resolve<Member>{

  constructor(private membersService: MembersService){}
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.membersService.getMember(route.paramMap.get('username'));
  }

}
