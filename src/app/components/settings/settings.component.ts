import { Component, OnInit } from '@angular/core';
import{FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { SettingsService} from '../../services/settings.service';
import  {Settings} from '../../models/settings';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings : Settings;

  constructor(
    private flashMessages : FlashMessagesService,
    private router :Router,
    private settingService : SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }
  onSubmit(){
    this.settingService.changeSettings(this.settings);
    this.flashMessages.show("Settings Saved" , { cssClass: 'alert-success' , timeout:4000});
  }

}
