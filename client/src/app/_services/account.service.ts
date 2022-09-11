import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUul = 'https://localhost:5001/api/';
  public curentUserSource = new ReplaySubject<User>(1);
  curentUser$ = this.curentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any)
  {
    return this.http.post(this.baseUul + 'account/login', model).pipe(
      map((responce: User)=>{
        const user = responce;
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.curentUserSource.next(user);
        }
      })
    )
  }
  register(model: any){
    return this.http.post(this.baseUul + 'account/register', model).pipe(
      map((user: User) =>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUserSource.next(user);
        }
      })
    )
  }
  setCurrentUser(user: User)
  {
    this.curentUserSource.next(user);
  }
  logout()
  {
    localStorage.removeItem('user');
    this.curentUserSource.next(null);
  }
}