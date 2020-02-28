import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargacontarjeta',
  templateUrl: './cargacontarjeta.page.html',
  styleUrls: ['./cargacontarjeta.page.scss'],
})
export class CargacontarjetaPage implements OnInit {
  uu: any
  usuario = {
    cajainterna: "",
    correo: "",
    nombre: "",
    pass: "",
    telefono: "",
    cajabancaria: "",
    uid: ""
  }
  tarjetas:any=[]
  monto=null
  dato=""
  constructor(private au: AuthService,private activate:ActivatedRoute) { }

  ngOnInit() {
    this.monto=this.activate.snapshot.paramMap.get('id')
    
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    
    this.au.recuperatarjeta(this.uu).subscribe(data => {
      this.tarjetas = data;
    })
  }

}
