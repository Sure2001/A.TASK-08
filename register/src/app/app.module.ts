import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  declarations: [AppComponent, UserRegisterComponent, UserTableComponent],
  imports: [ BrowserAnimationsModule,BrowserModule, FormsModule,ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

