import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputValueComponent} from "../components/input-value/input-value.component";
import {ImagePageComponent} from "../pages/image-page/image-page.component";
import {HttpClientModule} from "@angular/common/http";
import {InfoComponent} from "../components/info/info.component";
import {ActiveElemDirective} from "../directives/active-elem.directive";

const components = [
  InputValueComponent,
  ImagePageComponent,
  InfoComponent,
  ActiveElemDirective
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ...components
  ],
})
export class ImageModule { }
