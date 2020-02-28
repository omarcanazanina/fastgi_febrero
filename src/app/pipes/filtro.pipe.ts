import { Pipe, PipeTransform } from '@angular/core';
import { Platform } from '@ionic/angular';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  constructor(private platform: Platform){}

  transform(arreglo: any[], texto: string): any[] {
    if(texto ===''){
      return arreglo
    }
    texto=texto.toLowerCase()
      if(this.platform.is('ios')){
        return arreglo.filter(item =>{
          return item.name.givenName.toLowerCase()
                .includes(texto) 
              })
      }else{
        return arreglo.filter(item =>{
          //return item.name.formatted.toLowerCase()
          return item.nombre.toLowerCase()
                .includes(texto) 
        })
      }
    
  } 
}  
