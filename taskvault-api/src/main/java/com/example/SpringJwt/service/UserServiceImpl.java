package com.example.SpringJwt.service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.SpringJwt.dto.UserDTO;
import com.example.SpringJwt.model.CustomUserDetails;
import com.example.SpringJwt.model.Role;
import com.example.SpringJwt.model.Users;
import com.example.SpringJwt.model.enums.RoleName;
import com.example.SpringJwt.repository.IRoleRepository;
import com.example.SpringJwt.repository.IUserRepository;
import com.example.SpringJwt.security.JwtUtil;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService{

    private final IUserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final IRoleRepository iRoleRepository;

    private Function<UserDTO,Users> mapFunction = dto -> {
        var user = new Users();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        return user;
    };

    @Override
    public String register(UserDTO userdto) {
        var user = mapFunction.apply(userdto);
        if (userRepository.existsByUsername(user.getUsername())) {
            return "User already exists!";
        }

        Users newUser = new Users();
        newUser.setPassword(encoder.encode(user.getPassword()));
        newUser.setUsername(user.getUsername());

        Set<Role> roles = new HashSet<>();

        Role userRole = this.iRoleRepository.findByName(RoleName.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Role not found"));
    
        roles.add(userRole);
        newUser.setRoles(roles);

        
        userRepository.save(newUser);
        return "User registered successfully!";
    }
    

    @Override
    public String authenticate(UserDTO userdto) {
    var user = mapFunction.apply(userdto);
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    user.getPassword()
            )
    );

    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();


    List<String> roles = userDetails.getAuthorities()
                            .stream()
                            .map(GrantedAuthority::getAuthority)
                            .toList();
    
    Long userId = userDetails.getId();

    return jwtUtil.generateToken(userId, userDetails.getUsername(), roles);
}
}
