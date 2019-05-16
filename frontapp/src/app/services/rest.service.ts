import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const productUrl = 'http://localhost:2500/api/';
const userUrl = 'http://localhost:3500/api/';

interface Options {
  hasAuth ?: boolean;
  url: string;
  header?: HttpHeaders;
  payload?: any;
  params?: HttpParams;
  isProduct ?: boolean;
}

interface ServerResponse {
    hasError: boolean;
    message: string;
    payload?: any;
    statusCode: number;
    graph?: any;
    pagination ?: any;
    token: string;
    role: string;
    username: string;
    user: string;

}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) {}


    post(options: Options) {
        const hasAuth = options.hasAuth || false;
        const isProduct = options.isProduct || false;
        let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
        let finalUrl;
        if (isProduct) {
            finalUrl = productUrl + options.url;
        } else { finalUrl = userUrl + options.url; }
        if (hasAuth) {
            header = header.set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        }
        return this.httpClient.post<ServerResponse>(finalUrl, options.payload, {headers: header});

    }

    put(options: Options) {
        const hasAuth = options.hasAuth || false;
        const isProduct = options.isProduct || false;
        let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
        let finalUrl;
        if (isProduct) {
            finalUrl = productUrl + options.url;
        } else { finalUrl = userUrl + options.url; }
        if (hasAuth) {
            header = header.set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        }
        return this.httpClient.put<ServerResponse>(finalUrl, options.payload, {headers: header});

    }

    delete(options: Options) {
        const hasAuth = options.hasAuth || true;
        const isProduct = options.isProduct || false;
        let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
        let finalUrl;
        if (isProduct) {
            finalUrl = productUrl + options.url;
        } else { finalUrl = userUrl + options.url; }
        if (hasAuth) {
            header = header.set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        }
        const params = options.params;
        header = header.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this.httpClient.delete<ServerResponse>(finalUrl, {headers: header, params});
    }

    get(options: Options) {
        const isProduct = options.isProduct || false;
        const hasAuth = options.hasAuth || false;
        let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
        const payload = options.payload;
        let finalUrl;
        if (isProduct) {
            finalUrl = productUrl + options.url;
        } else { finalUrl = userUrl + options.url; }
        if (hasAuth) {
            header = header.set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        }
        header = header.append('Access-Control-Allow-Origin', '*');
        console.log(header, 'here header');

        return this.httpClient.get<ServerResponse>(finalUrl, {headers: header, params: payload});
    }



}
