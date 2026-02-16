package com.example.SpringJwt.model;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class CustomUserDetails implements UserDetails {

    private final Users user;
    private List<SimpleGrantedAuthority> authorities;

      public CustomUserDetails(Users user, List<SimpleGrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    public Long getId() {
        return user.getId();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles()
                   .stream()
                   .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                   .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
         return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

}
