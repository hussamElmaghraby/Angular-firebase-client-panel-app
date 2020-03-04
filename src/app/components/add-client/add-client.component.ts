import { Component, OnInit  , ViewChild} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {Client} from '../../models/client';
import {ClientService } from '../../services/client.service';
import{SettingsService} from '../../services/settings.service'
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
client : Client = {
  firstName : '',
  lastName : '',
  email : '',
  phone : '',
  balance : 0
}
disableBalanceOnAdd : boolean; 
// put the name of the form ..
@ViewChild('clientForm'  , {static: true})  form : any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService : ClientService,
    private router:Router ,
    private settingsService : SettingsService
    ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({value , valid } : {value: Client , valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      // show error..
      this.flashMessagesService.show("Please Fill out the Form Correctly ..",
      { cssClass:"alert-danger" , timeout : 4000}
      );
    }else{
    
      // add new Client  .. 
      this.clientService.newClient(value);
       // show message
      this.flashMessagesService.show("New Class is Added ",
      { cssClass:"alert-success" , timeout : 4000}
      );
    }
    //  redirect to dash
    this.router.navigate(['/']);
  }


}
