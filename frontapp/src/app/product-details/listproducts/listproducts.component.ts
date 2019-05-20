import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { MatDialog } from "@angular/material";
import { CreateproductComponent } from "../createproduct/createproduct.component";
import { EditproductComponent } from "../editproduct/editproduct.component";

@Component({
  selector: "app-listproducts",
  templateUrl: "./listproducts.component.html",
  styleUrls: ["./listproducts.component.scss"]
})
export class ListproductsComponent implements OnInit {
  name: string;
  category: string;
  constructor(public product: ProductService, public dialog: MatDialog) {}
  productlist: any;
  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.product.listProducts().then(data => {
      console.log(data);
      this.productlist = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateproductComponent, {
      width: "500px",
      data: { name: this.name, category: this.category }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);

      if (result) {
        this.product
          .insertProduct(result.name, result.category, result.description)
          .then(() => {
            console.log("added product");
            this.getProductList();
          });
      }
    });
  }

  openDialogEdit(product): void {
    const dialogRef = this.dialog.open(EditproductComponent, {
      width: "500px",
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        this.product
          .editProduct(
            result.name,
            result.category,
            result.description,
            result.id
          )
          .then(() => {
            console.log("edited product");
            this.getProductList();
          });
      }
    });
  }

  deleteProduct(product) {
    this.product.deleteProduct(product.id).then(() => {
      this.getProductList();
    });
  }
}
