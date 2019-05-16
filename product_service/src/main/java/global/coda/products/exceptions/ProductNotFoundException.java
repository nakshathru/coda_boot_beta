package global.coda.products.exceptions;

public class ProductNotFoundException extends Exception {

    private long user_id;

    public ProductNotFoundException(long user_id) {
        super(String.format("Product is not found with id : '%s'", user_id));
    }

}