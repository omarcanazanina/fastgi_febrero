import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { LoadingController } from '@ionic/angular';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  datito = []
  ContactsNone = []
  ContactsTrue = []
  ContactsNoneOrden: any
  ContactsTrueOrden: any = []
  Ordenado: []
  Ordenado1: []
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
  todosdatos: any = []
  todosdatos1: any = []
  todosdatosordenado: any = []
  todosdatosordenado1: any = []
  contactos1: any = []
  contactos2: any = []
  sicontact: any = []
  nocontact: any = []
  //contactos text
  contactstext = []
  contactstexttrue = []
  contactstextnone = []
  //
  constructor(private au: AuthService,
    private contactos: Contacts,
    public loadingController: LoadingController,
    private route: Router,
    private socialShare: SocialSharing,
    public fire: AngularFirestore,
    private storage: Storage
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
      this.listar()
      this.listarcontactos()
    })

  }

  // listar datos de BD
  listar() {
    let load = this.presentLoading()
    this.au.recuperarcontactos(this.usuario.uid, 1).subscribe(datos => {
      this.todosdatos = datos
      this.todosdatosordenado = this.au.ordenarjson(this.todosdatos, 'nombre', 'asc')
    })
    this.au.recuperarcontactos(this.usuario.uid, 0).subscribe(datos => {
      this.todosdatos1 = datos
      this.todosdatosordenado1 = this.au.ordenarjson(this.todosdatos1, 'nombre', 'asc')

    })
    load.then(loading => {
      loading.dismiss();
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
      //const ordenado = this.au.ordenarjson(a,'nombre','asc')
      // console.log(a.todo[0].nombre);
      this.contactstext = a.todo
      this.contactstext.forEach(element => {
        this.au.verificausuarioActivo(element.telefono).subscribe(res => {
          if (res.length > 0) {
            this.contactstexttrue.push(element)
          } else {
            this.contactstextnone.push(element)
          }
        })
      });
     // console.log(this.contactstexttrue);
     // const ordenado = this.au.ordenarjson(this.contactstexttrue,'nombre','asc')
     // console.log(ordenado);
    })
  }

  updatecontacts() {
    this.au.contactosprueba(this.usuario.uid).subscribe(res => {
      const contact = res[0].id
      this.au.deletecontact(this.usuario.uid, contact).then(dat => {
        this.au.guardarcontactos(this.usuario.uid)
        alert('se termino de actualizar')
        this.route.navigate(['/tabs/historial'])
      })
    })

  }
}
