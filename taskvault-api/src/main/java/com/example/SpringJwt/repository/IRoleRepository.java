package com.example.SpringJwt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SpringJwt.model.Role;
import com.example.SpringJwt.model.enums.RoleName;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Long>{

    Optional<Role>  findByName(RoleName name);

}
