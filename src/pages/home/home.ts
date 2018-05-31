import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TwdServiceProvider } from '../../providers/twd-service/twd-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,public twdService: TwdServiceProvider) {
  }


  goList(){
    this.navCtrl.push("ListaPage")
  }

  goSoap(){
    this.navCtrl.push("SoapPage")
  }


}