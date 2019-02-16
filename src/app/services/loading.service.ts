import { Injectable } from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Injectable()

export class LoadingService {
  isLoading = false;

  constructor(public loadingCtrl: LoadingController) {
  }

  async present(message = "") {
    this.isLoading = true;
    
    return await this.loadingCtrl.create({
      duration: 15000,
      message: message
    }).then( a => {
      a.present().then(() => {
        console.log('presented')
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'))
        }
      })
    })
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log("dismiss!"))
  }
}