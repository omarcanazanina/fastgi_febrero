import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FcmService } from '../servicios/fcm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion1',
  templateUrl: './confirmacion1.page.html',
  styleUrls: ['./confirmacion1.page.scss'],
})
export class Confirmacion1Page implements OnInit {
  //para el telado
  controladorteclado = 1
  gruponum = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
  cont = 0
  pin = ""

  //datos recibidos de (pagarenviocobro)
  usuario_transferencia: any = []
  cobrador_transferencia: any = []
  monto_transferencia: any
  detalle_transferencia: any
  name_transferencia: string

  cajaactual_transferencia: number//cobrador
  cajaactual1_transferencia: any//cobrador
  cajainterna_transferencia: number//usuario
  cajainterna1_transferencia: any//usuario
  nombrenotificaciont: any

  // datos recibidos de (cards)
  usuario_sinmonto: any = []
  contelefono_sinmonto: any = []
  monto_sinmonto: any
  name_sinmonto: any

  cajaactual_sinmonto: number
  cajaactual1_sinmonto: any
  cajaresta_sinmonto: number
  cajaresta1_sinmonto: any
  nombrenotificacions: any
  //datos recibidos de (escaner)
  usuario_conmonto: any = []
  contelefono_conmonto: any = []
  monto_conmonto: any
  name_conmonto: any

  cajaactual_conmonto: number;
  cajaactual1_conmonto: any
  cajaresta_conmonto: number;
  cajaresta1_conmonto: any
  real_conmonto: number;
  nombrenotificacionc: any
  //datos recibidos para pagar cobro (pagarenviocobro)
  usuario_pagodeuda: any = []
  cobrador_pagodeuda: any = []
  usu_pagodeuda: any = []
  nombreusuario:any
  nombrecobrador:any

  cajaactual_pagodeuda: number
  cajaactual1_pagodeuda: any
  cajainterna_pagodeuda: number
  cajainterna1_pagodeuda: any
  estado_pagodeuda = true
  //datos para rescatar la fecha
  fecha: Date
  fechita: any

  //varios
  ruta = (['/tabs/tab2/ingresoegreso'])
  badgeactual: number
  otrobadge = 0
  constructor(private modal: ModalController,
    private au: AuthService,
    public fire: AngularFirestore,
    private fcm: FcmService,
    private route: Router) { }

  ngOnInit() {
    this.real_conmonto = parseFloat(this.monto_conmonto)

    // this.au.recupera_nombre_contacto(this.usuario_conmonto.telefono, this.contelefono_conmonto.uid).subscribe(nombredato => {
    //   this.nombrenotificacionc= nombredato[0].nombre
    // })

  }
  //cerrar modal
  closeUsuario() {
    this.modal.dismiss()
  }
  //funciones para el teclado
  presionar(num) {
    this.pin = this.pin + num
    if (num == '.') {
      this.cont = this.cont + 1
    } if (this.cont > 1) {
      this.pin = ""
      this.cont = 0
    }
  }

  borrar() {
    this.pin = this.pin.substring(0, this.pin.length - 1)
  }

  ocultar() {
    this.controladorteclado = 0
  }
  label() {
    this.controladorteclado = 1
  }
  //

  funciones(pin) {
    if (this.usuario_transferencia != "") {
     let b = this.au.recupera_nombre_contacto(this.usuario_transferencia.telefono, this.cobrador_transferencia.uid).subscribe(nombredato => {
        this.nombrenotificaciont = nombredato[0].nombre

        if (parseFloat(this.usuario_transferencia.cajainterna) >= this.monto_transferencia) {
          this.fecha = new Date();
          const mes = this.fecha.getMonth() + 1;
          this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
          if (this.monto_transferencia == 0) {
            this.au.ingresoinvalido()
          } else {
            if (pin == this.usuario_transferencia.password) {
              this.cajaactual_transferencia = parseFloat(this.cobrador_transferencia.cajainterna) + parseFloat(this.monto_transferencia);
              this.cajaactual1_transferencia = this.cajaactual_transferencia.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajaactual1_transferencia }, this.cobrador_transferencia.uid);
              this.fire.collection('/user/' + this.cobrador_transferencia.uid + '/ingresos').add({
                monto: this.monto_transferencia,
                id: this.usuario_transferencia.uid,
                nombre: this.nombrenotificaciont,
                telefono: this.usuario_transferencia.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'transferencia',
                saldo: this.cajaactual1_transferencia,
                identificador: '1'
              })
              this.cajainterna_transferencia = parseFloat(this.usuario_transferencia.cajainterna) - this.monto_transferencia;
              this.cajainterna1_transferencia = this.cajainterna_transferencia.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajainterna1_transferencia }, this.usuario_transferencia.uid)
              this.fire.collection('/user/' + this.usuario_transferencia.uid + '/egreso').add({
                monto: this.monto_transferencia,
                id: this.cobrador_transferencia.uid,
                nombre: this.name_transferencia,// this.nombresito,
                telefono: this.cobrador_transferencia.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'transferencia',
                saldo: this.cajainterna1_transferencia,
                identificador: '0'
              })
              this.fire.collection('/user/' + this.usuario_transferencia.uid + '/cobrostransferencias').add({
                dato: 'enviatransferencia',
                monto: this.monto_transferencia,
                detalle: this.detalle_transferencia,
                clave: this.cobrador_transferencia.uid,
                formatted: this.name_transferencia,//this.nombresito,
                telefono: this.cobrador_transferencia.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                saldo: this.cajainterna1_transferencia,
                estadobadge: false
              })

              this.fire.collection('/user/' + this.cobrador_transferencia.uid + '/cobrostransferencias').add({
                dato: 'recibetransferencia',
                monto: this.monto_transferencia,
                detalle: this.detalle_transferencia,
                clave: this.usuario_transferencia.uid,
                formatted: this.nombrenotificaciont,
                telefono: this.usuario_transferencia.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                saldo: this.cajaactual1_transferencia,
                estadobadge: false
              })
              this.au.transexitoso1(this.monto_transferencia, this.name_transferencia); //this.nombresito);
              this.fcm.notificacionforToken("Fastgi", "Acaba de recibir una tranferencia de " + this.monto_transferencia + "Bs. de " + this.nombrenotificaciont + " ", this.cobrador_transferencia.token, this.usuario_transferencia.uid, "/tabs/tab2")
              this.modal.dismiss();
              this.badgeactual = this.cobrador_transferencia.badge + 1
              // console.log(this.badgeactual);
              this.au.actualizabadge({ badge: this.badgeactual }, this.cobrador_transferencia.uid);
            } else {
              this.au.passincorrecta();
            }
          }
        } else {
          this.au.ahorroinsuficiente1(this.ruta);
          this.closeUsuario()
        }
        b.unsubscribe()
      })
    } else {
      //funcion pago con monto (qr)
      if (this.usuario_conmonto != "") {
        let c = this.au.recupera_nombre_contacto(this.usuario_conmonto.telefono, this.contelefono_conmonto.uid).subscribe(nombredato => {
          this.nombrenotificacionc = nombredato[0].nombre
        
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

        if (pin == this.usuario_conmonto.password) {
          this.cajaactual_conmonto = parseFloat(this.contelefono_conmonto.cajainterna) + this.real_conmonto;
          this.cajaactual1_conmonto = this.cajaactual_conmonto.toFixed(2)
          this.au.actualizacaja({ cajainterna: this.cajaactual1_conmonto }, this.contelefono_conmonto.uid);
          this.fire.collection('/user/' + this.contelefono_conmonto.uid + '/ingresos').add({
            monto: this.real_conmonto,
            id: this.usuario_conmonto.uid,
            nombre: this.nombrenotificacionc,
            telefono: this.usuario_conmonto.telefono,
            fechita: this.fechita,
            fecha: this.fecha,
            descripcion: 'pago por lectura',
            saldo: this.cajaactual_conmonto,
            identificador: '1'
          })
          this.cajaresta_conmonto = parseFloat(this.usuario_conmonto.cajainterna) - this.real_conmonto;
          this.cajaresta1_conmonto = this.cajaresta_conmonto.toFixed(2)
          this.au.actualizacaja({ cajainterna: this.cajaresta1_conmonto }, this.usuario_conmonto.uid);
          this.fire.collection('/user/' + this.usuario_conmonto.uid + '/egreso').add({
            monto: this.real_conmonto,
            id: this.contelefono_conmonto.uid,
            nombre: this.name_conmonto,
            telefono: this.contelefono_conmonto.telefono,
            fechita: this.fechita,
            fecha: this.fecha,
            descripcion: 'pago por lectura',
            saldo: this.cajaresta_conmonto,
            identificador: '0'
          })
          this.au.presentToast(this.real_conmonto, this.name_conmonto);
          this.fcm.notificacionforToken("Fastgi", " prueba scan Acaba de recibir el pago de  " + this.real_conmonto + "Bs. de " + this.nombrenotificacionc + " ", this.contelefono_conmonto.token, this.usuario_conmonto.uid, "/tabs/tab2")
          this.closeUsuario()
          this.route.navigate(['tabs/tab2'])
        }
        else {
          this.au.passincorrecta();
        }
        c.unsubscribe()
      })
      } else {
        //funcion de pagar sin monto (QR)
        if (this.usuario_sinmonto != "") {
          let a = this.au.recupera_nombre_contacto(this.usuario_sinmonto.telefono, this.contelefono_sinmonto.uid).subscribe(nombredato => {
            this.nombrenotificacions = nombredato[0].nombre

            this.fecha = new Date();
            const mes = this.fecha.getMonth() + 1;
            this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
            if (pin == this.usuario_sinmonto.password) {
              this.cajaactual_sinmonto = parseFloat(this.contelefono_sinmonto.cajainterna) + parseFloat(this.monto_sinmonto);
              this.cajaactual1_sinmonto = this.cajaactual_sinmonto.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajaactual1_sinmonto }, this.contelefono_sinmonto.uid);
              this.fire.collection('/user/' + this.contelefono_sinmonto.uid + '/ingresos').add({
                monto: this.monto_sinmonto,
                fecha: this.fecha,
                fechita: this.fechita,
                descripcion: 'pago',
                id: this.usuario_sinmonto.uid,
                nombre: this.nombrenotificacions,
                telefono: this.usuario_sinmonto.telefono,
                identificador: '1',
                saldo: this.cajaactual_sinmonto
              })
              this.cajaresta_sinmonto = parseFloat(this.usuario_sinmonto.cajainterna) - parseFloat(this.monto_sinmonto);
              this.cajaresta1_sinmonto = this.cajaresta_sinmonto.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajaresta1_sinmonto }, this.usuario_sinmonto.uid);
              this.fire.collection('/user/' + this.usuario_sinmonto.uid + '/egreso').add({
                monto: this.monto_sinmonto,
                id: this.contelefono_sinmonto.uid,
                nombre: this.name_sinmonto,
                telefono: this.contelefono_sinmonto.telefono,
                fecha: this.fecha,
                fechita: this.fechita,
                descripcion: 'pago',
                saldo: this.cajaresta_sinmonto,
                identificador: '0'
              })
              this.au.presentToast(this.monto_sinmonto, this.name_sinmonto);
              this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de " + this.monto_sinmonto + "Bs. de " + this.nombrenotificacions + " ", this.contelefono_sinmonto.token, this.usuario_sinmonto.uid, "/tabs/tab2")
              this.closeUsuario()
              this.route.navigate(['tabs/tab2'])
              alert('estamos por aki ' + this.nombrenotificacions)
            }
            else {
              this.au.passincorrecta();
            }
            a.unsubscribe()
          })
        } else {
          if (this.usuario_pagodeuda != "") {
            this.fecha = new Date();
            const mes = this.fecha.getMonth() + 1;
            this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

            this.au.recuperaenviocobros(this.usuario_pagodeuda.uid, this.cobrador_pagodeuda.uid, this.usu_pagodeuda.fechita).subscribe(dat => {
              let prueba11 = dat[0]
              this.au.agregafechapagocobros({ fechapago: this.fechita }, this.usuario_pagodeuda.uid, this.usu_pagodeuda.id)
              this.au.agregafechapagocobros({ fechapago: this.fechita }, this.cobrador_pagodeuda.uid, prueba11.id)
              this.au.actualizaestadodecobro({ estado: 1 }, this.cobrador_pagodeuda.uid, prueba11.id)
            })
            if (pin == this.usuario_pagodeuda.password) {
              this.cajaactual_pagodeuda = parseFloat(this.usuario_pagodeuda.cajainterna) - parseFloat(this.usu_pagodeuda.monto);
              this.cajaactual1_pagodeuda = this.cajaactual_pagodeuda.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajaactual1_pagodeuda }, this.usuario_pagodeuda.uid);
              this.au.actualizaestadodecobro({ estado: 1 }, this.usuario_pagodeuda.uid, this.usu_pagodeuda.id)
              this.fire.collection('/user/' + this.usuario_pagodeuda.uid + '/egreso').add({
                monto: this.usu_pagodeuda.monto,
                id: this.cobrador_pagodeuda.uid,
                nombre: this.nombrecobrador,//this.nombresito,
                telefono: this.cobrador_pagodeuda.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'pago por envio de cobro',
                saldo: this.cajaactual1_pagodeuda,
                identificador: '0'
              })
              this.cajainterna_pagodeuda = parseFloat(this.cobrador_pagodeuda.cajainterna) + parseFloat(this.usu_pagodeuda.monto);
              this.cajainterna1_pagodeuda = this.cajainterna_pagodeuda.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajainterna_pagodeuda }, this.cobrador_pagodeuda.uid)
              this.fire.collection('/user/' + this.cobrador_pagodeuda.uid + '/ingresos').add({
                monto: this.usu_pagodeuda.monto,
                id: this.usuario_pagodeuda.uid,
                nombre: this.nombreusuario,
                telefono: this.usuario_pagodeuda.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'recibio por envio de cobro',
                saldo: this.cajainterna1_pagodeuda,
                identificador: '1'
              })
              this.au.pagodecobroexitoso(this.usu_pagodeuda.monto, this.nombrecobrador);//this.nombresito);
              this.closeUsuario();
              this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de " + this.usu_pagodeuda.monto + "Bs. de " + this.nombreusuario + " ", this.cobrador_pagodeuda.token, this.usuario_pagodeuda.uid, "/tabs/tab2")
              this.estado_pagodeuda = true
            } else {
              this.au.passincorrecta();
              this.closeUsuario()
            }
          }
        }
      }
    }
  }


}
