import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../utils/constants/constants";
import {Plan} from "../model/plan";
import {Pago} from "../model/pago";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) {
  }

  getTipoPlanes(): Observable<any> {
    return this.http.get(Constants.HOST + '/plan/getTipoPlanes')
  }

  guardar(plan: Plan): Observable<any> {
    return this.http.post(Constants.HOST + '/plan/save', plan)
  }

  getAllCobranza(): Observable<any> {
    return this.http.get(Constants.HOST + '/plan/getAllCobranza')
  }

  getById(idPlan: number): Observable<any> {
    return this.http.get(Constants.HOST + '/plan/getById/' + idPlan)
  }

  procesarPago(idFinanciamientoValue: number, pagoValue: Pago): Observable<any> {
    let data = {
      idFinanciamiento: idFinanciamientoValue,
      pago: pagoValue
    }
    return this.http.post(Constants.HOST + '/plan/procesarPago', data)
  }

  generatePdf(idPlan: number): Observable<any> {
    return this.http.get(Constants.HOST + '/plan/generatePdf/' + idPlan, {observe:'response',responseType: 'blob'})
  }
}
