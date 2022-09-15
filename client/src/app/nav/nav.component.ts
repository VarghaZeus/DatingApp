import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  isCollapsed = true;
  constructor(public accountService: AccountService, private router: Router,
     private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  login()
  {
    this.accountService.login(this.model).subscribe(response =>
      {
        this.router.navigateByUrl('/members');
        console.log(response);
        this.toastr.success('Welcome ' + this.model.username);
      },err =>{
        console.log(err);
        this.toastr.error(err.error);
      }
      );
    console.log(this.model);
  }
  logout()
  {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }
}
