package global.coda.products.models;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String category;

    @NotBlank
    private String description;

    public Product(){
        super();

    }

    public Product(Long id, String name, String category, String description) {
        super();
        this.id = id;
        this.name = name;
        this.category = category;
        this.description=description;
    }
}