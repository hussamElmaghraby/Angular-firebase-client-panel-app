import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';
import {RegisterComponent} from './components/register/register.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import { AuthGuard } from './guards/auth.guards';
import { RegisterGuard } from './guards/register.guard';

// put guards in the routes which you want to protect ..
const routes :Routes = [
  {path:'' , component:DashboardComponent , canActivate:[AuthGuard] },
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent , canActivate : [RegisterGuard]},
  {path:'client/edit/:id' , component:EditClientComponent , canActivate:[AuthGuard]},
  {path:'client/add' , component:AddClientComponent ,canActivate:[AuthGuard]},
  {path:'settings' , component:SettingsComponent , canActivate:[AuthGuard]},
  {path:'client/:id' , component:ClientDetailsComponent , canActivate:[AuthGuard]},
// will match anything which not a actual route
  {path:'**' , component:NotFoundComponent},

]

@NgModule({
  exports: [RouterModule],
  providers: [AuthGuard ,RegisterGuard] , 
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
