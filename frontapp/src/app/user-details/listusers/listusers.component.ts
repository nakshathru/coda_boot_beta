import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/services/user.service";
import { CreateuserComponent } from "../createuser/createuser.component";
import { EdituserComponent } from "../edituser/edituser.component";

@Component({
  selector: "app-listusers",
  templateUrl: "./listusers.component.html",
  styleUrls: ["./listusers.component.scss"]
})
export class ListusersComponent implements OnInit {
  userlist: any;
  showTable = false;
  name: string;
  phone: string;
  constructor(public user: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.user.currentUsers.subscribe(data => {
      this.userlist = data;
      if (this.userlist[0]) {
        this.showTable = true;
      } else {
        this.showTable = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateuserComponent, {
      width: "500px",
      data: { name: this.name, phone: this.phone }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        this.user
          .insertUser(result.name, result.phone, result.place)
          .then(() => {
            console.log("added user");
            this.user.listUsers();
          });
      }
    });
  }

  openDialogEdit(user): void {
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: "500px",
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        this.user
          .editUser(result.name, result.phone, result.location, result.id)
          .then(() => {
            console.log("edited user");
            this.user.listUsers();
          });
      }
    });
  }

  editUser(user) {
    this.openDialogEdit(user);
  }
  deleteUser(user) {
    this.user.deleteUser(user.id).then(() => {
      console.log("user deleted");
      this.user.listUsers();
    });
  }
}
