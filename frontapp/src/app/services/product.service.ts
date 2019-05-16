import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private restClient:RestService) { }

  listProducts(){
    return new Promise((resolve, reject) => {
      this.restClient.get({ hasAuth: false,isProduct:true, url: 'products/'}).subscribe((data) => {
        resolve(data);
           },
        (err) => { reject(err); }
      );
    });
  }
  insertProduct(name,category,description){
      const product = {
        name: name,
        category: category,
        description: description
      };
      return new Promise((resolve, reject) => {
        this.restClient.post({ hasAuth: false,isProduct:true,url: 'products/',payload:product}).subscribe((data) => {
          resolve(data);
             },
          (err) => { reject(err); }
        );
      });

  }
  editProduct(name,category,description,id){
    const product = {
      name: name,
      category: category,
      description: description
    };
    return new Promise((resolve, reject) => {
      this.restClient.put({ hasAuth: false,isProduct:true,url: 'products/'+id,payload:product}).subscribe((data) => {
        resolve(data);
           },
        (err) => { reject(err); }
      );
    });
  }
  deleteProduct(id){
    return new Promise((resolve, reject) => {
      this.restClient.delete({ hasAuth:false,isProduct:true,url: 'products/'+id}).subscribe((data) => {
        resolve(data);
           },
        (err) => { reject(err); }
      );
    });
  }
}
