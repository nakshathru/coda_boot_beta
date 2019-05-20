import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  isUser: string;
  isAdmin = false;
  signupForm: FormGroup;
  constructor(private user: UserService, public router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      role: new FormControl(["user"]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onSubmit() {
    const requestForm = this.signupForm.value;
    requestForm.role = [this.signupForm.value.role];
    console.log(requestForm);
    this.user
      .signupUser(requestForm)
      .then(data => {
        console.log(data);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(["/"]);
      });
  }
  getErrorMessage(field) {
    switch (field) {
      case "email":
        return this.signupForm.get("email").hasError("required")
          ? "You must enter an email"
          : this.signupForm.get("email").hasError("email")
          ? "Not a valid email"
          : "";
        break;
      case "name":
        return this.signupForm.get("name").hasError("required")
          ? "You must enter a name"
          : this.signupForm.get("name").hasError("minlength")
          ? "Minimum 4 letter is required"
          : "";
        break;
      case "password":
        return this.signupForm.get("password").hasError("required")
          ? "No blank password"
          : this.signupForm.get("password").hasError("minlength")
          ? "Minimum 4 letter is required"
          : "";
        break;
      default:
        return null;
    }
  }
  ngOnInit() {}
  roleStatus(status) {
    console.log(status);
  }
}
