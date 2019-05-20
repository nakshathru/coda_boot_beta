import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../shared-components/login/login.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  AfterViewInit {

userlist: any;
name: string;
phone: string;
errorMessage: any;
jwt: any;

  constructor(public dialog: MatDialog, private user: UserService) { }


  ngAfterViewInit() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      setTimeout(() => {
        this.openDialog();
      }, 1000);
    } else {
      this.user.listUsers();

    }


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      disableClose: true,
     data: {error: this.errorMessage}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.user.signIn(result.name, result.password)
        .then((data) => {
          console.log(data, 'its here');
          this.jwt = data;
          localStorage.setItem('currentUser', JSON.stringify({ token: this.jwt.token }));
          console.log('signed in user');
          this.user.listUsers();
        })
        .catch((e) => {
          console.log(e, 'here');
          if (e.error) {
            this.errorMessage = e.error.errors;
            if (!this.errorMessage) {
              const error = [];
              error.push({defaultMessage: 'Invalid Credentials! Try again :('});
              this.errorMessage = error;
            }
          }
          this.openDialog();



        });
      }



    });
  }



}
