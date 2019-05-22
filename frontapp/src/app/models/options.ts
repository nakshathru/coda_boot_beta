import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    hasAuth?: boolean;
    url: string;
    header?: HttpHeaders;
    payload?: any;
    params?: HttpParams;
    isProduct?: boolean;
  }