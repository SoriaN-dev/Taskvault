package com.example.SpringJwt.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SpringJwt.model.Users;

@Repository
public interface IUserRepository extends JpaRepository<Users,Long>{

     Users findByUsername(String username);
     boolean existsByUsername(String username);

}
