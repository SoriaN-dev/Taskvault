package com.example.SpringJwt.restcontroller;


import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringJwt.dto.UserDTO;
import com.example.SpringJwt.model.CustomUserDetails;
import com.example.SpringJwt.model.Task;
import com.example.SpringJwt.model.Users;
import com.example.SpringJwt.security.JwtUtil;
import com.example.SpringJwt.service.ITaskService;
import com.example.SpringJwt.service.IUserService;

import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import io.jsonwebtoken.Claims;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IUserService userService;

    @PostMapping(value="/register", consumes = "application/json")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserDTO user) {
        this.userService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("message", "User registered successfully"));

    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<Map<String, Object>> login( @RequestBody UserDTO user) {
       String token = this.userService.authenticate(user);

        return ResponseEntity.ok(
            Map.of(
                "token", token,
                "type", "Bearer"
            )
        );
    }

   


}
