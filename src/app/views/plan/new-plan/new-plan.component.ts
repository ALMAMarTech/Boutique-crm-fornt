import {Component, OnInit} from '@angular/core';
import {Plan} from "../../../model/plan";
import {Usuario} from "../../../model/usuario";
import {NgxSpinnerService} from "ngx-spinner";
import {forkJoin} from "rxjs";
import {UsuarioService} from "../../../services/usuario.service";
import {TipoPlan} from "../../../model/tipo-plan";
import {PlanService} from "../../../services/plan.service";
import {Desarrollo} from "../../../model/desarrollo";
import {DesarrolloService} from "../../../services/desarrollo.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css']
})
export class NewPlanComponent implements OnInit {

  public plan: Plan = new Plan();
  public gerentes: Usuario[] = [];
  public planes: TipoPlan[] = [];
  public desarrollos: Desarrollo[] = [];

  constructor(private spinner: NgxSpinnerService,
              private usuarioService: UsuarioService,
              private planService: PlanService,
              private desarrolloService: DesarrolloService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.spinner.show().then(() => {
      let gerentesGet = this.usuarioService.getByRol('ROLE_GERENTE');
      let planesGet = this.planService.getTipoPlanes();
      let desarrollosGet = this.desarrolloService.getAll();
      forkJoin([gerentesGet, planesGet, desarrollosGet]).subscribe({
        next: response => {
          this.gerentes = response[0] as Usuario[];
          this.planes = response[1] as TipoPlan[];
          this.desarrollos = response[2] as Desarrollo[];
          this.spinner.hide().then(() => {
          });
        },
        complete: () => {
          this.spinner.hide().then(() => {
          });
        }
      });
    });
  }

  calculateCostoTierra() {
    if (this.plan.metro < 0) {
      this.plan.costoTierra = 0;
    } else {
      this.plan.costoTierra = 1400 * this.plan.metro;
    }
    this.calculateTotalCoinversion();
  }

  calculateCodigo() {
    if (this.plan.desarrollo.id == 0) {
      this.plan.financiamiento.codigo = this.plan.financiamiento.tipoInversion;
    } else {
      let desarrollo = this.desarrollos.filter(value => value.id == this.plan.desarrollo.id);
      if (desarrollo.length > 0) {
        this.plan.financiamiento.codigo = desarrollo[0].nombre + ' ' + this.plan.financiamiento.tipoInversion;
      } else {
        this.plan.financiamiento.codigo = this.plan.financiamiento.tipoInversion;
      }
    }
    this.plan.financiamiento.codigo = this.plan.financiamiento.codigo.toUpperCase()
  }

  calculateTotalCoinversion() {
    this.plan.financiamiento.totalCoinversion = this.plan.metro * this.plan.financiamiento.inversionMetro;
    let porcentajePremio = (this.plan.financiamiento.totalCoinversion * this.plan.financiamiento.porcentajePremio) / 100;
    this.plan.financiamiento.totalCoinversion = this.plan.financiamiento.totalCoinversion - porcentajePremio;

    this.plan.financiamiento.totalEnganche = (this.plan.financiamiento.totalCoinversion * this.plan.enganche) / 100;

    this.plan.financiamiento.saldoFinal = this.plan.financiamiento.totalCoinversion - this.plan.financiamiento.totalEnganche;

    if (this.plan.financiamiento.plazoEnganche <= 0) {
      this.plan.financiamiento.mensualidadEnganche = 0;
    } else {
      this.plan.financiamiento.mensualidadEnganche = Number((this.plan.financiamiento.totalEnganche / this.plan.financiamiento.plazoEnganche).toFixed(2));
    }

    if (this.plan.financiamiento.plazo <= 0) {
      this.plan.financiamiento.mensualidad = 0;
    } else {
      this.plan.financiamiento.mensualidad = Number((this.plan.financiamiento.saldoFinal / this.plan.financiamiento.plazo).toFixed(2));
    }

    if(this.plan.costoTierra <= 0){
      this.plan.utilidad = 0;
    }else{
      this.plan.utilidad = (this.plan.financiamiento.totalCoinversion / this.plan.costoTierra) - 1;
      this.plan.utilidad = Math.round(this.plan.utilidad * 100);
    }
  }

  guardar() {
    this.spinner.show().then(() => {
      this.planService.guardar(this.plan).subscribe({
        next: () => {
          swal.fire('', 'Plan almacenado con éxito', 'success').then(() => {
            this.router.navigate(['/home']).then(() => {});
          });
        },
        complete: () => {
          this.spinner.hide().then(() => {});
        }
      });
    });
  }
}
