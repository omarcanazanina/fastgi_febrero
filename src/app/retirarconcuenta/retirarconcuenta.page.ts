import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-retirarconcuenta',
  templateUrl: './retirarconcuenta.page.html',
  styleUrls: ['./retirarconcuenta.page.scss'],
})
export class RetirarconcuentaPage implements OnInit {
  uu: any
  usuario = {
    cajainterna: "",
    nombre: "",
    fecha: "",
    id: ""
  }
  cuentas: any = []
  monto = null
  dato=""
  constructor(private au: AuthService, private activate: ActivatedRoute) { }

  ngOnInit() {
    this.monto = this.activate.snapshot.paramMap.get('id')
    console.log(this.monto);

    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.recuperacuenta(this.uu).subscribe(dat => {
      this.cuentas = dat;
    })

  }

}
