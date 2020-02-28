import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagarenviocobroPage } from './pagarenviocobro.page';

const routes: Routes = [
  {
    path: '',
    component: PagarenviocobroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagarenviocobroPage]
})
export class PagarenviocobroPageModule {}
