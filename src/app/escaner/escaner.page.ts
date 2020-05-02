import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Confirmacion1Page } from '../confirmacion1/confirmacion1.page';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private au: AuthService,
    public fire: AngularFirestore,
    public modal: ModalController) { }

  usuario = {
    cajainterna: "",
    nombre: "",
    password: "",
    uid: "",
    telefono: ""
  }
  contelefono = {
    nombre: "",
    uid: "",
    telefono: "",
    cajainterna: "",
    token: ""
  }
  uu: any;
  fecha: Date;
  monto = null;
  telefono = null;
  fechita: any;
  real: number;
  ruta = (['/tabs/tab2/ingresoegreso'])
  nombrebd:string
  ngOnInit() {
    this.monto = this.activatedRoute.snapshot.paramMap.get('monto');
    this.telefono = this.activatedRoute.snapshot.paramMap.get('phoneNumber');
    this.real = parseFloat(this.monto)
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;


      let f = this.au.contactosprueba(this.usuario.uid).subscribe(dat => {
        const a = JSON.parse(dat[0].value)
        const b = a.todo
        for (let i = 0; i < b.length; i++) {
          const element = b[i];
          if (element.telefono == this.telefono) {
            this.nombrebd = element.nombre
          }
        }
        f.unsubscribe()
      })

     //let a= this.au.recupera_nombre_contacto(this.telefono,this.usuario.uid).subscribe( nombredato =>{
     //  this.nombrebd = nombredato[0].nombre
     //  a.unsubscribe()
     //})
    })
    this.au.verificausuarioexistente(this.telefono).subscribe(contelefono => {
      this.contelefono = contelefono[0]
    })
  }

  async pagar1(monto) {
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

    if (parseInt(this.usuario.password) == 0) {
      this.au.enviocorreo1(this.usuario.uid, this.usuario.telefono)
    } else {
      if (parseFloat(this.usuario.cajainterna) >= parseFloat(monto)) {
        this.modal.create({
          component: Confirmacion1Page,
          //cssClass: 'detalleenviocobro',
          componentProps: {
            usuario: this.usuario,
            cobrador: this.contelefono,
            monto_conmonto: monto,
            nrocontrol: 4
           // name_conmonto: this.nombrebd
          }
        }).then((modal) => modal.present())
      } else {
        this.au.ahorroinsuficiente1(this.ruta)
      }
    }
  }
}
