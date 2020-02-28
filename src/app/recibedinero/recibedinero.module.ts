import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecibedineroPage } from './recibedinero.page';
import {NgxQRCodeModule} from 'ngx-qrcode2';
const routes: Routes = [
  {
    path: '',
    component: RecibedineroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
  ],
  declarations: [RecibedineroPage]
})
export class RecibedineroPageModule {}
