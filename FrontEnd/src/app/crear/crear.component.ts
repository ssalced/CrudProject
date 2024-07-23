import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { ServicioService } from '../serives/servicio.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit{
  id:number;
  operacion: string = 'Agregar';
  usuario: Usuario={
    id:0,
    nombres: '',
    apellidos: '',
    cedula: 0,
    noCelular: 0,
    correo: '',
    direccion: '',
    fechaNacimiento: new Date(),
    fechaInsercion: new Date(),
    fechaModificacion: new Date(),
    usuarioHabilitado: true
  };
  
  constructor(private servicioService: ServicioService, private router: Router,private arouter: ActivatedRoute){
    this.id= Number(arouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if(this.id !=0){
      this.operacion = 'Editar';
      this.getUsuario(this.id);
    }
    
  }
  
  createItem(): void {
    if(this.id!==0){
      this.usuario.id=this.id;
      this.servicioService.actualizarUsuario(this.id,this.usuario)
      .subscribe(
        updateUsuario => {
          console.log('Usuario actualizado correctamente:', updateUsuario);
          this.router.navigate(['/']);
          Swal.fire({
            title: "Actualizado!",
            text: "Usuario Actualizado con exito!",
            icon: "info"
          });
         
        },
        error => {
          console.log('Error al crear usuario:', error);
        }
      );
    }else{
      this.servicioService.crearUsuario(this.usuario)
        .subscribe(
          nuevoUsuario => {
            
            console.log('Usuario creado correctamente:', nuevoUsuario);
            this.router.navigate(['/']);
            Swal.fire({
              title: "Guardado!",
              text: "Usuario guardado con exito!",
              icon: "success"
            });
           
          },
          error => {
            console.log('Error al crear usuario:', error);
          }
        );
    }
    
        
  }
  getUsuario(id:number){
    this.servicioService.getUsuarioById(id).subscribe(user=>{
      console.log(user);
      this.usuario={
        id:user.id,
        nombres: user.nombres,
        apellidos:user.apellidos,
        cedula: user.cedula,
        noCelular: user.noCelular,
        correo: user.correo,
        direccion: user.direccion,
        fechaNacimiento: user.fechaNacimiento,
        fechaInsercion: user.fechaInsercion,
        fechaModificacion: user.fechaModificacion,
        usuarioHabilitado: user.usuarioHabilitado
      };
    });
  }
  
}
