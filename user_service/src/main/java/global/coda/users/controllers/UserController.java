package global.coda.users.controllers;

import global.coda.users.exceptions.UserNotFoundException;
import global.coda.users.models.User;
import global.coda.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    // Get All users
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Create new user
    @PostMapping("/")
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    // Get single user
    @GetMapping("/{id}")
    public User getUserById(@PathVariable(value = "id") Long userId) throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    // Update User
    @PutMapping("/{id}")
    public User updateUser(@PathVariable(value = "id") Long userId,
                           @Valid @RequestBody User userDetails) throws UserNotFoundException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        user.setName(userDetails.getName());
        user.setPhone(userDetails.getPhone());
        user.setLocation(userDetails.getName());

        User updatedUser = userRepository.save(user);

        return updatedUser;
    }

    // Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        userRepository.delete(user);

        return ResponseEntity.ok().build();
    }
}
