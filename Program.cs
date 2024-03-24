using Microsoft.Extensions.FileProviders;
using ws4kp.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

var app = builder.Build();
app.UseCorsMiddleware();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var fileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
app.UseDefaultFiles(new DefaultFilesOptions
{
    DefaultFileNames = { "index.html" },
    FileProvider = fileProvider
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = fileProvider
});

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
