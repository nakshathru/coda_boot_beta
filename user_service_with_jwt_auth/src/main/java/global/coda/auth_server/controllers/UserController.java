package global.coda.auth_server.controllers;

import global.coda.auth_server.exceptions.UserNotFoundException;
import global.coda.auth_server.models.UserDetails;
import global.coda.auth_server.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @GetMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<UserDetails> getAllUsers() {
        return userDetailsRepository.findAll();
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDetails createUser(@Valid @RequestBody UserDetails user) {
        return userDetailsRepository.save(user);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserDetails getUserById(@PathVariable(value = "id") Long userId) throws UserNotFoundException {
        return userDetailsRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDetails updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody UserDetails userDetails)
            throws UserNotFoundException {

        UserDetails user = userDetailsRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        user.setName(userDetails.getName());
        user.setPhone(userDetails.getPhone());
        user.setLocation(userDetails.getLocation());

        UserDetails updatedUser = userDetailsRepository.save(user);

        return updatedUser;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) throws UserNotFoundException {
        UserDetails user = userDetailsRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        userDetailsRepository.delete(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/verify")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userAccess() {
        return "true";
    }

}
