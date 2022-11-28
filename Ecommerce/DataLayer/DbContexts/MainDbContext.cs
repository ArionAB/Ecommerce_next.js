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

  
        public DbSet<BabyClass> Baby { get; set; }
        public DbSet<BabyPicture> BabyPictures { get; set; }


       



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseUser>().HasKey(x => x.UserId);
            modelBuilder.Entity<BaseUser>().HasDiscriminator(x => x.UserType)
                .HasValue<AdminUser>(UserType.Admin)
                .HasValue<RegularUser>(UserType.User);


            modelBuilder.Entity<BabyPicture>().HasKey(x => x.PictureId);
            
            modelBuilder.Entity<BabyClass>().HasKey(x => x.BabyId);
            
            modelBuilder.Entity<BabyClass>().HasMany(x => x.BabyPictures).WithOne(x => x.Baby).HasForeignKey(x => x.BabyId);

            

            




        }

    }

}