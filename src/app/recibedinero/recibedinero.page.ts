import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../servicios/auth.service';

import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-recibedinero',
  templateUrl: './recibedinero.page.html',
  styleUrls: ['./recibedinero.page.scss'],

})
export class RecibedineroPage implements OnInit {
  usuario = {
    telefono: "",
    nombre: ""
  }

  uu: any;
  correo = null;
  createdCode = null;
  usu = 0
  //prueba para descargar
  qrData = 'omarcanazanina';
  scannedCode = null;
  scannedCode1: any;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  //prueba para descargar otro
  qrcodename: string;
  title = 'generate-qrcode';
  elementType1: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  href: string;

  canvasElement:any
  canvas:any
  constructor(private barcode: BarcodeScanner,
    private au: AuthService,
    private base64ToGallery: Base64ToGallery,
    private toastController: ToastController,
    private plat: Platform
  ) {
  }

  ngAfterViewInit(){
  }

  //otro lector
  scan() {

    this.barcode.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData
        this.scannedCode1 = JSON.stringify(this.scannedCode.text)
      }
    )
  }
  async a() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  downloadQR() {
    alert('entro al metodo')
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data :',imageData);
     let data = imageData.split(',')[1];

    console.log(data)
    this.base64ToGallery.base64ToGallery(data,
     {prefix: '_img', mediaScanner:true})
     .then(async res =>{
       alert('entro a la descarga')
       const toast = await this.toastController.create({
         message: 'Se guardo existosamente.',
         duration: 2000
       });
       toast.present();
     },err => alert('error es:'+err)
     );
    // this.base64ToGallery.base64ToGallery(data,
    //   { prefix: '_img', mediaScanner: true }).then(res => {
    //     alert('se guardo existosamente' + res)
    //     //let toast =await this.toastController.create({
    //     //  header:'se guardo exitosamente'
    //     //});
    //     //toast.present()
    //   }, err => alert('err:' + err))

    // this.base64ToGallery.base64ToGallery(data,{prefix:'_img', mediaScanner: true}).then( res=>{
    //   alert('se guardo existosamente', res)
    //    //let toast =await this.toastController.create({
    //    //  header:'se guardo exitosamente'
    //    //});
    //    //toast.present() 
    //   },err => alert('err:'+ err) )
  }

  downloadQR1() {
    alert('entro al metodo')
    const DataUrl = this.canvasElement.toDataURL()
    const options :Base64ToGalleryOptions={prefix:'_img', mediaScanner: true}
    this.base64ToGallery.base64ToGallery(DataUrl,options).then ( async res=>{
      alert('entro a la descarga')
      const toast = await this.toastController.create({
        message: 'Se guardo existosamente.',
        duration: 2000
      });
    })
  }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.createdCode = this.usuario.telefono;
      if (this.usuario.nombre == '') {
        this.usu = 0
      } else {
        this.usu = 1
      }
    })

  }


  generateQRCode() {
    if (this.qrcodename == '') {
      this.display = false;
      alert("Please enter the name");
      return;
    }
    else {
      this.value = this.qrcodename;
      this.display = true;
    }
  }


  downloadImage() {
    this.href = document.getElementsByTagName('img')[3].src;
  }

}
