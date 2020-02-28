import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-confirmaretirosaldo',
  templateUrl: './confirmaretirosaldo.page.html',
  styleUrls: ['./confirmaretirosaldo.page.scss'],
})
export class ConfirmaretirosaldoPage implements OnInit {
  public mask = [/[0-9]/, /\d/, /\d/, /\d/,' ', /\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/]
  public mask1 = [/[0-9]/, /\d/, /\d/, /\d/,' ', /\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/]
  public mask2 = [/[0-9]/, /\d/, /\d/, /\d/,' ', /\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/]
  public mask3 = [/[0-9]/, /\d/, /\d/, /\d/,' ', /\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/]
  public mask4 = [/[0-9]/, /\d/, /\d/, /\d/,' ', /\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/]
  public mask5 = [/[0-9]/, /\d/, /\d/, /\d/, /\d/,/\d/,/\d/,/\d/,/\d/,/\d/]
  uu: any
  dato = null
  usuario = {
    uid: "",
    nombre: "",
    cajainterna: ""
  }
  cajaapp = {
    monto: "",
    uid: ""
  }
  fecha: Date
  fechita: any
  cajatotal: number
  cajatotal1:any
  banco: string
  nombre: string
  ci: number
  caja: number
  caja1:any
  miModelo: any
  contador = 0
  text: string
  constructor(private au: AuthService,
    private activate: ActivatedRoute,
    public fire: AngularFirestore,
    public route: Router) {
    this.miModelo = {};
  }

  ngOnInit() {
    this.dato = this.activate.snapshot.paramMap.get('id')
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

    this.au.recuperacajaapp().subscribe(cajaapp => {
      this.cajaapp = cajaapp;
    })
  }
  onSelectChange(banco) {
    if (banco == 'fie') {
      this.contador = 11
      this.text = banco
    }
    if (banco == 'ganadero' || banco == 'mercantilsantacruz' || banco == 'fortaleza' || banco == 'nacionaldebolivia' || banco == 'bisa') {
      this.contador = 10
      this.text = banco
    }
    if (banco == 'creditodebolivia' || banco == 'prodem') {
      this.contador = 13
      this.text = banco
    }
    if (banco == 'union') {
      this.contador = 14
      this.text = banco
    }
    if (banco == 'ecofuturo' || banco == 'solidario' || banco == 'desarrolloproductivo' || banco == 'economico' || banco == 'fassil' || banco == 'comunidad') {
      this.contador = 1
      this.text = banco
    }
  }
  guardarcuenta() {
    if (this.banco == undefined || this.miModelo.solonumero == undefined || this.nombre == undefined || this.ci == undefined) {
      this.au.revisedatos()
    } else {
      if (parseFloat(this.usuario.cajainterna) <= this.dato) {
        this.au.insuficiente()
      } else {
        this.caja = parseFloat(this.cajaapp.monto) - this.dato
        this.caja1 = this.caja.toFixed(2)
        this.au.actualizacajaapp({ monto: this.caja1 })

        this.cajatotal = parseFloat(this.usuario.cajainterna) - this.dato
        this.cajatotal1 = this.cajatotal.toFixed(2)
        this.au.actualizacaja({ cajainterna: this.cajatotal1 }, this.uu);

        this.fire.collection('/user/' + this.uu + '/cuentas').add({
          banco: this.banco,
          cuenta: this.miModelo.solonumero,
          nombre: this.nombre,
          ci: this.ci
        })
        this.fire.collection('/user/' + this.uu + '/egreso').add({
          monto: parseFloat(this.dato),
          nombre: this.nombre,
          cuenta: this.miModelo.solonumero,
          banco:this.banco,
          fechita: this.fechita,
          fecha: this.fecha,
          descripcion: 'retiro de saldo',
          saldo: this.cajatotal1,
          identificador: '0'
        })
        this.au.creocuenta(this.dato,this.miModelo.solonumero,this.nombre);
        this.route.navigate(['/tabs/tab2'])
      }
    }
  }

}
