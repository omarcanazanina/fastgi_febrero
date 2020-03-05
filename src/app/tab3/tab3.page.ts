import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { ModalperfilPage } from '../modalperfil/modalperfil.page';
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
  perfil=0
  urlfinal:any
  url: any;
  loading: boolean = false;
  darkmode: boolean = true;
  constructor(private au: AuthService,
    public alertController: AlertController,
    private route: Router,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
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

  galeria(){
    this.au.takeGalley().then(res =>{
      let load = this.au.loading()
      this.au.uploadImgB64('user/'+this.usuario.telefono+'galery.jpg',res).then( url =>{
        this.urlfinal=url
        this.perfil=1
        load.then(loading => {
         loading.dismiss();
       })
      }).catch(err => alert('error de upload'+err))
    }).catch(err =>alert(err))
  }

  camara(){
    this.au.takecamera().then(res =>{
      let load = this.au.loading()
      this.au.uploadImgB64('user/'+this.usuario.telefono+'camara.jpg',res).then( url =>{
        this.urlfinal=url
        this.perfil=1
        load.then(loading => {
          loading.dismiss();
        })
      }).catch(err => alert('error de upload'+err))
    }).catch(err =>alert(err))
  }

  eliminar(){
    this.perfil=0
  }

  async funciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto de perfil',
      buttons: [{
        text: 'Eliminar foto',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.perfil = 0
          console.log('Delete clicked');
        }
      }, {
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          this.camara()
          console.log('Share clicked');
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.galeria()
          console.log('Play clicked');
        }
      },]
    });
    await actionSheet.present();
  }

  async modal(){
   const modal= await this.modalController.create({
      component: ModalperfilPage,
      componentProps: {
        image: this.urlfinal,
        nombre:'omaro'
      }
    })
    await modal.present()
  }
  }
