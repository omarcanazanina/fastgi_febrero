import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cobroqr',
  templateUrl: './cobroqr.page.html',
  styleUrls: ['./cobroqr.page.scss'],
})
export class CobroqrPage implements OnInit {
  qrData = "";
  createdCode = null;
  usuario = {
    cajainterna: "",
    telefono: "",
    nombre:""
  }
  uu: any;
  numero = 0
  num
  gruponum = [7, 8, 9,4, 5, 6,1, 2, 3,'.', 0]
   cont=0
   controlador = 0
   teclado=1
  constructor(private barcode: BarcodeScanner, private au: AuthService, private route: Router) { }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      if(this.usuario.nombre == ''){
        this.controlador = 0
      }else{
        this.controlador = 1
      }
    })
  }
  
  createCode() {
    if (this.qrData <= "" || this.qrData == '0' || this.qrData == '0.' || this.qrData == '.0' || this.qrData =='.' || this.qrData =='00' || this.qrData =='000'|| this.qrData =='0000'|| this.au.dos_decimales(this.qrData) !== true) {
        this.au.ingresoinvalido1()
        this.route.navigate(['/tabs/tab2/recibedinero'])
    } else {
      this.createdCode = this.qrData + "/" + this.usuario.telefono;
    }
    this.numero = 1
  }
  volver() {
    this.route.navigate(['/tabs/tab2/recibedinero'])
  }
  //funciones para el teclado
  presionar(num) {
    this.qrData = this.qrData + num
   if (num == '.') {
      this.cont = this.cont + 1
    } if (this.cont > 1) {
      this.qrData = ""
      this.cont = 0
    }
  }

  borrar() {
    this.qrData = this.qrData.substring(0, this.qrData.length - 1)
  }
  //este no esta funcionando
  ocultar() {
    this.teclado = 0
  }
  label() {
    this.teclado = 1
  }
}
