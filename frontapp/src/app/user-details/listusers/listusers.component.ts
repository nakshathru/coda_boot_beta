import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { CreateuserComponent } from "../createuser/createuser.component";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-listusers",
  templateUrl: "./listusers.component.html",
  styleUrls: ["./listusers.component.scss"]
})
export class ListusersComponent implements OnInit {
  userlist: any;
  showTable = true;
  name: string;
  phone: string;

  constructor(public user: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.user.currentUsers.subscribe(data => {
      this.userlist = data;
      console.log(data);

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

  deleteUser(user) {
    this.user.deleteUser(user.id).then(() => {
      console.log("user deleted");
      this.user.listUsers();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event, "this one");
    console.log(event.previousContainer.data, event.previousIndex);
    this.deleteUser(this.userlist[event.previousIndex]);
    //  console.log(event);
  }
  checkDrag(event) {
    console.log("here starts");
  }
  dropCheck(event) {
    console.log(event);
  }
}
