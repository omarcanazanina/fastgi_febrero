import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx'
import { Router } from '@angular/router';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  encodeData: any;
  scannedData: {};

  constructor(
    private route: Router,
   // private local: LocalNotifications,
    private fcm: FCM,
    private alertController: AlertController,
    public toastController: ToastController,
    
    public plt: Platform
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.dark()
    this.fcm.subscribeToTopic('marketing');
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
        this.route.navigate(data.landing_page)
      } else {
       const a=this.plt.is('ios')
       //alert(a)
        //this.confirma(data.omar,data.jaime)
        this.confirma(data.omar, data.jaime, data.landing_page)
        // alert(data.omar+" "+data.jaime+" "+data.landing_page)
        //this.route.navigate(data.landing_page)
      };
    },err=>{
     //console.log("no funciona !!!!!!!!!!!");
      console.log(err);
    }
    );
    //this.fcm.unsubscribeFromTopic('marketing');
  }

  async presentAlertConfirm(t, m, ruta) {
    const alert = await this.alertController.create({
      header: t,
      message: m,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.route.navigate(ruta)
          }
        }
      ]
    });
    await alert.present();
  }


  async confirma(t,m,ruta) {
    const toast = await this.toastController.create({
      header: t,
      message: m,
      position: 'top',
      buttons: [
     {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {  
            this.route.navigate(ruta)
          }
        }
      ]
    });
    toast.present();
  }

  dark(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(prefersDark.matches){
      document.body.classList.toggle('dark')
    }
    
  }

}
