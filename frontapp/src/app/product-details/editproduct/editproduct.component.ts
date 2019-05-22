import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "../../shared-components/login/login.component";
import { ListproductsComponent } from "../listproducts/listproducts.component";

@Component({
  selector: "app-editproduct",
  templateUrl: "./editproduct.component.html",
  styleUrls: ["./editproduct.component.scss"]
})
export class EditproductComponent implements OnInit {
  productdata: any;
  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ListproductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.productdata = data;
    this.editForm = this.fb.group({
      name: ["", Validators.required],
      category: "",
      description: ""
    });
  }

  ngOnInit() {}

  editProduct(product) {}
}
