import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../utils/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class DesarrolloService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(Constants.HOST + '/desarrollo/getAll')
  }
}
