import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImagePageComponent} from "./pages/image-page/image-page.component";

const routes: Routes = [
  {
    path: '',
    component: ImagePageComponent
  },
  {
    path: '**',
    component: ImagePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
