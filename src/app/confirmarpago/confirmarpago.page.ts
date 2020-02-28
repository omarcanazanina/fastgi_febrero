import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-confirmarpago',
  templateUrl: './confirmarpago.page.html',
  styleUrls: ['./confirmarpago.page.scss'],
})
export class ConfirmarpagoPage implements OnInit {
  usuario:any = []
  cobrador:any = []
  usu: any =[]
  gruponum = [7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0, 'Borrar']    
  pin=""
  cont = 0
  fecha: Date
  fechita: any
  cajaactual: number
  cajaactual1: any
  cajainterna: number
  cajainterna1: any
  estado=true
  constructor(private modal: ModalController,
    private au: AuthService,
    public fire: AngularFirestore) { }

  ngOnInit() { 
  }
  
  pagardeuda(pin){
     this.fecha = new Date();
     const mes = this.fecha.getMonth() + 1;
     this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

     this.au.recuperaenviocobros(this.usuario.uid, this.cobrador.uid, this.usu.fechita).subscribe(dat => {
       let prueba11 = dat[0]
       this.au.agregafechapagocobros({ fechapago: this.fechita }, this.usuario.uid, this.usu.id)
       this.au.agregafechapagocobros({ fechapago: this.fechita }, this.cobrador.uid, prueba11.id)
       this.au.actualizaestadodecobro({ estado: 1 }, this.cobrador.uid, prueba11.id)
      })
       if(pin == this.usuario.password){
         this.cajaactual = parseFloat(this.usuario.cajainterna) - parseFloat(this.usu.monto);
         this.cajaactual1 = this.cajaactual.toFixed(2)
         this.au.actualizacaja({ cajainterna: this.cajaactual1 }, this.usuario.uid);
         this.au.actualizaestadodecobro({ estado: 1 }, this.usuario.uid, this.usu.id)
         this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
           monto: this.usu.monto,
           id: this.cobrador.uid,
           nombre: this.cobrador.nombre,//this.nombresito,
           telefono: this.cobrador.telefono,
           fechita: this.fechita,
           fecha: this.fecha,
           descripcion: 'pago por envio de cobro',
           saldo: this.cajaactual1,
           identificador: '0'
         })
         this.cajainterna = parseFloat(this.cobrador.cajainterna) + parseFloat(this.usu.monto);
         this.cajainterna1 = this.cajainterna.toFixed(2)
         this.au.actualizacaja({ cajainterna: this.cajainterna }, this.cobrador.uid)
         this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
           monto: this.usu.monto,
           id: this.usuario.uid,
           nombre: this.usuario.nombre,
           telefono: this.usuario.telefono,
           fechita: this.fechita,
           fecha: this.fecha,
           descripcion: 'recibio por envio de cobro',
           saldo: this.cajainterna1,
           identificador: '1'
         })
         this.au.pagodecobroexitoso(this.usu.monto,this.cobrador.nombre );//this.nombresito);
         this.closeUsuario();
         this.estado = true
       }else{
         this.au.passincorrecta();
         this.closeUsuario()
       }
  }

  closeUsuario() {
    this.modal.dismiss()
  }

  presionar(num) {
    this.pin = this.pin + num
    if (num == 'Borrar') {
      this.pin = ""
    } if (num == '.') {
      this.cont = this.cont + 1
    } if (this.cont > 1) {
      this.pin = ""
      this.cont = 0
    }
  }

}
