using Ecommerce.DataLayer.DbContexts;
using Ecommerce.ServiceLayer.BabyService;
using Ecommerce.ServiceLayer.FileService;
using Ecommerce.ServiceLayer.FileService.FileSystemService;
using Ecommerce.ServiceLayer.LogService;
using Ecommerce.ServiceLayer.UsersService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          
            string conn = Configuration.GetConnectionString("DBConnection");
            services.AddDbContextPool<MainDbContext>(options => options.UseMySql(conn, ServerVersion.AutoDetect(conn)));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Ecommerce", Version = "v1" });
            });
         
            services.AddAutoMapper(typeof(Startup));



            services.AddCors();
         
            services.AddControllers();
       
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILogService, LogService>();
            services.AddScoped<IBabyService, BabyService>();
            services.AddScoped<IFileSystemService, FileSystemService>();
            services.AddScoped<IFileService, FileService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ecommerce v1"));
            }

            app.UseCors(x => x
            .SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("Content-Disposition"));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
