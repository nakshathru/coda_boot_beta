import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListusersComponent } from "./listusers/listusers.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule
} from "@angular/material";
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { CreateuserComponent } from "./createuser/createuser.component";
import { EdituserComponent } from "./edituser/edituser.component";
import { SharedComponentsModule } from '../shared-components/shared-components.module';
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
    FormsModule,
    SharedComponentsModule,
    DragDropModule
  ],
  exports: [ListusersComponent]
})
export class UserDetailsModule {}
