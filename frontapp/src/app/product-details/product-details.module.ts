import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListproductsComponent } from './listproducts/listproducts.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
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
@NgModule({
  declarations: [ListproductsComponent, EditproductComponent, CreateproductComponent],
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  exports: [
ListproductsComponent,
EditproductComponent,
CreateproductComponent

  ]
})
export class ProductDetailsModule { }
