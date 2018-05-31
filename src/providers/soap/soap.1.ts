//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SoapService } from "autopulous-angular2-soap/soap.service";


/*
  Generated class for the SoapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoapProvider {

  private servicePort:string = 'https://www.bhan.com.br';
  private servicePath:string = '/wbsStoreage/VirtualWsServer.exe/soap/IdmDados/';
  private targetNamespace:string = '';

  private responseJso:{} = null;

  private soapService:SoapService;

  constructor() {
      this.soapService = new SoapService(this.servicePort, this.servicePath, this.targetNamespace);
      this.soapService.envelopeBuilder = this.envelopeBuilder;
      this.soapService.jsoResponseHandler = (response:{}) => {this.responseJso = response};
      this.soapService.localNameMode = true;
      console.log('soap')
  }

  private username:string = '';
  private password:string = '';

  public login(username:string, password:string) {
      var method:string = 'Login';
      var parameters:{}[] = [];

      this.username = username;
      this.password = password;

      parameters['LoginRequest xmlns="urn:application:security:messages:1:0"'] = SoapProvider.userLogin(username, password);

      this.soapService.post(method, parameters);
  }

  private static userLogin(username, password):{}[] {
      var parameters:{}[] = [];

      parameters["UserName"] = username;
      parameters['Password'] = password;

      return parameters;
  }

  private envelopeBuilder(requestBody:string):string {
      return "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
             "<SOAP-ENV:Header>" +
             "<wsse:Security SOAP-ENV:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" soapenv =\"http://schemas.xmlsoap.org/soap/envelope/\">" +
             "<wsse:UsernameToken wsu:ld=\"UsernameToken-104\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" >" +
              "<wsse:Username>" + this.username + "</wsse:Username>" +
              "<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">" + this.password + "</wsse:Password>" +
              "</wsse:UsernameToken>" +
              "</wsse:Security>" +
              "</SOAP-ENV:Header>" +
              "<SOAP-ENV:Body>" +
              requestBody +
              "</SOAP-ENV:Body>" +
              "</SOAP-ENV:Envelope>";
  }

}