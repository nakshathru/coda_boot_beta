package global.coda.auth_server.repositories;

import global.coda.auth_server.models.Role;
import global.coda.auth_server.models.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName roleName);
}
