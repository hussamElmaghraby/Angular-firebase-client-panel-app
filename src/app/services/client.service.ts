import { Injectable } from '@angular/core';
// firebase 
import {AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import {Client} from '../models/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // our four properties
  clientsCollection : AngularFirestoreCollection<Client>;
  clientDoc : AngularFirestoreDocument<Client>;
  clients:Observable<Client[]>;
  client:Observable<Client>

  constructor( private afs : AngularFirestore) {
    // set value for the four properties..  
    this.clientsCollection = this.afs.collection('client' , ref =>ref.orderBy('lastName'  ,'asc'))
   }
   // it will return an Observable of client array .. 
   getClients(): Observable<Client[]>{
    // we need to get the clients with the id ..
    // we need to snapshot the changes to get the id ..
    // get the data and the id use the map operator..
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.clients;
   }
   newClient(client:Client){
    this.clientsCollection.add(client);
   }
   getClient(id :string) :  Observable<Client> {  
    this.clientDoc = this.afs.doc<Client>(`client/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists === false){
        return null;
      }else{
        const data  = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.client;
   }
   updateClient(client : Client ){
    this.clientDoc = this.afs.doc(`client/${client.id}`);
    this.clientDoc.update(client);
   }
   deleteClient(client : Client){
    this.clientDoc = this.afs.doc(`client/${client.id}`);
    this.clientDoc.delete();
   }
}
