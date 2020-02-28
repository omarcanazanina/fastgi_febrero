import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { Filtro1Pipe } from './filtro1.pipe';
import { Filtro2Pipe } from './filtro2.pipe';



@NgModule({
  declarations: [FiltroPipe, Filtro1Pipe, Filtro2Pipe],
  exports: [FiltroPipe,Filtro1Pipe,Filtro2Pipe]
})
export class PipesModule { }
