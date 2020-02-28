import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirmacargasaldo',
  templateUrl: './confirmacargasaldo.page.html',
  styleUrls: ['./confirmacargasaldo.page.scss'],
})
export class ConfirmacargasaldoPage implements OnInit {
  public mask = [/[0-9]/, /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/]
  public mask1 = [/[0-9]/, /\d/, ' ', '/', ' ', /\d/, /\d/]
  public mask2 = [/[0-9]/, /\d/, /\d/]
  constructor(private au: AuthService,
    public fire: AngularFirestore,
    public route: Router,
    private activate: ActivatedRoute) { }
  uu: any;
  usuario = {
    uid: "",
    nombre: "",
    cajainterna: ""
  }
  cajaapp = {
    monto: "",
    uid: ""
  }
  numero: any
  vencimiento: any
  cvv: any
  montito = null
  cajatotal: number
  cajatotal1: any
  fecha: Date
  fechita: any
  caja: number
  caja1: any
  ngOnInit() {
    this.montito = this.activate.snapshot.paramMap.get('id')
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
  guardartarjeta() {
    if (this.numero == undefined || this.vencimiento == undefined || this.cvv == undefined) {
      this.au.revisedatos()
    } else {
      this.caja = parseFloat(this.cajaapp.monto) + parseFloat(this.montito)
      this.caja1 = this.caja.toFixed(2)
      this.au.actualizacajaapp({ monto: this.caja1 })
      this.cajatotal = parseFloat(this.usuario.cajainterna) + parseFloat(this.montito)
      this.cajatotal1 = this.cajatotal.toFixed(2)
      this.au.actualizacaja({ cajainterna: this.cajatotal1 }, this.uu);
      const convertido = this.numero.toString()
      const numerito = convertido.substring(21, 25)
      this.fire.collection('/user/' + this.uu + '/tarjetas').add({
        numero: this.numero,
        numerito: numerito,
        vencimiento: this.vencimiento,
        cvv: this.cvv,
        monto: 0
      })
      this.fire.collection('/user/' + this.uu + '/ingresos').add({
        monto: parseFloat(this.montito),
        nombre: "····" + numerito,
        fechita: this.fechita,
        fecha: this.fecha,
        descripcion: 'carga desde tarjeta',
        saldo: this.cajatotal,
        identificador: '1'
      })
      this.au.creotarjeta(this.montito, '····' + numerito);
      console.log("se guardo correctamente");
      this.route.navigate(['/tabs/tab2'])
    }
  }

}
