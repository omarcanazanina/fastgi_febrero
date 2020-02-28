
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import {HttpClient,HttpHeaders} from '@angular/common/http';
/*import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
*/
@Injectable({
  providedIn :'root'
})
export class FcmService {
url = "https://fcm.googleapis.com/fcm/send"
headers = new HttpHeaders({
  "Content-Type": "application/json",
  "Authorization": "key=AAAAgh_1keE:APA91bF0MY-L7chTMfY565G5IWgNfGjnTqGvjSaS2sE1FBflEGATKm9ZEVdmjUNDevV4MtNUMiYpOwuXRASq6RFJdreS5QpPtp1BwSFiOTcANr3mz1bHt5cUWaTgjtV8xIibkKOJsZTR"
})
  constructor( private fcm: FCM,private http: HttpClient) {}
  
  getToken() {
    return this.fcm.getToken()
  }
  //envia mensajes a firebase
  notificacionforToken(titulo:string, body:string, token_cli, id:string, page:string) {
    let notificacion = { 
      "notification":{
        "title":titulo,
        "body":body,
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "landing_page": page,
        "idusu": id,
        "omar":titulo,
        "jaime":body
      },
      "to" : token_cli,
      "priority": "high",
      "restricted_package_name": ""
    }
    console.log(notificacion);
    return this.http.post(this.url,notificacion , { headers: this.headers })
      .toPromise()
  }

  //envia mensajes a firebase
  notificacionforTopic(titulo, body, topic, id, page) {
    let notificacion = {
      "notification": {
        "title": titulo,
        "body": body,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "landing_page": page,
        "idusu": id,
        "dt":titulo,
        "dm":body
      },
      "to": topic,
      "priority": "high",
      "restricted_package_name": ""
    }
    return this.http.post(this.url, notificacion, { headers: this.headers })
      .toPromise()
  }
  notificacionforToken1(titulo:string, body:string, token_cli, id:string) {
    let notificacion = { 
      "notification":{
        "title":titulo,
        "body":body,
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "idusu": id,
        "omar":titulo,
        "jaime":body
      },
      "to" : token_cli,
      "priority": "high",
      "restricted_package_name": ""
    }
    console.log(notificacion);
    return this.http.post(this.url,notificacion , { headers: this.headers })
      .toPromise()
  }

  /*
  refresh(){
    this.fcm.onTokenRefresh().subscribe(token => {
      backend.registerToken(token);
    });
  }
 */
 
}
/* async getToken() {
    console.log("desde fcm entro ");
    
    let token;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }
    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;
    const devicesRef = this.afs.collection('devices');
    const data = {
      token,
      userId: 'laprueba'
    };
    return devicesRef.doc(token).set(data);
  }
  onNotifications() {
    return this.firebase.onNotificationOpen();
  }*/

