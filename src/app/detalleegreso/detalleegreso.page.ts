import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalleegreso',
  templateUrl: './detalleegreso.page.html',
  styleUrls: ['./detalleegreso.page.scss'],
})
export class DetalleegresoPage implements OnInit {

  usu:any=[]
  cont=0
  constructor(private modal: ModalController) { }

  ngOnInit() {
  }
  closeUsuario() {
    this.modal.dismiss()
  }

}
