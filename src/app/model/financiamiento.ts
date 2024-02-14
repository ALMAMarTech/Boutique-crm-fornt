import {Pago} from "./pago";

export class Financiamiento {
  id: number = 0;
  createdBy: number = 0;
  modifiedBy: number = 0;
  createDate: Date = new Date();
  modificationDate: Date = new Date();
  plazoEnganche: number = 0;
  plazo: number = 0;
  tipoInversion: string = '';
  codigo: string = '';
  etapa: string = '';
  coinversion: number = 0;
  inversionMetro: number = 0;
  totalEnganche: number = 0;
  totalCoinversion: number = 0;
  saldoFinal: number = 0;
  porcentajePremio: number = 0;
  mensualidadEnganche: number = 0;
  mensualidad: number = 0;
  pagos: Pago[] = [];
}
