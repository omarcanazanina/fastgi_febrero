import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { firestore } from 'firebase';

export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  url: any;
  // newImage: Image = {
  //   id: this.afs.createId(), image: ''
  // }
  loading: boolean = false;
  darkmode: boolean = true;
  constructor(private au: AuthService,
    public alertController: AlertController,
    private route: Router,
    //
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private camera: Camera,

  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkmode = prefersDark.matches;
  }
  usuario = {
    cajainterna: "",
    correo: "",
    nombre: "",
    pass: "",
    telefono: "",
    cajabancaria: "",
    uid: "",
    codtel: ""
  }

  tarjetas: any = []
  uu = null;
  monto: number;
  cajaactual: number;

  controlnombre = 0
  controlcorreo = 0
  ngOnInit() {
    // this.uu = this.activate.snapshot.paramMap.get('id')
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      if (this.usuario.nombre != '') {
        this.controlnombre = 1
      }
      if (this.usuario.correo != '') {
        this.controlcorreo = 1
      }
    })
    this.au.recuperatarjeta(this.uu).subscribe(data => {
      this.tarjetas = data;
    })
  }

  async editarnombre() {
    const alert = await this.alertController.create({
      header: 'Editar nombre',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: this.usuario.nombre,
          placeholder: 'Nuevo nombre'
        }
      ],
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: data => {
            this.au.registranombre({ nombre: data.nombre }, this.uu);
            if (data.nombre == '') {
              this.controlnombre = 0
            } else {
              this.controlnombre = 1
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editarcorreo() {
    const alert = await this.alertController.create({
      header: 'Editar correo',
      inputs: [
        {
          name: 'correo',
          type: 'text',
          value: this.usuario.correo,
          placeholder: 'Nuevo correo'
        }
      ],
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: data => {
            this.au.registracorreo({ correo: data.correo }, this.uu);

            if (data.correo == '') {
              this.controlcorreo = 0
            } else {
              this.controlcorreo = 1
            }

          }
        }
      ]
    });
    await alert.present();
  }

  mod() {
    this.route.navigate(['/tabs/tab3/modpin'])
  }

  async cerrarsesion() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Esta seguro que desea cerrar sesión',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.au.cerrarsesion()
          }
        }
      ]
    });
    await alert.present();
  }

  darktheme() {

    this.darkmode = !this.darkmode
    document.body.classList.toggle('dark')

  }
}
