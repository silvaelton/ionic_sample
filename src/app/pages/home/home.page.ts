import { Component } from '@angular/core';
import { Car } from 'src/app/models/car';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertController } from '@ionic/angular';
import { CarService } from 'src/app/services/car.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  public cars: Car[];
   
  constructor(private _loading: LoadingService,
              private _alertCtrl: AlertController,
              private carService: CarService ) {}

  ionViewDidEnter() {
    this._loading.present('Aguarde, os carros estão sendo carregados.');

    this.carService.list()
      .subscribe(
        (cars) => {
          this.cars = cars;
          this._loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err.message)

          this._loading.dismiss();

          this._alertCtrl.create({
            header: "Falha na conexão",
            message: "Não foi possível carregar a lista de carros",
            buttons: [{ text: 'Ok' }]
          }).then(a => {
            a.present();
          })
        }
      );  
  }
}
