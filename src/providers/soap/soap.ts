import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SoapService } from "autopulous-angular2-soap/soap.service";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import parse from './xmlToJs'
//import parser from 'xml2js'

/*
  Generated class for the SoapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoapProvider {
  data: any;
  dataRes: any;
  constructor(public http: HttpClient, public http2: Http) {
    console.log("Hello HeroService");
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http
        .get(`https://www.bhan.com.br/wbsStoreage/VirtualWsServer.exe/soap/IdmDados`)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log('Data:' + data)
        });
    });
  }

  buscaSoap(){
    if (this.data) {
      return Promise.resolve(this.data);
    }
    // var emp = '<<credentials to the webservice>>';
    // var login = '<<credentials to the webservice>>';
    // var pass = '<<credentials to the webservice>>';
    // var id = "<<credentials to the webservice>>";
    let envText
    let envParser
    let envObj
    let xmlText
    let xmlParser
    let xmlObj

    return new Promise(resolve => {

    const body = 
    '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:udmDados-IdmDados"><soapenv:Header/><soapenv:Body>\
      <urn:requisicao soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\
        <XML xsi:type="xsd:string">\
          <requisicao in_schema="F">\
            <loginws cd_loginws="vestsultrn" cd_senhaws="123456" in_central="n" />\
            <reqD cd_req="comprasPorAno" \
            acao="con" \
            nr_cpfcnpj="07242584000150" \
            dt_compraini="" \
            dt_comprafin="" \
            dt_central="2018-05-18" \
            nr_cpfcnpjcli="07242584000150" \
            nr_cpfcnpjguia="" \
            tp_rating="" \
            cd_empresa="1001" \
            ds_emplib="1001" /> /&gt;\
          </requisicao>\
        </XML>\
      </urn:requisicao>\
    </soapenv:Body></soapenv:Envelope>'

    const url = `https://www.bhan.com.br/wbsStoreage/VirtualWsServer.exe/soap/IdmDados`;
    console.log('onClickme opened');

    this.http.post(url, body
      , {
       headers: new HttpHeaders()
       .set('Accept', 'application/xml')
       .set('Content-Type', 'application/x-www-form-urlencoded') 
      // .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
      // .append('Access-Control-Allow-Origin', '*')
      // .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
    ,responseType: 'text'})
  //.map(res => xml2js.parseString(res, (err, result)=>{console.log(result)}))
    .subscribe(data => {
        this.data = data;
       
        //Transformar envelope em Json
        envText = data;
        envParser = new DOMParser().parseFromString(envText, "text/xml");
        envObj = parse(envParser);

        console.log(envObj)      

        //Transformar retorno XML em Json 
        xmlParser = new DOMParser().parseFromString(envObj.SOAP.SOAP.NS1.return.text, "text/xml");
        xmlObj = parse(xmlParser);
        console.log(xmlObj)
        //console.log(data);

        resolve(xmlObj);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err);
          //console.log(err.error.text);
        }
      },
    );

  })

  }
}
//Referências
//https://stackoverflow.com/questions/47159604/retrieve-xml-from-httpclient-on-angular-5
//https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient
//https://angular.io/guide/http
//https://stackoverflow.com/questions/17314185/soap-response-xml-to-json