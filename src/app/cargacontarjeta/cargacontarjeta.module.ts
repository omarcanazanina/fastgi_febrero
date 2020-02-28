import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CargacontarjetaPage } from './cargacontarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: CargacontarjetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CargacontarjetaPage]
})
export class CargacontarjetaPageModule {}
