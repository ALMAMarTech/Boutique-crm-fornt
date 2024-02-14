import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AuthService} from "../../utils/auth/auth.service";
import swal from 'sweetalert2';
import {Usuario} from "../../model/usuario";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private title: Title,
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }

  public usuario: Usuario = new Usuario();

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']).then(() => {});
    }
  }

  login() {
    if (this.usuario.correo == null || this.usuario.contrasena == null || this.usuario.correo == '' || this.usuario.contrasena == '') {
      swal.fire('Error', 'Email o contraseña vacio', 'error').then(() => {});
      return;
    }
    this.spinner.show().then(() =>{
      this.authService.login(this.usuario).subscribe({
        next: response => {
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          this.authService.guardarRefreshToken(response.refresh_token);
          this.router.navigate(['/home']).then(() => {});
        },
        error: err => {
          this.spinner.hide().then(() => {});
          if (err.status == 400) {
            swal.fire('Error', 'Correo o contraseña incorrectos', 'error').then(() => {});
          }
        },
        complete: () => {
          this.spinner.hide().then(() => {});
        }
      });
    });
  }
}
