import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmaretirosaldoPage } from './confirmaretirosaldo.page';
import { CustomFormsModule } from 'ng2-validation';
import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '',
    component: ConfirmaretirosaldoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    CustomFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmaretirosaldoPage]
})
export class ConfirmaretirosaldoPageModule {}
