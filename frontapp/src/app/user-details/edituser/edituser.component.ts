import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/shared-components/login/login.component';
import { ListusersComponent } from '../listusers/listusers.component';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

 
  userdata:any;
  editForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<ListusersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.userdata=data
      this.editForm = this.fb.group({
        name: ['', Validators.required],
        phone: '',
        place:''
      });
 
  }

  ngOnInit() {
  
    
  }

  editUser(){

  }

}
