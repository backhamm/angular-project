import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from "@service/storage.service";


@Injectable({
    providedIn: 'root'
})
export class Request {
    headers: any;
    constructor(private httpClient: HttpClient, private storage: StorageService) {
        this.headers = new HttpHeaders();
    }

    // GET请求
    get(url: string, paramMap: {} = {}): Observable<any> {
        return this.httpClient.get(url, {params: Object.assign(paramMap, {
            terminal: '0'
          })
        });
    }

    // POST请求
    post(url: string, paramMap: {} = {}): Observable<any> {
      const params = new HttpParams({
            fromObject: Object.assign(paramMap, {
              terminal: '0'
            })
        });
        return this.httpClient.post(url, params);
    }
}
