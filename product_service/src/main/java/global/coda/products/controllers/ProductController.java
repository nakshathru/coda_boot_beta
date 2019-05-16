package global.coda.products.controllers;

import global.coda.products.exceptions.ProductNotFoundException;
import global.coda.products.models.Product;
import global.coda.products.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    // Get All products
    @GetMapping("/")
    public List<Product> getAllUsers() {
        return productRepository.findAll();
    }

    // Create new product
    @PostMapping("/")
    public Product createProduct(@Valid @RequestBody Product product) {
        return productRepository.save(product);
    }

    // Get single product
    @GetMapping("/{id}")
    public Product getproductById(@PathVariable(value = "id") Long productId) throws ProductNotFoundException {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }

    // Update Product
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable(value = "id") Long productId,
                              @Valid @RequestBody Product productDetails) throws ProductNotFoundException {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setDescription(productDetails.getDescription());

        Product updatedProduct = productRepository.save(product);

        return updatedProduct;
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(value = "id") Long productId) throws ProductNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        productRepository.delete(product);

        return ResponseEntity.ok().build();
    }
}
