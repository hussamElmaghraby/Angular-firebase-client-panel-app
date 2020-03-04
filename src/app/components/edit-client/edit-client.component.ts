import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Router , ActivatedRoute , Params } from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';
import { Client } from '../../models/client';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id :string;
  client : Client = {
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
    balance : 0
  }
  disableBalanceOnEdit : boolean;
  constructor(
   private clientService : ClientService,
   private router :Router,
   private falshMessages : FlashMessagesService,
   private route : ActivatedRoute,
   private settingsService : SettingsService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client=>{
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }
  onSubmit({value , valid } : {value :Client , valid : boolean}){
    console.log(value);
    console.log(valid);
    if(!valid){
      this.falshMessages.show("Please fill out the form Correctly .." , { cssClass:'alert-danger' , timeout:4000});
    }else{
      // first add the id
      value.id = this.id;
      this.clientService.updateClient(value);
      this.falshMessages.show(" Successfully updated .. ",
      { cssClass:"alert-success" , timeout : 4000});
    }
    this.router.navigate(['/client/'+value.id])
  }

}
