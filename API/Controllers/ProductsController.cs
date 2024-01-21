using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        // Constructor for ProductsController, receiving a StoreContext instance through dependency injection
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        // GET api/products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            // Retrieve all products from the database
            var products = await _context.Products.ToListAsync();

            // Return the list of products as an HTTP 200 OK response
            return Ok(products);
        }

        // GET api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // Find a product by its ID in the database
            var product = await _context.Products.FindAsync(id);

            // Check if the product was found
            if (product == null)
            {
                // Return HTTP 404 Not Found if the product is not found
                return NotFound();
            }

            // Return the found product as an HTTP 200 OK response
            return Ok(product);
        }
    }
}
