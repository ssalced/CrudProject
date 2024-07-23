package com.proyecto.crud.controller;



import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.proyecto.crud.model.usuario;
import com.proyecto.crud.repositories.usuarioRepository;
@RestController
@RequestMapping("/api/usuarios")
public class usuarioController {
     @Autowired
    private usuarioRepository usuarioRepository;
    Date date = new Date();

    @GetMapping
    public List<usuario> obtenerTodosUsuarios() {
        return (List<usuario>) usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<usuario> obtenerUsuarioPorId(@PathVariable Long id) throws Exception {
        usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new Exception("Usuario no encontrado con id: " + id));
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    public ResponseEntity<usuario> crearUsuario(@RequestBody usuario usuario) {
         usuario.setFechaInsercion(new Timestamp(System.currentTimeMillis()));
        usuario.setFechaModificacion(new Timestamp(System.currentTimeMillis()));
        usuario.setUsuarioHabilitado(true);
        usuario nuevoUsuario = usuarioRepository.save(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<usuario> actualizarUsuario(@PathVariable Long id, @RequestBody usuario usuarioDetalles) throws Exception {
        usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new Exception("Usuario no encontrado con id: " + id));

        usuario.setNombres(usuarioDetalles.getNombres());
        usuario.setApellidos(usuarioDetalles.getApellidos());
        usuario.setCedula(usuarioDetalles.getCedula());
        usuario.setNoCelular(usuarioDetalles.getNoCelular());
        usuario.setCorreo(usuarioDetalles.getCorreo());
        usuario.setDireccion(usuarioDetalles.getDireccion());
        usuario.setFechaNacimiento(usuarioDetalles.getFechaNacimiento());
        usuario.setFechaModificacion(new Timestamp(System.currentTimeMillis()));
        usuario.setUsuarioHabilitado(true);

    usuario usuarioActualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) throws Exception {
        usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new Exception("Usuario no encontrado con id: " + id));

        usuarioRepository.delete(usuario);
        return ResponseEntity.noContent().build();
    }
    
}
