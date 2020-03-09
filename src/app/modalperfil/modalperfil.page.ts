import { Component, OnInit, Input} from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-modalperfil',
  templateUrl: './modalperfil.page.html',
  styleUrls: ['./modalperfil.page.scss'],
})
export class ModalperfilPage implements OnInit {
imagensita:any
  @Input() image ;
  @Input() telefono;
  uu = null
  usuario = {
    telefono: "",
    uid: "",
    img:""
  }
  imm:any
  constructor(private modal:ModalController,
    private actionSheetController:ActionSheetController,
    private au: AuthService) { }

  ngOnInit() {
    this.uu = this.au.pruebita()
    this.au.recuperaundato(this.uu).subscribe( usuario =>{
      this.usuario = usuario
      this.imm = this.usuario.img
    })
  }

  atras(){
    this.modal.dismiss()
  }

  galeria(){
    this.au.takeGalley().then(res =>{
      let load = this.au.loading()
      this.au.uploadImgB64('user/'+this.usuario.telefono+'galery.jpg',res).then( url =>{
        this.imagensita=url
        this.imm = this.au.actualizarimg({ img: url }, this.usuario.uid)
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
        this.imagensita=url
        this.imm = this.au.actualizarimg({ img: url }, this.usuario.uid)
        load.then(loading => {
          loading.dismiss();
        })
      }).catch(err => alert('error de upload'+err))
    }).catch(err =>alert(err))
  }

  eliminar() {
    //this.perfil = 0
    let url = 'https://firebasestorage.googleapis.com/v0/b/aplicacion-bdcf5.appspot.com/o/user%2Fdefault.jpg?alt=media&token=773dd56e-f796-41a1-8a85-d40fe7a9693e'
    this.imm= this.au.actualizarimg({img:url}, this.usuario.uid)
  }

  async funciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto de perfil',
      buttons: [{
        text: 'Eliminar foto',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
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

}
