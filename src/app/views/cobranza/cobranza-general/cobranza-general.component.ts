import { Component, OnInit } from '@angular/core';
import {Plan} from "../../../model/plan";
import {NgxSpinnerService} from "ngx-spinner";
import {PlanService} from "../../../services/plan.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cobranza-general',
  templateUrl: './cobranza-general.component.html',
  styleUrls: ['./cobranza-general.component.css']
})
export class CobranzaGeneralComponent implements OnInit {

  public planes: Plan[] = []

  constructor(private spinner: NgxSpinnerService,
              private planService: PlanService,
              private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.spinner.show().then(() => {
      this.planService.getAllCobranza().subscribe({
        next: value => {
          this.planes = value as Plan[];
        },
        complete: () => {
          this.spinner.hide().then(() => {});
        }
      });
    });
  }

  goToDetail(idPlan: number) {
    this.router.navigate(['cobranza/detail/' + idPlan]).then(() => {});
  }
}
