package global.coda.auth_server.controllers;

import global.coda.auth_server.messages.request.LoginForm;
import global.coda.auth_server.messages.request.SignUpForm;
import global.coda.auth_server.messages.response.JwtResponse;
import global.coda.auth_server.models.Role;
import global.coda.auth_server.models.RoleName;
import global.coda.auth_server.models.User;
import global.coda.auth_server.repositories.RoleRepository;
import global.coda.auth_server.repositories.UserRepository;
import global.coda.auth_server.security.jwt.JwtProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")

public class AuthController {


    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {

        HashMap<String, Object> map= new HashMap<>();
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            map.put("message","Username is already taken!");
            map.put("status",HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            map.put("message","Email is already in use!");
            map.put("status",HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
            case "admin":
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("User Role not found."));
                roles.add(adminRole);

                break;

            default:
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("User Role not found."));
                roles.add(userRole);
            }
        });
        user.setRoles(roles);
        userRepository.save(user);
        map.put("message","User registered successfully!");
        map.put("status",HttpStatus.OK);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}