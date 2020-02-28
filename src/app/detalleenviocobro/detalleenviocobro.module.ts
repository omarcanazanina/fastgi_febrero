import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleenviocobroPage } from './detalleenviocobro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleenviocobroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  //declarations: [DetalleenviocobroPage]
})
export class DetalleenviocobroPageModule {}
