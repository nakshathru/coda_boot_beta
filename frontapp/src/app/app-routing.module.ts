import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared-components/login/login.component';
import { CreateuserComponent } from './user-details/createuser/createuser.component';
import { EdituserComponent } from './user-details/edituser/edituser.component';
import { CreateproductComponent } from './product-details/createproduct/createproduct.component';
import { EditproductComponent } from './product-details/editproduct/editproduct.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createuser', component: CreateuserComponent},
  {path: 'edituser', component: EdituserComponent},
  {path: 'createproduct', component: CreateproductComponent},
  {path: 'editproduct', component: EditproductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
