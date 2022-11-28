
using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Models.Baby.Bodysuits;
using Ecommerce.DataLayer.Models.Baby.Coverall;
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

  
        public DbSet<Bodysuit> Bodysuits { get; set; }
        public DbSet<BodysuitPicture> BodysuitsPictures { get; set; }

        public DbSet<CoverallClass> Coveralls { get; set; }

        public DbSet<CoverallPicture> CoverallPicture { get; set; }

       



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseUser>().HasKey(x => x.UserId);
            modelBuilder.Entity<BaseUser>().HasDiscriminator(x => x.UserType)
                .HasValue<AdminUser>(UserType.Admin)
                .HasValue<RegularUser>(UserType.User);


            modelBuilder.Entity<BodysuitPicture>().HasKey(x => x.PictureId);
            
            modelBuilder.Entity<Bodysuit>().HasKey(x => x.BodysuitsId);
            modelBuilder.Entity<Bodysuit>().HasMany(x => x.BodysuitPictures).WithOne(x => x.Bodysuit).HasForeignKey(x => x.BodysuitId);

            

            




        }

    }

}