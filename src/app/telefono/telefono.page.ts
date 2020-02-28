import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../servicios/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.page.html',
  styleUrls: ['./telefono.page.scss'],
})
export class TelefonoPage implements OnInit {

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  datos: any
  nombre = ''
  email = ''
  pin = 0
  cajainterna = 0
  estado = 0
  contacts=0
  constructor(
    private route: Router,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fire: AngularFirestore,
    public au: AuthService,
    private fcm: FCM, 
    private nav: NavController,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1', {
      'size': 'invisible'
    })
  }
    // registrar usuario
    registrar(codtel,phoneNumber) {
      let verifi = this.au.verificausuarioexistente(phoneNumber.toString()).subscribe(usu => {
        this.datos = usu
        verifi.unsubscribe()
        if (this.datos != '') {
          this.au.usuarioyaexiste()
        } else {
          let load = this.au.loadinginicio();
          const appVerifier1 = this.recaptchaVerifier;
          const phoneNumberString = codtel + phoneNumber.toString();
          const phoneNumber1 = phoneNumber.toString();
          firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier1)
            .then(async confirmationResult => {
              load.then(loading => {
                loading.dismiss()
              })
              const alert = await this.alertCtrl.create({
                header: 'Ingrese codigo',
                inputs: [{ name: 'confirmationCode', placeholder: 'Codigo de confirmacion registrarse' }],
                backdropDismiss: false,
                buttons: [
                  {
                    text: 'Cancelar',
                    handler: data => { console.log('Cancel clicked'); }
                  },
                  {
                    text: 'Enviar',
                    handler: data => {
                      confirmationResult.confirm(data.confirmationCode)
                        .then((result) => {
                          let load = this.au.loadinginicio();
                          this.fcm.getToken().then(token => {
                            this.au.crearcontel(result.user.uid, this.email, this.pin, this.nombre, codtel, phoneNumber1, this.cajainterna, token, this.estado,this.contacts)
                            this.au.creocorrecto();
                            load.then(loading => {
                              loading.dismiss()
                            })
                            this.route.navigate(['/tabs/tab2']);
                          })
                        }).catch((error) => {
                          this.au.codigoinvalido()
                          // User couldn't sign in (bad verification code?)
                        })
                    }
                  }
                ]
              });
              alert.present();
            })
            .catch(function (error) {
              alert('no se envio el sms desde el registro')
              console.error("SMS not sent", error);
              alert(error)
            });
        }
      })
    }
  

}
