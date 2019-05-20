import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ListproductsComponent } from "../listproducts/listproducts.component";
export interface DialogData {
  name: string;
  category: string;
  description;
}
@Component({
  selector: "app-createproduct",
  templateUrl: "./createproduct.component.html",
  styleUrls: ["./createproduct.component.scss"]
})
export class CreateproductComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ListproductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      category: "",
      description: ""
    });
  }

  ngOnInit() {}

  addUser(name) {}
}
