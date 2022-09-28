import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/member';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent, TabsetConfig } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';




@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(private membersService: MembersService, private route: ActivatedRoute,private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.member = data.member;
    });

    this.route.queryParams.subscribe(params=>{
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });

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
    this.galleryImages = this.getGalleryImages();
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

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages =>{
      this.messages = messages;
    });
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActived(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
      this.loadMessages();
    }
  }

}
