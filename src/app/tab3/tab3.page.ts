import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { ModalperfilPage } from '../modalperfil/modalperfil.page';
import { Observable } from 'rxjs';
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
  //imgbd:any
  //perfil=0
  urlfinal: any
  url: any;
  loading: boolean = false;
  darkmode: boolean = true;
  myimage  = null   
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
    codtel: "",
    img: "",
    password:""
  }

  tarjetas: any = []
  uu = null;
  monto: number;
  cajaactual: number;

  controlnombre = 0
  controlcorreo = 0
  nro_telefono: any
  imm: any

  controladorpin:any
  ngOnInit() {
    // this.uu = this.activate.snapshot.paramMap.get('id')
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.controladorpin = this.usuario.password
      this.imm = this.usuario.img
      //this.nro_telefono=this.usuario.telefono
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

  galeria() {
    this.au.takeGalley().then(res => {
      let load = this.au.loading()
      this.au.uploadImgB64('user/' + this.usuario.telefono + 'galery.jpg', res).then(url => {
        this.urlfinal = url
        //this.au.reducirImagen(url).then( imgreducido =>{} )
        // this.perfil=1
        this.imm = this.au.actualizarimg({ img: url }, this.usuario.uid)
        load.then(loading => {
          loading.dismiss();
        })
      }).catch(err => alert('error de upload' + err))
    }).catch(err => alert(err))
  }

  camara() {
    this.au.takecamera().then(res => {
      let load = this.au.loading()
      this.au.uploadImgB64('user/' + this.usuario.telefono + 'camara.jpg', res).then(url => {
        this.urlfinal = url
        //this.perfil=1
        this.imm = this.au.actualizarimg({ img: url }, this.usuario.uid)
        load.then(loading => {
          loading.dismiss();
        })
      }).catch(err => alert('error de upload' + err))
    }).catch(err => alert(err))
  }

  eliminar() {
    //this.perfil = 0
    let url = 'https://firebasestorage.googleapis.com/v0/b/aplicacion-bdcf5.appspot.com/o/user%2Fdefault.jpg?alt=media&token=773dd56e-f796-41a1-8a85-d40fe7a9693e'
    this.imm = this.au.actualizarimg({ img: url }, this.usuario.uid)
  }

  async funciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto de perfil',
      buttons: [{
        text: 'Eliminar foto',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.perfil = 0
          this.eliminar()
          console.log('Delete clicked');
        }
      }, {
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          this.camara()
          console.log('Share clicked');
        }
      }, {
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

  async modal() {
    const modal = await this.modalController.create({
      component: ModalperfilPage,
      componentProps: {
        image: this.imm,
        // estado: this.perfil,
        telefono: this.nro_telefono
      }
    })
    await modal.present()
  }

  

// //** recortar imagen**//
// captureImage() {
//   this.convertir('../../../assets/icon/vegeta.jpg').subscribe(base64 =>{
//     this.myimage =base64
//   })
// }
//
// convertir(url: string) {
//   return Observable.create(observer => {
//     let xhr: XMLHttpRequest = new XMLHttpRequest();
//     xhr.onload = function() {
//       let reader: FileReader = new FileReader();
//       reader.onloadend = function() {
//         observer.next(observer.result);
//         observer.complete();
//       }
//       reader.readAsDataURL(xhr.response)
//     }
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
//   })
// }


} 
