import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from "primeng/table";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { CsvuploadComponent } from "./csvupload/csvupload.component";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
import { RippleModule } from "primeng/ripple";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import {CarouselModule} from 'primeng/carousel';
import {SelectButtonModule} from 'primeng/selectbutton';

@NgModule({
  declarations: [AppComponent, AboutusComponent, CsvuploadComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    RippleModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ToastModule,
    CarouselModule,
    SelectButtonModule
  ],
  providers: [MessageService, PrimeNGConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
