using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Models.Orders;
using Ecommerce.DataLayer.Models.Product;
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
        public DbSet<FruitInventory> FruitInventory { get; set; }

        public DbSet<CartClass> Cart { get; set; }

        public DbSet<CartProduct> CartProducts { get; set; }
        
        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DbSet<OrderAddress> OrderAddress { get; set; }

    

      









        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseUser>().HasKey(x => x.UserId);
            modelBuilder.Entity<BaseUser>().HasOne(x => x.Cart).WithOne(x => x.User).HasForeignKey<CartClass>(x => x.UserId);

           

            modelBuilder.Entity<BaseUser>().HasDiscriminator(x => x.UserType)
                .HasValue<AdminUser>(UserType.Admin)
                .HasValue<RegularUser>(UserType.User);
            

            modelBuilder.Entity<ProductPicture>().HasKey(x => x.PictureId);

            modelBuilder.Entity<ProductClass>().HasKey(x => x.ProductId);
            modelBuilder.Entity<ProductClass>().HasMany(x => x.ProductPictures).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);
            

            


            modelBuilder.Entity<CartProduct>()
                .HasKey(k => k.CartProductId);
         


            modelBuilder.Entity<CartProduct>()
                .HasOne(cp => cp.Cart)
                .WithMany(c => c.CartProducts)
                .HasForeignKey(cp => cp.CartId);

            modelBuilder.Entity<CartProduct>()
                .HasOne(cp => cp.Product)
                .WithMany(p => p.CartProducts)
                .HasForeignKey(cp => cp.ProductId);


            
                modelBuilder.Entity<BaseUser>()
                    .HasMany(u => u.Orders)
                    .WithOne(o => o.User)
                    .HasForeignKey(o => o.UserId);

                modelBuilder.Entity<Order>()
                    .HasMany(o => o.OrderProducts)
                    .WithOne(op => op.Order)
                    .HasForeignKey(op => op.OrderId);

                modelBuilder.Entity<ProductClass>()
                    .HasMany(p => p.OrderProducts)
                    .WithOne(op => op.Product)
                    .HasForeignKey(op => op.ProductId);

            modelBuilder.Entity<OrderAddress>()
                .HasOne(x => x.Order)
                .WithOne(x => x.OrderAddress)
                .HasForeignKey<OrderAddress>(x => x.OrderId);







        }

    }

}