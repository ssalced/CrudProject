package com.proyecto.crud.repositories;

import org.springframework.stereotype.Repository;

import com.proyecto.crud.model.usuario;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface usuarioRepository extends CrudRepository<usuario,Long>  {
}
