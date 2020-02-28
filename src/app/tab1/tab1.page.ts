import { Component, OnInit } from '@angular/core';
import { AuthService, actualizado } from '../servicios/auth.service'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  cobros: any = []
  clave: any = []
  actualizado: any = []
  constructor(private au: AuthService) {
  }
  usuario = {
    nombre: ""
  }
  uu: any;
  todo: any = []
  numero = 0
  transferencias:any=[]
  unidos:any=[]
  ordenado:any=[]
  badge:any=[]
  ngOnInit() {
   /* this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.ordenartransferencias(this.uu).subscribe(datos =>{
      this.transferencias=datos
    })
    this.au.recuperaprueba(this.uu).subscribe(cobros => {
      this.cobros = cobros
      console.log(this.cobros);
      
      this.unidos =[].concat(this.transferencias,this.cobros)
      this.ordenado=this.au.ordenarjson(this.unidos,'fecha','desc')

         this.ordenado.forEach(element => {
           this.clave.push(element.clave)
         });
         this.todo = Array.from(new Set(this.clave))
      
         this.todo.forEach(element => {
           this.actualizado.push({ 'id': element })
         });
         this.actualizado.forEach(element => {
           this.ordenado.forEach(element1 => {
             if (element.id == element1.clave) {
               element['nombre'] = element1.nombre
             }
           });
         })
  
    })*/
   

  }

}
