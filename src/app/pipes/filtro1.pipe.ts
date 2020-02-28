import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro1'
})
export class Filtro1Pipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    if(texto ===''){
      return arreglo
    }
    texto=texto.toLowerCase()
        return arreglo.filter(item =>{
          return item.nombre.toLowerCase()
                .includes(texto) 
              })
  } 

}
