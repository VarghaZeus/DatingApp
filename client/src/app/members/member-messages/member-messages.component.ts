import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/member';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from './../../_models/message';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string;
  messageContent: string;

  constructor(private MessageService: MessageService) { }

  ngOnInit(): void {
  }

  sentMessage(){
    this.MessageService.sendMessage(this.username, this.messageContent).subscribe(message=>{
      this.messages.push(message);
      this.messageForm.reset();
    })
  }
}
