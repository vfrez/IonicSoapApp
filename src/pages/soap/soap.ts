import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SoapProvider} from '../../providers/soap/soap'

/**
 * Generated class for the SoapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-soap',
  templateUrl: 'soap.html',
})
export class SoapPage {

  public obj: any;
  public result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Soap: SoapProvider) {
    //this.getSoap()
    this.buscaSoaps()
  }

  getSoap(){
    this.Soap.load()
      .then(data => {
        this.obj = data;
        this.result = this.obj;
      });
  }

  buscaSoaps(){
    this.Soap.buscaSoap()
    .then(data => {
      this.obj = data;
      this.result = this.obj.retorno.reqD;
      //console.log(this.result.retorno.reqD[1].attributes)
    });
  }

//https://stackoverflow.com/questions/47159604/retrieve-xml-from-httpclient-on-angular-5
  ionViewDidLoad() {
    console.log('ionViewDidLoad SoapPage');
  }

}
