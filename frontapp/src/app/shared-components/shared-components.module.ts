import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
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
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [HeaderComponent, LoginComponent, SignupComponent],
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
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  exports: [HeaderComponent]
})
export class SharedComponentsModule {}
