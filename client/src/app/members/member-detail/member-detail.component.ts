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
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'btn btn-sm fa fa-chevron-left',
        arrowNextIcon: 'btn btn-sm fa fa-chevron-right',
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
          // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];


  }

getGalleryImages (): NgxGalleryImage[]{
  const imageUrl = [];
  for(const photo of this.member.photos){
    imageUrl.push({
      small: photo?.url,
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
