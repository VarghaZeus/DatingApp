import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/member';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';




@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private membersService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      },
    ];


  }

getGalleryImages (): NgxGalleryImage[]{
  const imageUrl = [];
  for(const photo of this.member.photos){
    imageUrl.push({
      samll: photo?.url,
      medium: photo?.url,
      big: photo?.url
    })
  }
  return imageUrl;
}

loadMember(){

  this.membersService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(memb => {
    this.member = memb;
    this.galleryImages = this.getGalleryImages();
  })

}
}
