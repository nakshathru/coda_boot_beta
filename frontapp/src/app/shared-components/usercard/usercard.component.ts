import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material";
import { EdituserComponent } from "../../user-details/edituser/edituser.component";

@Component({
  selector: "app-usercard",
  templateUrl: "./usercard.component.html",
  styleUrls: ["./usercard.component.scss"]
})
export class UsercardComponent implements OnInit {
  @Input() userDetails: any;
  constructor(private user: UserService, public dialog: MatDialog) {}

  ngOnInit() {}

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
}
