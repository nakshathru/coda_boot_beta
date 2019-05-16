import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { RestService } from './services/rest.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
    UserDetailsModule,
    ProductDetailsModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [UserService,
              ProductService,
              RestService,
              /*
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true
              }
               */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
