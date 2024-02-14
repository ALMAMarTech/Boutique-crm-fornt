import {TipoPlan} from "./tipo-plan";
import {Usuario} from "./usuario";
import {Persona} from "./persona";
import {Desarrollo} from "./desarrollo";
import {Financiamiento} from "./financiamiento";

export class Plan {
  id: number = 0;
  createdBy: number = 0;
  modifiedBy: number = 0;
  createDate: Date = new Date();
  modificationDate: Date = new Date();
  unidad: number = 0;
  metro: number = 0;
  enganche: number = 0;
  costoTierra: number = 0;
  utilidad: number = 0;
  tipoPlan: TipoPlan = new TipoPlan();
  gerente: Usuario = new Usuario();
  persona: Persona = new Persona();
  desarrollo: Desarrollo = new Desarrollo();
  financiamiento: Financiamiento = new Financiamiento();
  //transient
  montoPagado: number = 0;
  montoPagar: number = 0;
}
