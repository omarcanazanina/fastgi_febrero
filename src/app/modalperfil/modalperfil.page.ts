import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalperfil',
  templateUrl: './modalperfil.page.html',
  styleUrls: ['./modalperfil.page.scss'],
})
export class ModalperfilPage implements OnInit {

  @Input() image;
  @Input() perfil;
  constructor(private modal:ModalController) { }

  ngOnInit() {
  }

  a(){
    this.modal.dismiss()
  }
}
