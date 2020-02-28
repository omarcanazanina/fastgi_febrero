import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RetirarsaldoPage } from './retirarsaldo.page';

const routes: Routes = [
  {
    path: '',
    component: RetirarsaldoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RetirarsaldoPage]
})
export class RetirarsaldoPageModule {}
