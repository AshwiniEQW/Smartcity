import { Component, OnInit } from '@angular/core';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  constructor(private messageService:ParentChildCommunicationService) { }

  ngOnInit(): void {
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);

  }
}
