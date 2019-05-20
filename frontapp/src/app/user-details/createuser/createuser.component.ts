import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListusersComponent } from '../listusers/listusers.component';
export interface DialogData {
  name: string;
  phone: string;
}
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  createForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              public dialogRef: MatDialogRef<ListusersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      phone: '',
      place: ''
    });
  }

  ngOnInit() {
  }

  addUser(name) {


  }

}
