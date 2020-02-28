import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmacargasaldoPage } from './confirmacargasaldo.page';
import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '',
    component: ConfirmacargasaldoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmacargasaldoPage]
})
export class ConfirmacargasaldoPageModule {}
