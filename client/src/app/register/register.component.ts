import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any ={};
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
register()
{
  this.accountService.register(this.model).subscribe(response =>{
    console.log(response);
    this.cancel();
  },err =>{
    console.log(err);
  });
  console.log(this.model);
}
cancel(){
  this.cancelRegister.emit(false);
  console.log('Cancelled');
}
}
