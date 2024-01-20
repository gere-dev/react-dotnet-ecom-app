using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using API.Data;

public class Startup
{
    // Other methods...

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, StoreContext context)
    {
        if (env.IsDevelopment())
        {
            // Other configurations for development...

            // Initialize the database
            DbInitializer.Initialize(context);
        }

        // Other configurations...
    }
}
