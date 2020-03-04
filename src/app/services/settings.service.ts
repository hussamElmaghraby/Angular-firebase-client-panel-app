import { Injectable } from '@angular/core';
import {Settings} from '../models/settings';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings : Settings ={
    allowRegisteration : true,
    disableBalanceOnAdd : true,
    disableBalanceOnEdit :true
  }
  constructor() {
    // we wants settings to come from  the localStorage of the Browser ..
    if(localStorage.getItem('settings') != null){
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
   }
 
  getSettings() :Settings{
    return this.settings;
  }
  changeSettings(settings : Settings){
    localStorage.setItem('settings' , JSON.stringify(settings));
  }
}
