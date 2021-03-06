import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})

export class AutomlService {
 
    constructor(
        private http: HttpClient,
    ) { }

    // headers = {
    //     'Authorization': 'Bearer ya29.GltYB7fde3MqwkpiiuTgg173lPJwndaSEY2h7ctJctZg_IIteGfVD-gxs1yFWjhQhHxN9to7MTt9O71H4LsF4BqvDXGxxUed-h-VqAPxwyCuR4W3mohS6UjEFH5u',
    //     'Content-Type': 'application/json'
    // };
    
    endpoint= 'https://automl.googleapis.com/v1beta1/projects/mimibot-6c7f4/locations/us-central1/models/TCN3743886279935490659:predict?key=AIzaSyBS7jSXrkpEtIj60f2GcC6IYGGdoGf8BKA';
    //endpoint= 'https://automl.googleapis.com/v1beta1/projects/mimibot-6c7f4/locations/us-central1/models/TCN3743886279935490659:predict'

    dataString = {
        "payload" : {
            "textSnippet": {
                "content": "YOUR TEXT HERE",
                "mime_type": "text/plain"
            },
        }
    };
    
    // options = {
    //     url: 'https://automl.googleapis.com/v1beta1/projects/mimibot-6c7f4/locations/us-central1/models/TCN3743886279935490659:predict',
    //     method: 'POST',
    //     headers: this.headers,
    //     body: this.dataString
    // };
    
    // httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'Authorization': 'ya29.GltYB-pHuXXFm7cWrq6dPH_vpTBAKQUEoKkI4CexrDvbCo2iSyGzTWye-PeLNdSouFiHJFNdJ3ZfJ8RGq1bGKmzvsY6F3fhT3WZL2ZOqesVtee23tNBOt0cjLHwR'
    //     }),
    //     observe: 'response',
    //     params: new HttpParams().set('text', 'He beat me')
    //   };

    
}