import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  textoBuscar = ''
  // otro modo
  uu
  usuario = {
    nombre: "",
    telefono: "",
    uid: "",
    badge: "",
    contacts: ""
  }

  contactstext = []
  contactstexttrue = []
  contactstextnone = [] 
  //
  constructor(private au: AuthService,
    public loadingController: LoadingController,
    private route: Router,
    private socialShare: SocialSharing,
    public fire: AngularFirestore
  ) {
    //this.loadContacts()
  }

  BuscarContacto(event) {
    this.textoBuscar = event.target.value;
  }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      // this.listar_contactos()
      // this.listar()
      this.listarcontactos()
    })
  }


  codigo(num) {
    let nuevo = num.replace("+591", "").trim()
    return nuevo
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando contactos--',
      duration: 2000
    });
    await loading.present();
    return loading;
  }
  enviadatos(usu) {
    this.route.navigate(['/pagarenviocobro', usu.telefono, usu.nombre])
  }

  invitar() {
    this.socialShare.shareWithOptions({
      message: "Prueba Fastgi, es ideal para realizar pagos y transferencias de una manera secilla y fácil",
      subject: "QR Transaccion",
      url: 'Android:https://play.google.com/store/apps/details?id=com.hegaro.goodme&hl=es_BO  IOS:www.hegaro.com.bo',
      chooserTitle: 'Compartir Via'
    }).then(() => {
      console.log("shared successfull");
    }).catch((e) => {
      console.log("shared failed" + e);
    });
  }

  listarcontactos() {
    this.au.contactosprueba(this.usuario.uid).subscribe(dat => {
      const a = JSON.parse(dat[0].value)
      this.contactstext = a.todo
      const order = this.au.ordenarjson(this.contactstext, 'nombre', 'asc')
      order.forEach(element => {
        this.au.verificausuarioActivo(element.telefono).subscribe(res => {
          if (res.length > 0) {
            this.contactstexttrue.push(element)
          } else {
            this.contactstextnone.push(element)
          }
        })
      });
    })
  }

  updatecontacts() {
    this.au.contactosprueba(this.usuario.uid).subscribe(res => {
      const contact = res[0].id
      this.au.deletecontact(this.usuario.uid, contact).then(dat => {
        this.au.guardarcontactos(this.usuario.uid)
        this.au.updatecontacts()
        this.route.navigate(['/tabs/historial'])
      })
    })

  }
}
