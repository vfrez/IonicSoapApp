import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoapPage } from './soap';


@NgModule({
  declarations: [
    SoapPage,
  ],
  imports: [
    IonicPageModule.forChild(SoapPage),
  ]
})
export class SoapPageModule {}
