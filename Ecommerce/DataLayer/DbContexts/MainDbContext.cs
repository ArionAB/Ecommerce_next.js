using Ecommerce.DataLayer.Models.Baby;

using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using Microsoft.EntityFrameworkCore;


namespace Ecommerce.DataLayer.DbContexts
{
    public class MainDbContext : DbContext
    {

        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {

        }
        public DbSet<BaseUser> Users { get; set; }

  
        public DbSet<ProductClass> Product { get; set; }
        public DbSet<ProductPicture> ProductPictures { get; set; }

        public DbSet<ProductSize> ProductSizes { get; set; }


       



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseUser>().HasKey(x => x.UserId);
            modelBuilder.Entity<BaseUser>().HasDiscriminator(x => x.UserType)
                .HasValue<AdminUser>(UserType.Admin)
                .HasValue<RegularUser>(UserType.User);
            

            modelBuilder.Entity<ProductPicture>().HasKey(x => x.PictureId);

            modelBuilder.Entity<ProductSize>().HasKey(x => x.ProductSizeId);

            modelBuilder.Entity<ProductClass>().HasKey(x => x.ProductId);
            
            modelBuilder.Entity<ProductClass>().HasMany(x => x.ProductPictures).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);
            modelBuilder.Entity<ProductClass>().HasMany(x => x.ProductSizes).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);



            






        }

    }

}