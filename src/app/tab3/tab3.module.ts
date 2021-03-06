import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ModalperfilPage } from '../modalperfil/modalperfil.page';
import { ModalperfilPageModule } from '../modalperfil/modalperfil.module';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  entryComponents:[
    ModalperfilPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ModalperfilPageModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    ImageCropperModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {


  
}
