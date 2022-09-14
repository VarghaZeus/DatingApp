import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinerServic: NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinerServic.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255, 255, 255, 0)',
      color: 'rgba(255, 0, 132, 0.61)',
      size: 'medium'
    })
  }
  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinerServic.hide();
    }
  }
}
