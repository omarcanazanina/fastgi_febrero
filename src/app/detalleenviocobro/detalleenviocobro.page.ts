import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalleenviocobro',
  templateUrl: './detalleenviocobro.page.html',
  styleUrls: ['./detalleenviocobro.page.scss'],
})
export class DetalleenviocobroPage implements OnInit {
usu:any=[]
uu:any
numero:number
num:number
usuario={
  cajainterna:""
}
  constructor(private au:AuthService,private modal: ModalController) { }

  ngOnInit() {
    this.uu = this.au.pruebita();

    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;  
      this.num= parseInt(this.usuario.cajainterna)
      this.numero=parseInt(this.usuario.cajainterna) +this.usu.monto 
    })
  }

  closeUsuario() {
    this.modal.dismiss()
  }
  
}
