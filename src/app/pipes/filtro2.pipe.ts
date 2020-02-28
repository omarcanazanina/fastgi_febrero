import { Pipe, PipeTransform } from '@angular/core';
import { Platform } from '@ionic/angular';

@Pipe({
  name: 'filtro2'
})
export class Filtro2Pipe implements PipeTransform {
  constructor(private platform: Platform){}
  transform(arreglo: any[], texto: string): any[] {
    if(texto ===''){
      return []
    }
    texto=texto.toLowerCase()
      if(this.platform.is('ios')){
        return arreglo.filter(item =>{
          return item.name.givenName.toLowerCase()
                .includes(texto) 
              })
      }else{
        return arreglo.filter(item =>{
          return item.nombre.toLowerCase()
         // return item.name.formatted.toLowerCase()
                .includes(texto) 
        })
      }
    
  } 

}
