import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ModalController } from '@ionic/angular';
import { DetalleingresoegresoPage } from '../detalleingresoegreso/detalleingresoegreso.page';
import { DetalleegresoPage } from '../detalleegreso/detalleegreso.page';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  constructor(private au: AuthService, 
    public modalController: ModalController) { }

  usuario = {
    cajainterna: "",
    nombre: "",
    monto: ""
  }
  uu: any;
  consulta: any = []
  ingreso = 0
  ingreso1: any
  datito: any = []
  nuevo: any = []
  ordenado: any = []
  egreso = 0
  egreso1: any
  balance = 0
  balance1: any
  // fecha
 // fecha=new Date()
 movimientos :any = "balance"

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.ordenaringresos(this.uu).subscribe(dato => {
      this.consulta = dato;
      this.ingreso = 0;
      dato.forEach(element => {
        this.ingreso = this.ingreso + parseFloat(element.monto)
        this.ingreso1 = this.ingreso.toFixed(2)
      });
      this.au.ordenaregresos(this.uu).subscribe(datos => {
        this.datito = datos;
        this.nuevo = [].concat(this.consulta, this.datito);
        this.ordenado = this.au.ordenarjson(this.nuevo, 'fecha', 'desc')
        this.movimientos = "balance"
        this.egreso = 0;
        datos.forEach(element => {
          this.egreso = this.egreso + parseFloat(element.monto)
          this.egreso1 = this.egreso.toFixed(2)
        });
        this.balance = this.ingreso - this.egreso
        this.balance1 = this.balance.toFixed(2)
      }) 
    })
  }

  fechaChange(fechita){
    console.log(fechita.detail.value);
    //console.log(fechita.getUTCMonth());
    
  }
  async detalleingresoegreso(usu) {
    const modal = await this.modalController.create({
      component: DetalleingresoegresoPage,
      cssClass: 'detalleingresoegreso',
      componentProps: {
        usu: usu
      }
    });
    return await modal.present();
  }
  async detalleegreso(usu) {
    const modal = await this.modalController.create({
      component: DetalleegresoPage,
      //showBackdrop: false,
      cssClass: 'detalleegreso',
      componentProps: {
        usu: usu
      }
    });
    return await modal.present();
  }


}
