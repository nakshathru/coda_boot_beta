import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { UserService } from "src/app/services/user.service";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  status = "Login";
  name: string;
  phone: string;
  errorMessage: any;
  jwt: any;
  constructor(public dialog: MatDialog, private user: UserService) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      this.status = "Logout";
    }
  }

  userStatus(status) {
    if (status === "Login") {
      this.openDialog();
    } else if (status === "Logout") {
      localStorage.removeItem("currentUser");
      this.status = "Login";
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "500px",
      disableClose: true,
      data: { error: this.errorMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        this.user
          .signIn(result.name, result.password)
          .then(data => {
            console.log(data);
            this.jwt = data;
            localStorage.setItem(
              "currentUser",
              JSON.stringify({ token: this.jwt.token })
            );
            console.log("signed in user");
            this.status = "Logout";
            this.user.listUsers();
          })
          .catch(e => {
            console.log(e, "here");
            this.errorMessage = e.error.errors;
            if (!this.errorMessage) {
              const error = [];
              error.push({
                defaultMessage: "Invalid Credentials! Try again :("
              });
              this.errorMessage = error;
            }
            this.openDialog();
          });
      }
    });
  }
}
