import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HomeComponent } from "src/app/home/home.component";

export interface DialogData {
  name: string;
  password: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  errors: any;
  createForm: FormGroup;
  responeError: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      password: ""
    });
    this.responeError = this.data;
  }

  ngOnInit() {
    this.errors = this.responeError.error;
  }

  signUp() {
    this.router.navigate(["/signup"]);
  }
}
