package com.example.SpringJwt.service;

import com.example.SpringJwt.dto.UserDTO;


public interface IUserService {

    public String register(UserDTO user);
    public String authenticate(UserDTO user);
   


}
