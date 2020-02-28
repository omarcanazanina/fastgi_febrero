import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-ingresoegreso',
  templateUrl: './ingresoegreso.page.html',
  styleUrls: ['./ingresoegreso.page.scss'],
})
export class IngresoegresoPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(private au: AuthService) { }
  usuario = {
    cajainterna: "",
    nombre: "",
    fecha: "",
    id: ""
  }
  uu: any;
  cajareal: number
  nombre: string
  ocultara = 0
  dato1: any = []
  dato: string
  dato2: string
  cuentas: any = []
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.cajareal = parseFloat(this.usuario.cajainterna)
      this.nombre = this.usuario.nombre
    })
    this.au.recuperatarjeta(this.uu).subscribe(data => {
      this.dato1 = data;
      if (this.dato1.length > 0) {
        this.dato = data[0].numerito;
      } else {
        this.dato = "a"
      }
    })
    this.au.recuperacuenta(this.uu).subscribe(datos => {
      this.cuentas = datos;
      if (this.cuentas.length > 0) {
        this.dato2 = datos[0].cuenta;
      } else {
        this.dato2 = "b"
      }
    })
  }
}
