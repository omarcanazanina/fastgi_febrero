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
  usuario: any = []
  cobrador: any = []
  monto_transferencia: any
  detalle_transferencia: any
  name_transferencia: string
  nro_transferencia: string
  //control para q funcion entrara
  // 1 ==> transferencia  2 ==> pagodeuda  
  nrocontrol:number
  // nombres para el registro y notificaciones
  nombreusu: any
  nombrecob: any

  cajaactual_transferencia: number//cobrador
  cajaactual1_transferencia: any//cobrador
  cajainterna_transferencia: number//usuario
  cajainterna1_transferencia: any//usuario
  nombrenotificaciont: any

  namenotificationt: any

  // datos recibidos de (cards)
 //usuario_sinmonto: any = []
 //contelefono_sinmonto: any = []
  monto_sinmonto: any
  //name_sinmonto: any

  //cajaactual_sinmonto: number
  //cajaactual1_sinmonto: any
  //cajaresta_sinmonto: number
  //cajaresta1_sinmonto: any
  //nombrenotificacions: any
  //datos recibidos de (escaner)
  //usuario_conmonto: any = []
  //contelefono_conmonto: any = []
  monto_conmonto: any
  //name_conmonto: any

  cajaactual_conmonto: number;
  cajaactual1_conmonto: any
  cajaresta_conmonto: number;
  cajaresta1_conmonto: any
  real_conmonto: number;
  //nombrenotificacionc: any
  //datos recibidos para pagar cobro (pagarenviocobro)
  //usuario_pagodeuda: any = []
  //cobrador_pagodeuda: any = []
  usu_pagodeuda: any = []
  nombreusuario: any
  nombrecobrador: any

  cajaactual_pagodeuda: number
  cajaactual1_pagodeuda: any
  cajainterna_pagodeuda: number
  cajainterna1_pagodeuda: any
  //estado_pagodeuda = true
  //datos para rescatar la fecha
  fecha: Date
  fechita: any

  //varios
  ruta = (['/tabs/tab2/ingresoegreso'])
  badgeactual: number
  otrobadge = 0

  //

  constructor(private modal: ModalController,
    private au: AuthService,
    public fire: AngularFirestore,
    private fcm: FcmService,
    private route: Router) { }

  ngOnInit() {
    this.real_conmonto = parseFloat(this.monto_conmonto)

    let t = this.au.contactosprueba(this.usuario.uid).subscribe(dat => {
      const a = JSON.parse(dat[0].value)
      const b = a.todo
      for (let i = 0; i < b.length; i++) {
        const element = b[i];
        if (element.telefono == this.cobrador.telefono) {
          this.nombrecob = element.nombre
          
        }
      }
      this.au.contactosprueba(this.cobrador.uid).subscribe(dat => {
        const a = JSON.parse(dat[0].value)
        const b = a.todo
        for (let i = 0; i < b.length; i++) {
          const element = b[i];
          if (element.telefono == this.usuario.telefono) {
            this.nombreusu = element.nombre
            
          }
        }
      })
    })

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
    //funcion transferencia
    if (this.nrocontrol == 1) {
      if (parseFloat(this.usuario.cajainterna) >= this.monto_transferencia) {
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
        if (this.monto_transferencia == 0) {
          this.au.ingresoinvalido()
        } else {
          if (pin == this.usuario.password) {
            this.cajaactual_transferencia = parseFloat(this.cobrador.cajainterna) + parseFloat(this.monto_transferencia);
            this.cajaactual1_transferencia = this.cajaactual_transferencia.toFixed(2)
            this.au.actualizacaja({ cajainterna: this.cajaactual1_transferencia }, this.cobrador.uid);
            this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
              monto: this.monto_transferencia,
              id: this.usuario.uid,
              nombre: this.nombreusu,
              telefono: this.usuario.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'transferencia',
              saldo: this.cajaactual1_transferencia,
              identificador: '1'
            })
            this.cajainterna_transferencia = parseFloat(this.usuario.cajainterna) - this.monto_transferencia;
            this.cajainterna1_transferencia = this.cajainterna_transferencia.toFixed(2)
            this.au.actualizacaja({ cajainterna: this.cajainterna1_transferencia }, this.usuario.uid)
            this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
              monto: this.monto_transferencia,
              id: this.cobrador.uid,
              nombre: this.nombrecob,
              telefono: this.cobrador.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'transferencia',
              saldo: this.cajainterna1_transferencia,
              identificador: '0'
            })
            this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
              dato: 'enviatransferencia',
              monto: this.monto_transferencia,
              detalle: this.detalle_transferencia,
              clave: this.cobrador.uid,
              formatted: this.nombrecob,
              telefono: this.cobrador.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              saldo: this.cajainterna1_transferencia,
              estadobadge: false
            })
            //
            this.fire.collection('/user/' + this.cobrador.uid + '/cobrostransferencias').add({
              dato: 'recibetransferencia',
              monto: this.monto_transferencia,
              detalle: this.detalle_transferencia,
              clave: this.usuario.uid,
              formatted: this.nombreusu,
              telefono: this.usuario.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              saldo: this.cajaactual1_transferencia,
              estadobadge: false
            })
            this.au.transexitoso1(this.monto_transferencia, this.nombrecob)
            this.fcm.notificacionforToken("Fastgi", "Acaba de recibir una tranferencia de " + this.monto_transferencia + "Bs. de " + this.nombreusu + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
            this.modal.dismiss();
            //this.badgeactual = this.cobrador.badge + 1
            // console.log(this.badgeactual);
            //this.au.actualizabadge({ badge: this.badgeactual }, this.cobrador.uid);
          } else {
            this.au.passincorrecta();
          }
        }
      } else {
        this.au.ahorroinsuficiente1(this.ruta);
        this.closeUsuario()
      }
      // t.unsubscribe()
      //   })
      // })
    } else {
      //funcion pago con monto (qr)
      if (this.nrocontrol == 4) {
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds()
        if (pin == this.usuario.password) {
         //this.cajaactual_conmonto = parseFloat(this.cobrador.cajainterna) + this.real_conmonto;
         const cajaactual = parseFloat(this.cobrador.cajainterna) + this.real_conmonto;
          //this.cajaactual1_conmonto = this.cajaactual_conmonto.toFixed(2)
          const cajaactual1_dosdecimales = cajaactual.toFixed(2)
          this.au.actualizacaja({ cajainterna: cajaactual1_dosdecimales }, this.cobrador.uid);
          this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
            monto: this.real_conmonto,
            id: this.usuario.uid,
            nombre: this.nombreusu,
            telefono: this.usuario.telefono,
            fechita: this.fechita,
            fecha: this.fecha,
            descripcion: 'pago por lectura',
            saldo: cajaactual,
            identificador: '1'
          })
          //this.cajaresta_conmonto = parseFloat(this.usuario.cajainterna) - this.real_conmonto;
          const cajaresta = parseFloat(this.usuario.cajainterna) - this.real_conmonto;
          //this.cajaresta1_conmonto = this.cajaresta_conmonto.toFixed(2)
          const cajaresta1_dosdecimal = cajaresta.toFixed(2)
          this.au.actualizacaja({ cajainterna: cajaresta1_dosdecimal }, this.usuario.uid);
          this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
            monto: this.real_conmonto,
            id: this.cobrador.uid,
            nombre: this.nombrecob,
            telefono: this.cobrador.telefono,
            fechita: this.fechita,
            fecha: this.fecha,
            descripcion: 'pago por lectura',
            saldo: cajaresta,
            identificador: '0'
          })
          this.au.presentToast(this.real_conmonto, this.nombrecob);
          this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de  " + this.real_conmonto + "Bs. de " + this.nombreusu + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
          this.closeUsuario()
          this.route.navigate(['tabs/tab2'])
        }
        else {
          this.au.passincorrecta();
        }
        //d.unsubscribe()

      } else {
        //funcion de pagar sin monto (QR)
        if (this.nrocontrol == 3) {
          alert('estamos en el pago sin monto')
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
        if (pin == this.usuario.password) {
          //this.cajaactual_sinmonto = parseFloat(this.cobrador.cajainterna) + parseFloat(this.monto_sinmonto);
          const cajaactual = parseFloat(this.cobrador.cajainterna) + parseFloat(this.monto_sinmonto);
         // this.cajaactual1_sinmonto = this.cajaactual_sinmonto.toFixed(2)
         const cajaactual1_dosdecimal = cajaactual.toFixed(2)
          this.au.actualizacaja({ cajainterna: cajaactual1_dosdecimal }, this.cobrador.uid);
          this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
            monto: this.monto_sinmonto,
            fecha: this.fecha,
            fechita: this.fechita,
            descripcion: 'pago',
            id: this.usuario.uid,
            nombre: this.nombreusu,
            telefono: this.usuario.telefono,
            identificador: '1',
            saldo: cajaactual
          })
          //this.cajaresta_sinmonto = parseFloat(this.usuario_sinmonto.cajainterna) - parseFloat(this.monto_sinmonto);
          const cajaresta = parseFloat(this.usuario.cajainterna) - parseFloat(this.monto_sinmonto);
          //this.cajaresta1_sinmonto = this.cajaresta_sinmonto.toFixed(2)
          const cajaresta1_dosdecimal = cajaresta.toFixed(2)
          this.au.actualizacaja({ cajainterna: cajaresta1_dosdecimal }, this.usuario.uid);
          this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
            monto: this.monto_sinmonto,
            id: this.cobrador.uid,
            nombre: this.nombrecob,
            telefono: this.cobrador.telefono,
            fecha: this.fecha,
            fechita: this.fechita,
            descripcion: 'pago',
            saldo: cajaresta,
            identificador: '0'
          })
          this.au.presentToast(this.monto_sinmonto, this.nombrecob);
          this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de " + this.monto_sinmonto + "Bs. de " + this.nombreusu + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
          this.closeUsuario()
          this.route.navigate(['tabs/tab2'])
        }
        else {
          this.au.passincorrecta();
        }
          // a.unsubscribe()

        } else {
          if (this.nrocontrol == 2) {            
            this.fecha = new Date();
            const mes = this.fecha.getMonth() + 1;
            this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

            let ad =this.au.recuperaenviocobros(this.usuario.uid, this.cobrador.uid, this.usu_pagodeuda.fechita).subscribe(dat => {
              let prueba11 = dat[0]
              this.au.agregafechapagocobros({ fechapago: this.fechita }, this.usuario.uid, this.usu_pagodeuda.id)
              this.au.agregafechapagocobros({ fechapago: this.fechita }, this.cobrador.uid, prueba11.id)
              this.au.actualizaestadodecobro({ estado: 1 }, this.cobrador.uid, prueba11.id)
              ad.unsubscribe()
            })
            if (pin == this.usuario.password) {
              this.cajaactual_pagodeuda = parseFloat(this.usuario.cajainterna) - parseFloat(this.usu_pagodeuda.monto);
              this.cajaactual1_pagodeuda = this.cajaactual_pagodeuda.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajaactual1_pagodeuda }, this.usuario.uid);
              this.au.actualizaestadodecobro({ estado: 1 }, this.usuario.uid, this.usu_pagodeuda.id)
              this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
                monto: this.usu_pagodeuda.monto,
                id: this.cobrador.uid,
                nombre: this.nombrecob,
                telefono: this.cobrador.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'pago por envio de cobro',
                saldo: this.cajaactual1_pagodeuda,
                identificador: '0'
              })
              this.cajainterna_pagodeuda = parseFloat(this.cobrador.cajainterna) + parseFloat(this.usu_pagodeuda.monto);
              this.cajainterna1_pagodeuda = this.cajainterna_pagodeuda.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajainterna_pagodeuda }, this.cobrador.uid)
              this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
                monto: this.usu_pagodeuda.monto,
                id: this.usuario.uid,
                nombre: this.nombreusu,
                telefono: this.usuario.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'recibio por envio de cobro',
                saldo: this.cajainterna1_pagodeuda,
                identificador: '1'
              })
              this.au.pagodecobroexitoso(this.usu_pagodeuda.monto, this.nombrecob);
              this.closeUsuario();
              this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de " + this.usu_pagodeuda.monto + "Bs. de " + this.nombreusu + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
              //this.estado_pagodeuda = true
            } else {
              this.au.passincorrecta();
              this.closeUsuario()
            }
          }
        }
      }
    }
  }


  jason() {
    //  this.au.contactosprueba(this.usuario.uid).subscribe(dat =>{
    //    const a  = JSON.parse(dat[0].value)
    //   // console.log(a.todo[0].nombre);
    //    const b = a.todo
    //    for (let i = 0; i < b.length; i++) {
    //      const element = b[i];
    //    if(element.telefono == '72990653'){
    //      console.log('es este'+ JSON.stringify(element));
    //    }
    //    }
    //  })
  }


}
