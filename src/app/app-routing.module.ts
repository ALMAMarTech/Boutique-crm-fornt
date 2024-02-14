import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {HomeComponent} from "./views/home/home.component";
import {NewPlanComponent} from "./views/plan/new-plan/new-plan.component";
import {CobranzaGeneralComponent} from "./views/cobranza/cobranza-general/cobranza-general.component";
import {CobranzaDetailComponent} from "./views/cobranza/cobranza-detail/cobranza-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Boutique CRM'}},
  {path: 'home', component: HomeComponent, data: {title: 'Bienvendio'}},
  {path: 'plan/new', component: NewPlanComponent, data: {title: 'Nuevo plan'}},
  {path: 'cobranza', component: CobranzaGeneralComponent, data: {title: 'Cobranza general'}},
  {path: 'cobranza/detail/:idPlan', component: CobranzaDetailComponent, data: {title: 'Cobranza detalle'}},
  {path: '404', component: LoginComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const RoutingComponents = [LoginComponent, HomeComponent];
