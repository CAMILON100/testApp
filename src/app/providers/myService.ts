import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SERVERURL } from '../providers/constant';
import { Storage } from '@ionic/storage';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class MyService {
    public io;

    constructor(private http: HttpClient, private storage: Storage) { 
      console.log("holaa servicio");
    }


    apiData(method,Urlcomp,params,body) {

        let apiUrl = SERVERURL;
        let url = apiUrl+Urlcomp
        let headers = new HttpHeaders({
        'Content-Type':'application/json; application/x-www-form-urlencoded',
        'cache-control':'no-cache'
        });

        switch(method) {
            case 'GET':   return this.http.get(url, { headers: headers, params: params}); 
            case 'POST':  return this.http.post(url, body, {headers: headers, params: params}); 
            default:      return this.http.get(url, { headers: headers, params: params});
        }

    } 


}