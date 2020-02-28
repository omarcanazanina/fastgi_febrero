import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AlertController, IonContent } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular'
import { DetalleenviocobroPage } from '../detalleenviocobro/detalleenviocobro.page'
import { FcmService } from '../servicios/fcm.service';
import { Confirmacion1Page } from '../confirmacion1/confirmacion1.page';

@Component({
  selector: 'app-pagarenviocobro',
  templateUrl: './pagarenviocobro.page.html',
  styleUrls: ['./pagarenviocobro.page.scss'],
})
export class PagarenviocobroPage implements OnInit {
  @ViewChild('input', { static: true }) myInput;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  controladorteclado = 0
  gruponum = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
  cont1 = 0
  pin = ""
  estado = true
  uu: any
  //cobro: any = []
  usuario = {
    nombre: "",
    cajainterna: "",
    uid: "",
    password: "",
    telefono: "",
  }
  cobrador: any = []
  fecha: Date
  fechita: any
  actual: any = []
  trans: any = []
  numero = null
  nombresito = null
  caja: number
  caja1: any
  monto
  detalle
  numerosincodigo
  ruta = (['/tabs/tab2/ingresoegreso'])
  controldecimal
  nombrebd
  nombrebd1
  constructor(private activatedRoute: ActivatedRoute,
    private au: AuthService,
    public alertController: AlertController,
    public fire: AngularFirestore,
    public router: Router,
    public modal: ModalController,
    private fcm: FcmService,
    public route: Router,
    public modalController: ModalController) {

  }
  callFunction(es) {
    if (es) {
      this.content.scrollToBottom(2000);
    }
  }
  ionViewDidEnter() {
    this.ScrollToBottom()
  }
  ngOnInit() {

    this.numero = this.activatedRoute.snapshot.paramMap.get('id')
    this.nombresito = this.activatedRoute.snapshot.paramMap.get('nombre')
    //quitamos el codigo +591
    this.numerosincodigo = this.numero.replace("+591", "").trim()
    this.au.verificausuarioActivo(this.numerosincodigo).subscribe(cont => {
      this.cobrador = cont[0]
      this.uu = this.au.pruebita();
      this.au.recuperaundato(this.uu).subscribe(usuario => {
        this.usuario = usuario;
        let a= this.au.recupera_nombre_contacto(this.cobrador.telefono,this.usuario.uid).subscribe( nombredato =>{
          this.nombrebd = nombredato[0].nombre
          a.unsubscribe()
        })
        this.caja = parseFloat(this.usuario.cajainterna)
        this.caja1 = this.caja.toFixed(2)
        this.au.recuperacobrostransferencias(this.cobrador.uid, this.usuario.uid).subscribe(dat => {
          this.trans = dat
          this.actual = this.au.ordenarjson(this.trans, 'fecha', 'asc')
        })
      })
    })
  }

  //abrir detalle del cobro a apgar
  opendetalle(usu) {
    this.modal.create({
      component: DetalleenviocobroPage,
      cssClass: 'detalleenviocobro',
      componentProps: {
        usu: usu
      }
    }).then((modal) => modal.present())
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1);
  }

  //funcion enviar cobro
  enviacobro(detalle) {
    if (this.pin == '' && detalle == undefined) {
      this.au.datosincorrectos()
    } else {
      if (detalle == undefined) {
        this.au.datosincorrectos()
      } else {
        let a= this.au.recupera_nombre_contacto(this.usuario.telefono,this.cobrador.uid).subscribe( nombredato =>{
          this.nombrebd1 = nombredato[0].nombre
        
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
        this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
          monto: this.pin,
          dato: 'enviado',
          clave: this.cobrador.uid,
          formatted: this.nombrebd,
          telefono: this.cobrador.telefono,
          fechita: this.fechita,
          fecha: this.fecha,
          fechapago: '',
          detalle: detalle,
          estado: 0
        })
        this.fire.collection('/user/' + this.cobrador.uid + '/cobrostransferencias').add({
          monto: this.pin,
          dato: 'recibio',
          clave: this.usuario.uid,
          formatted: this.nombrebd1,
          telefono: this.usuario.telefono,
          fechita: this.fechita,
          fecha: this.fecha,
          fechapago: '',
          detalle: detalle,
          estado: 0
        })
        this.au.enviocobro(this.pin, this.nombrebd)
        this.fcm.notificacionforToken("Fastgi", "Acaba de recibir una solicitud de pago de " + this.pin + "Bs. de " + this.nombrebd1 + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
        this.monto = ''
        this.detalle = ''
        a.unsubscribe()
      })
      }
    }
    //

  }
  // funcion pagar deuda 
  async pagar1(usu) {
    if (parseInt(this.usuario.password) == 0) {
      this.au.enviocorreo1(this.usuario.uid, this.usuario.telefono)
    } else {
      if (parseFloat(this.usuario.cajainterna) >= parseFloat(usu.monto)) {
        const modal = await this.modalController.create({
          component: Confirmacion1Page,
          // cssClass: 'confirmarpago',
          componentProps: {
            usu_pagodeuda: usu,
            usuario_pagodeuda: this.usuario,
            cobrador_pagodeuda: this.cobrador,
            nombreusuario:this.nombrebd1,
            nombrecobrador:this.nombrebd
          }
        });
        return await modal.present();
      } else {
        this.au.ahorroinsuficiente1(this.ruta);
      }
    }
  }
  // funcion hacer transferencia
  async confirmacion1(detalle) {
    // let c = this.pin.indexOf('.')
    // console.log(c);
    // this.controldecimal=this.pin.substring(c +1,this.pin.length)
    // console.log(this.controldecimal);
    // if(this.control){

    // }
    if (parseInt(this.usuario.password) == 0) {
      this.au.enviocorreo1(this.usuario.uid, this.usuario.telefono)
    } else {
      if (parseFloat(this.usuario.cajainterna) >= parseFloat(this.pin)) {
        const modal = await this.modalController.create({
          component: Confirmacion1Page,
          cssClass: 'confirmacion1',
          componentProps: {
            usuario_transferencia: this.usuario,
            cobrador_transferencia: this.cobrador,
            monto_transferencia: this.pin,
            detalle_transferencia: detalle,
            name_transferencia: this.nombrebd
          }
        });
        modal.present();

      } else {
        this.au.ahorroinsuficiente1(this.ruta);
      }
    }
  }

  //para el teclado en campo monto
  teclado() {
    this.controladorteclado = 1
  }
  presionar(num) {
    this.pin = this.pin + num
    if (num == '.') {
      this.cont1 = this.cont1 + 1
    } if (this.cont1 > 1) {
      this.pin = ""
      this.cont1 = 0
    }
  }

  borrar() {
    this.pin = this.pin.substring(0, this.pin.length - 1)
  }
  ok() {
    if (parseFloat(this.pin) == 0) {
      this.au.ingresoinvalido()
    } else {
      let a = this.au.dos_decimales(this.pin)
      if (a == true) {
        this.controladorteclado = 0
        setTimeout(() => {
          this.myInput.setFocus();
        }, 150)
      } else {
        this.au.ingresoinvalido1()
      }
    }



  }
  ocultar() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150)
    this.controladorteclado = 0
  }

}
