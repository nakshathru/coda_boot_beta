import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListusersComponent } from './listusers/listusers.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule, 
  MatDividerModule, 
  MatSnackBarModule } from '@angular/material';
import { CreateuserComponent } from './createuser/createuser.component';
import { EdituserComponent } from './edituser/edituser.component';
@NgModule({
  declarations: [ListusersComponent, CreateuserComponent, EdituserComponent],
  imports: [
    CommonModule,
    MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule, 
  MatDividerModule, 
  MatSnackBarModule,
  MatToolbarModule,
  MatDialogModule,
  ReactiveFormsModule,
  FormsModule

  ],
  exports:[
    ListusersComponent
  ]
})
export class UserDetailsModule { }
