import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-retirarsaldo',
  templateUrl: './retirarsaldo.page.html',
  styleUrls: ['./retirarsaldo.page.scss'],
})
export class RetirarsaldoPage implements OnInit {
  @ViewChild('input',{static:true}) myInput;
  usuario = {
    cajainterna: "",
    nombre: "",
    fecha: "",
    id: ""
  }
  monto
  cajaapp = {
    monto: "",
    uid: ""
  }
  dato1 = null
  uu: any
  cuentas: any = []
  fecha: Date
  fechita: any
  contador: number
  cajatotal: number
  cajatotal1:any
  caja: number
  caja1:any
  constructor(private au: AuthService,
    private activate: ActivatedRoute,
    public fire: AngularFirestore,
    public route: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150)

    this.dato1 = this.activate.snapshot.paramMap.get('id')
    console.log(this.dato1);
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.recuperacuenta(this.uu).subscribe(dat => {
      this.cuentas = dat;
      this.contador = this.cuentas.length;
    })
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

    this.au.recuperacajaapp().subscribe(da => {
      this.cajaapp = da
    })
  }
  confirmaretirosaldo(monto){
    if(monto == undefined){
      this.au.ingresemonto()
    }else{
      this.route.navigate(['/tabs/tab2/confirmaretirosaldo',monto])
    }
  }
  ir(monto) {
    if (monto == undefined) {
      this.au.ingresemonto()
    } else {
      this.route.navigate(['/tabs/tab2/retirarconcuenta', monto])
    }

  }
  retirodirecto(monto) {
    if (monto == undefined) {
      this.au.ingresemonto()
    } else {
      if(this.usuario.cajainterna <= monto){
        this.au.insuficiente()
      }else{
      this.cajatotal = parseFloat(this.usuario.cajainterna) - monto
      this.cajatotal1 = this.cajatotal.toFixed(2)
      this.au.actualizacaja({ cajainterna: this.cajatotal1 }, this.uu);
      this.caja = parseFloat(this.cajaapp.monto) - monto
      this.caja1 = this.caja.toFixed(2)
      this.au.actualizacajaapp({ monto: this.caja1 })
      this.fire.collection('/user/' + this.uu + '/egreso').add({
        monto: monto,
        nombre: this.dato1,
        fechita: this.fechita,
        fecha: this.fecha,
        descripcion: 'retiro desde tarjeta',
        saldo: this.cajatotal,
        identificador: '0'
      })
      this.au.retiracuenta(monto,this.dato1)
      this.route.navigate(['/tabs/tab2'])
    }
    }
  }

}
