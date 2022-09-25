import { User } from 'src/app/_models/user';
import { UserParams } from './../../_models/userParams';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/_services/members.service';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  status: boolean = false;
  members: Partial<Member[]>;
  predicate = 'liked';

  constructor(private membersService: MembersService, private toaster: ToastrService) { }

  ngOnInit(): void {
   }

  addLike(member: Member){
    this.membersService.addlike(member.username).subscribe(() => {
      this.toaster.success('You Have Liked ' + member.knownAs);
      this.status = !this.status;
    })
  }

}
