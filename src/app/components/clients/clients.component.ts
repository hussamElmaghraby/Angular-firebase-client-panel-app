import { Component, OnInit } from '@angular/core';
import { ClientService} from '../../services/client.service';
import {Client} from '../../models/client';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients:Client[];
  totalOwed : number;

  constructor(private clientService : ClientService ){ }

  ngOnInit() {
    // the clients which comming from the observable being returning form the service -> getClients
    this.clientService. getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }
  // calculate the total owed ..
  getTotalOwed(){
    // reduce work similar to forEach.. total parameter to keep adding to .
    // it will start with zero..
    this.totalOwed = this.clients.reduce((total  , client)=> {
      return total+ parseFloat(client.balance.toString());
    } , 0);
  }

}
