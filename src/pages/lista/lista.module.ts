import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPage } from './lista';
import {  HttpModule } from '@angular/http';
import { SearchPipe } from '../../pipes/search/search';
import { SortPipe } from '../../pipes/sort/sort';
//import {AppModule} from '../../app/app.module'

@NgModule({
  declarations: [
    ListaPage,
    SearchPipe,
    SortPipe,
  ],
  imports: [
    //AppModule,
    HttpModule,
    IonicPageModule.forChild(ListaPage),
  ],
  entryComponents:[
    ListaPage
  ]
})
export class ListaPageModule {}
