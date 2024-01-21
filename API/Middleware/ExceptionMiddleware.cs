using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        // Constructor to initialize middleware components
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        // Middleware logic for handling exceptions
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Continue processing the request pipeline
                await _next(context);
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, ex.Message);

                // Set response details for an exception
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                // Create a ProblemDetails object for consistent error responses
                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = _env.IsDevelopment() ? ex.StackTrace.ToString() : null,
                    Title = ex.Message
                };

                // Serialize the ProblemDetails to JSON
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);

                // Write the JSON response to the client
                await context.Response.WriteAsJsonAsync(json);
            }
        }
    }
}
