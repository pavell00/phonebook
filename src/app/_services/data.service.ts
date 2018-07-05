import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Employee } from '../_models';

import {Observable} from 'rxjs';
import { pipe} from 'rxjs';
import { BehaviorSubject, Subject} from "rxjs";

//import "rxjs/add/operator/combineLatest";

@Injectable()
export class DataService {

  dataUrl = 'assets/generated.json';

  constructor(private http: HttpClient) { }

  getADUsers(): Observable<Employee[]> {
    //return this.http.get<Employee[]>(this.dataUrl);
    return this.http.get<Employee[]>(this.dataUrl)
      .pipe(
       
      )
  }

  getRx():Promise<any[]> {
    return this.http.get(this.dataUrl)
        .toPromise()
        .then(this.extractData)
        //.then()
        .catch(err => {
            return Promise.reject(err.error || 'Server error');
        });
  }
  
  getArray() {
    return [{name:"archie",age:25}, {name:"jake",age:25}, {name:"richard",age:30}];
  }

  extractData(res: HttpResponse<Object>) {
    var array = new Array();
    var key, count = 0;
    for(key in res) {
        array.push(res[count++]);
    }
    return array;
  }

  getData(): Promise<any> {
    return this.http.get(this.dataUrl)
    .toPromise()
    .then(this.extractData)
    .catch(err => {
        return Promise.reject(err.error || 'Server error');
    });
  }

}