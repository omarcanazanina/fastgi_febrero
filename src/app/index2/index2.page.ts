import { Component, OnInit } from '@angular/core';
import {  AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-index2',
  templateUrl: './index2.page.html',
  styleUrls: ['./index2.page.scss'],
})
export class Index2Page implements OnInit {
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(private au: AuthService,
    public alertCtrl: AlertController,
    private fcm: FCM,
    private router: Router
  ) { 
  
  }
  //@ViewChild('focus', { static: true }) myInput;
  usuario = {
    uid: ""
  }
  existe: any

  ngOnInit() {
    
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    })
    /* setTimeout(() => {
       this.myInput.setFocus();
     }, 150) */

  }

  //logueo
  logueo(codtel,phoneNumber) {
    let subs = this.au.verificausuarioexistente(phoneNumber.toString())
      .subscribe(resul => {
        this.existe = resul
        subs.unsubscribe();
        if (this.existe == '') {
          this.au.usuarionoexiste()
        } else {
          let load = this.au.loadinginicio();
          const appVerifier = this.recaptchaVerifier;
          const phoneNumberString = codtel + phoneNumber.toString();
          firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
            .then(async confirmationResult => {
              load.then(loading => {
                loading.dismiss()
              })
              const alert = await this.alertCtrl.create({
                header: 'Ingrese codigo',
                inputs: [{ name: 'confirmationCode', placeholder: 'Codigo de confirmacion login' }],
                backdropDismiss: false,
                buttons: [
                  {
                    text: 'Cancelar',
                    handler: data => { console.log('Cancel clicked'); }
                  },
                  {
                    text: 'Enviar',
                    handler: data => {
                      confirmationResult.confirm(data.confirmationCode).then((result) => {
                        this.fcm.getToken().then(t => {
                          this.au.actualizatoken({ token: t }, result.user.uid).then(() => {
                            this.au.recuperaundato(result.user.uid).subscribe(usuario => {
                              this.usuario = usuario;
                              this.router.navigate(["/tabs/tab2"])
                            })
                          }).catch(error => {
                          })
                        }).catch(err => {
                        })

                      }).catch((error) => {
                        console.log('este es el errorh' + error);
                        this.au.codigoinvalido()
                        // User couldn't sign in (bad verification code?)
                      })
                    }
                  }
                ]
              });
              alert.present();
            })
            .catch( error =>{
              alert('no se envio sms desde el logueo')
              console.error("SMS not sent", error);
              load.then(loading => {
                loading.dismiss()
              }) 
            });
        }
      })
  }
}