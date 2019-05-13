package global.coda.users.models;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "books")
@Data
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @NotBlank @Length(min = 10, max = 10)
    @Pattern(regexp = "^[0-9]{10}")
    private String phone;

    @NotBlank
    private String location;

    public User(){
        super();

    }

    public User(Long id, String name, String phone, String location) {
        super();
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.location=location;
    }
}