import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Contacts } from '@ionic-native/contacts/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  usuario = {
    nombre: "",
    telefono: "",
    uid: "",
    badge: ""
  }
  uu: any
  historial = []
  textoBuscar = ''
  c = 0
  contactstext = []
  ContactsNone = []
  ContactsTrue = []
  controlador = 0
  num = []
  idusuario: any
  controladores: []

  //cont: any
  //datos = []
  //para los badges
  //badge = 0
  //badges = []
  //
  //numeritos

  constructor(private router: Router,
    private au: AuthService,
    private route: Router,
    private contactos: Contacts,
    private socialShare: SocialSharing,
    public fire: AngularFirestore) {

  }

  ngOnInit() {
    this.uu = this.au.pruebita();
    let h = this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.idusuario = this.usuario.uid

     let lis = this.au.ordenarcobrostransferencias(this.usuario.uid).subscribe(info => {
        this.historial = info.filter((valor, indiceActual, arreglo) => arreglo.findIndex((item) => item.telefono === valor.telefono
        ) === indiceActual);
        console.log(this.historial);

        if (this.historial.length > 0)
          this.c = 1
        this.importarcontactos()
        lis.unsubscribe()
      })
    })

    // cambiar estados1
    //   this.historial.forEach(element => {
    //       this.au.recuperacobrostransferencias1(element.clave, this.usuario.uid, false).subscribe(datos => {
    //       this.controladores = datos 
    //       const numeritos = this.controladores.length
    //       this.badges.push( {'a':numeritos} )
    //       //console.log(this.badges)
    //     })
    //
    //   });
    // cambiar estados
    //  this.historial.forEach(element => {
    //    let a = this.au.recuperacobrostransferencias1(element.clave, this.usuario.uid, false).subscribe(datos => {
    //      this.controladores = datos
    //      this.numeritos = this.controladores.length
    //      console.log('esta es la cantidad' + this.numeritos);
    //
    //      // this.badges.push({ 'a': numeritos })
    //      // console.log(this.badges)
    //      a.unsubscribe()
    //    })
    //  })
    // e.unsubscribe()
    //funcion para filtro de busqueda


  }
  codigo(num) {
    let nuevo = num.replace("+591", "").trim()
    return nuevo
  }

  BuscarHistorial(event) {
    this.textoBuscar = event.target.value;
    if (this.textoBuscar != '') {
      this.controlador = 1
      this.c = 2
    } else {
      this.controlador = 0
      this.c = 1
    }
  }

  paso() {
    this.router.navigate(['/tabs/historial/transferencias'])
  }

  enviadatos(usu) {
    // this.datito=this.badges[i] = 0
    this.route.navigate(['pagarenviocobro', usu.telefono, usu.formatted])
    //   let aux: any = []
    //   this.controladores.forEach((element: any) => {
    //     aux.push(this.au.actualizaestados({ estado: true }, element.id, this.usuario.uid))
    //   })
    //   Promise.all(aux).then(da => {
    //   //  console.log('termino de actualizar estados');
    //     console.log(i);

    //    })
    //this.au.recuperacobrostransferencias1(usu.clave,this.usuario.uid,false).subscribe (datos =>{
    //  datos.forEach(element => {
    //    console.log(element);
    //    this.au.actualizaestados({ estado: true }, this.usuario.uid)
    //  });
    //  //
    //})
  }

  enviadatos2(usu) {
    this.route.navigate(['pagarenviocobro', usu.telefono, usu.nombre])
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

  importarcontactos() {
    this.au.contactosprueba(this.usuario.uid).subscribe(dat => {
      const a = JSON.parse(dat[0].value)
      this.contactstext = a.todo
      const order = this.au.ordenarjson(this.contactstext, 'nombre', 'asc')
      order.forEach(element => {
        this.au.verificausuarioActivo(element.telefono).subscribe(res => {
          if (res.length > 0) {
            this.ContactsTrue.push(element)
          } else {
            this.ContactsNone.push(element)
          }
        })
      });
    })
  }
}
