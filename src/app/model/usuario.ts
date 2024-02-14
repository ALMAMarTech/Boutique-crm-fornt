import {Rol} from "./rol";

export class Usuario {
  id: number = 0;
  nombre: string = "";
  correo: string = "";
  contrasena: string = "";
  status: number = 1;
  rol: Rol = new Rol();
  roles: string[] = [];
}
