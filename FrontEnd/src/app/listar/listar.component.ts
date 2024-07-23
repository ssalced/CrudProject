import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import Swal from 'sweetalert2';
import { ServicioListarService } from '../serives/servicio-listar.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements  OnInit {
  usuarios: Usuario[]= [];
  title: string = 'Listado de usuarios!';

  constructor(private servicioService: ServicioListarService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.servicioService.getUsuarios().subscribe(
      usuarios =>{
        this.usuarios=usuarios;
      },
      error => {
        console.error('Error al cargar usuarios', error);
      }
    );
     
  }

  borrarUsuarios(id: number) {
    this.servicioService.borrarUsuario(id).subscribe(
      () => {
        this.cargarUsuarios();
        console.log('Persona borrada correctamente');
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario Eliminado con exito!",
          icon: "info"
        });
      },
      error => {
        console.error('Error al borrar persona', error);
      }
    );
  }

}
