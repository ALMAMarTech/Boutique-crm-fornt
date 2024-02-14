import {Component, OnInit} from '@angular/core';
import {Plan} from "../../../model/plan";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../../services/plan.service";
import {Pago} from "../../../model/pago";
import swal from "sweetalert2";

@Component({
  selector: 'app-cobranza-detail',
  templateUrl: './cobranza-detail.component.html',
  styleUrls: ['./cobranza-detail.component.css']
})
export class CobranzaDetailComponent implements OnInit {

  public plan: Plan = new Plan();
  public pagos: Pago[] = [];
  private idPlan: number = 0;
  public procesarPagoIndex: number = -1;
  public procesandoPago: boolean = false;
  public pagoConfirmado: number = 0;

  constructor(private spinner: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute,
              private planService: PlanService) {
  }

  ngOnInit(): void {
    let routeValue = this.route.snapshot.params['idPlan'];
    if (routeValue) {
      this.idPlan = routeValue;
      this.getData();
    } else {
      this.router.navigate(['']).then(() => {
      });
    }
  }

  private getData() {
    this.spinner.show().then(() => {
      this.planService.getById(this.idPlan).subscribe({
        next: value => {
          this.plan = value as Plan;
          this.generatePagos();
        },
        complete: () => {
          this.spinner.hide().then(() => {
          });
        }
      })
    });
  }

  private generatePagos() {
    this.pagos = [];
    let saldoCapital = this.plan.financiamiento.totalCoinversion;
    let totalEnganche = this.plan.financiamiento.totalEnganche;
    let i = 1;
    while (saldoCapital > 0) {
      let pagoFilter = this.plan.financiamiento.pagos.filter(value => value.numeroPago == i);
      if (pagoFilter.length > 0) {
        saldoCapital = pagoFilter[0].saldoCapital;
        if (totalEnganche > 0) {
          totalEnganche = totalEnganche - pagoFilter[0].mensualidadEnganche;
        } else {
          totalEnganche = 0
        }
        this.pagos.push(pagoFilter[0]);
      } else {
        let pagoNew = new Pago();
        pagoNew.numeroPago = i;
        pagoNew.mensualidad = Number(this.plan.financiamiento.mensualidad.toFixed(2));
        if (totalEnganche > 0) {
          pagoNew.mensualidadEnganche = Number(this.plan.financiamiento.mensualidadEnganche.toFixed(2));
          totalEnganche = totalEnganche - pagoNew.mensualidadEnganche;
        } else {
          totalEnganche = 0
        }
        pagoNew.totalMensualidad = Number((pagoNew.mensualidad + pagoNew.mensualidadEnganche).toFixed(2));
        pagoNew.saldoCapital = Number((saldoCapital - pagoNew.mensualidad - pagoNew.mensualidadEnganche).toFixed(2));
        if (pagoNew.saldoCapital < pagoNew.totalMensualidad) {
          pagoNew.saldoCapital = 0;
        }
        saldoCapital = pagoNew.saldoCapital;
        this.pagos.push(pagoNew);
      }
      i = i + 1;
    }
  }

  procesarPago(index: number, pago: Pago) {
    this.procesarPagoIndex = index;
    this.procesandoPago = true;
    this.pagoConfirmado = pago.totalMensualidad;
  }

  enviarPago(pago: Pago) {
    this.spinner.show().then(() => {
      pago.montoPagado = this.pagoConfirmado;
      this.planService.procesarPago(this.plan.financiamiento.id, pago).subscribe({
        next: value => {
          this.plan = value as Plan;
          this.generatePagos();
        },
        complete: () => {
          this.procesarPagoIndex = -1;
          this.procesandoPago = false;
          this.pagoConfirmado = 0;
          this.spinner.hide().then(() => {
          });
        }
      });
    });
  }

  generatePdf() {
    this.spinner.show().then(() => {
      this.planService.generatePdf(this.plan.id).subscribe({
        next: value => {
          let fileName = "estado_cuenta_" + this.plan.id + ".pdf";
          let blob: Blob = value.body as Blob;
          let a = document.createElement('a');
          a.download = fileName;
          a.href = window.URL.createObjectURL(blob);
          a.click();
        },
        error: err => {
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
}
