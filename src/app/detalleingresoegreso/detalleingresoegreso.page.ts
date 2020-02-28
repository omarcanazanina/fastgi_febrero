import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalleingresoegreso',
  templateUrl: './detalleingresoegreso.page.html',
  styleUrls: ['./detalleingresoegreso.page.scss'],
})
export class DetalleingresoegresoPage implements OnInit {

  usu:any=[]

  constructor(private modal: ModalController) { }

  ngOnInit() {

  }
  closeUsuario() {
    this.modal.dismiss()
  }
}
