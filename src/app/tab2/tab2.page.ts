import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
//import { EnviadatosgmailPage } from '../enviadatosgmail/enviadatosgmail.page';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  gruponum = [7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0, 'v']
  cont1 = 0
  pin = ""
  //  @ViewChild('input', { static: true }) myInput;
  //lo nuevo
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  //
  cadena = "omaro.aa"
  public data = {
    text: ""
  };
  uu: any
  option: BarcodeScannerOptions;
  constructor(public bar: BarcodeScanner,
    private route: Router,
    public fire: AngularFirestore,
    private au: AuthService,
    public alertController: AlertController,
    private fcm: FCM,
    private contactos: Contacts,
    private Platform: Platform,
    private keyboard: Keyboard
  ) {
    //lo nuevo
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

  }
  cont
  correo: string;
  usuario = {
    cajainterna: "",
    correo: "",
    telefono: "",
    password: "",
    monto: "",
    nombre: "",
    uid: "",
    pass: "",
    estado: "",
    token: "",
    contacts:""
  }
    ;
  lista: any;
  caja: number
  caja1: any

  tokencel: any


  separado: any

  nombrebd
  ngOnInit() {
    // setTimeout(() => {
    //   this.myInput.setFocus();
    //   this.ocultar1()
    // }, 150)
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.guardar_contactos()
      this.cerrarsesionotro()
      //if (this.Platform.is('ios')) {
      //  this.au.recuperaundato('AstYEx3dWlZvtLZdREpi1DhRkYj1').subscribe(usuario => {
      //    this.usuario = usuario;
      //    this.route.navigate(["/tabs/tab3"])
      //  })
      //}else{
      //  console.log('es otro dispositivp');
      //  
      //}
    })

    //prueba de ordenar json
    //this.ordenado = this.au.ordenarjson(this.vegetales, "nombre", "desc")
    //console.log(this.ordenado);

  }
  // funcion para cerrar la sesion de otro dispositivo
  cerrarsesionotro() {
    this.fcm.getToken().then(t => {
      this.tokencel = t
      if (this.tokencel == this.usuario.token) {
        //alert('es el dispositivo')
      } else {
        this.au.cerrarsesion()
      }
    })
  }


  scan() {
    this.option = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417 ',
      orientation: 'landscape',
      prompt: "por favor lea el codigo QR"
    }
    this.bar.scan(this.option).then(barcodeData => {
      this.data = barcodeData;
      const convertido = this.data.text.split("/");
      const convertido1 = convertido[0];
      const convertido2 = convertido[1];
      var c = 0;
      var letra = "/"
      for (var i = 0; i <= this.data.text.length; i++) {
        if (this.data.text[i] == letra) {
          c++
        }
      }
      if (c == 0 && this.data.text != "") {
        this.route.navigate(['/tabs/tab2/cards', this.data.text])
      } else {
        this.route.navigate(['/tabs/tab2/escaner', convertido1, convertido2])
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  historial() {
    this.route.navigate(['/tabs/tab2/ingresoegreso'])
  }


  //guardar contactos en la BD
  guardar_contactos() {
    if (parseInt(this.usuario.contacts) == 0) {
      let options = {
        filter: '',
        multiple: true,
        hasPhoneNumber: true
      }
      this.contactos.find(['*'], options).then((contactos: Contact[]) => {
        for (let item of contactos) {
          this.au.verificausuarioActivo(this.au.codigo(item.phoneNumbers[0].value)).subscribe(resp => {
            if (resp.length > 0) {
              this.fire.collection('/user/' + this.usuario.uid + '/contactos').add({
                nombre: item.name.formatted,
                telefono: this.au.codigo(item.phoneNumbers[0].value),
                estado: 1
              })
            } else {
              this.fire.collection('/user/' + this.usuario.uid + '/contactos').add({
                nombre: item.name.formatted,
                telefono: this.au.codigo(item.phoneNumbers[0].value),
                estado: 0
              })
            }
          })

        }
        this.au.actualizarcontacts({ contacts: 1 }, this.usuario.uid);
      })
    } else {
    }
  }

  funcion() {
    let c = this.cadena.indexOf('.')
    console.log(c);
    this.separado = this.cadena.substring(c + 1, this.cadena.length)
    console.log(this.separado);
    
  }

}






