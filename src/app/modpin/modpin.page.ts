import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modpin',
  templateUrl: './modpin.page.html',
  styleUrls: ['./modpin.page.scss'],
})
export class ModpinPage implements OnInit {

  uu: any
  primero: any
  segundo: any
  tercero: any
  usuario = {
    password: "",
    uid: "",
    correo:"",
    telefono:""
  }
  constructor(private au: AuthService,
    public alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
  }

  async modificarpin() {
    if (this.primero == this.usuario.password) {
      this.guardarnuevopin()
    } else {
      this.au.codigoinvalido()
    }
  }

  guardarnuevopin() {
    if (this.segundo == this.tercero) {
      console.log('son iguales');
      this.au.registranombre({ password: this.tercero }, this.uu);
      this.au.datosgmail(this.tercero, this.usuario.correo, this.usuario.telefono)
      this.router.navigate(['tabs/tab3'])
    } else {
      this.au.codigoinvalido()
    }
  }
  
  volver(){
    this.router.navigate(['tabs/tab3'])
  }


}
