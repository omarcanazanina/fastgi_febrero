import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Confirmacion1Page } from './confirmacion1.page';

const routes: Routes = [
  {
    path: '',
    component: Confirmacion1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Confirmacion1Page]
})
export class Confirmacion1PageModule {}
