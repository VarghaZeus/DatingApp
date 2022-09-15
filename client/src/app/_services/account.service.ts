import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUul = environment.apiUrl;
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
          this.setCurrentUser(user);
        }
      })
    )
  }
  register(model: any){
    return this.http.post(this.baseUul + 'account/register', model).pipe(
      map((user: User) =>{
        if(user){

          this.setCurrentUser(user);
        }
      })
    )
  }
  setCurrentUser(user: User)
  {
    localStorage.setItem('user', JSON.stringify(user));
    this.curentUserSource.next(user);
  }
  logout()
  {
    localStorage.removeItem('user');
    this.curentUserSource.next(null);
  }
}
