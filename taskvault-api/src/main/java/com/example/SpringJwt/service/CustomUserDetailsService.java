package com.example.SpringJwt.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.SpringJwt.model.CustomUserDetails;
import com.example.SpringJwt.model.Users;
import com.example.SpringJwt.repository.IUserRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{


    private final IUserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Users user = userRepository.findByUsername(username);

       if(user == null){
        throw new UsernameNotFoundException("User not Found with Username: " + username);
       }
       List<SimpleGrantedAuthority> authorities = user.getRoles()
        .stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .toList();

       return  new CustomUserDetails(
        user, authorities
    );
    
    }

}
