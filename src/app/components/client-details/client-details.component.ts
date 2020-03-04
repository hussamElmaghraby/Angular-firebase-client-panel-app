import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Router , ActivatedRoute , Params } from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';
import { Client } from '../../models/client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id :string ;
  client : Client;
  hasBalance : boolean = false;
  // to show button to update the balance
  showBalanceUpdateInput:boolean = false 
  constructor(
    private clientService : ClientService ,
    private flashMessages : FlashMessagesService,
    private router:Router,
    private route : ActivatedRoute
  ) { }
  ngOnInit() {
    // get the id from the url : 
    this.id = this.route.snapshot.params['id'];
    // Get the Client ..
    this.clientService.getClient(this.id).subscribe(client=>{
      // before set that to client ..
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
    
  }
  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessages.show("balance updated" ,{ cssClass : "alert-success" , timeout: 4000});
  }
  onDeleteClick(){
    if(confirm('Are you Sure ?')){
      this.clientService.deleteClient(this.client);
      this.flashMessages.show("Client Deleted" ,{ cssClass : "alert-success" , timeout: 4000});
      this.router.navigate(['/']);
    }
  }
 
}
