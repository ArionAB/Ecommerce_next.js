﻿// <auto-generated />
using System;
using Ecommerce.DataLayer.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Ecommerce.Migrations
{
    [DbContext(typeof(MainDbContext))]
    [Migration("20221128090224_Coverallv3")]
    partial class Coverallv3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.9");

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.BabyClass", b =>
                {
                    b.Property<Guid>("BabyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.HasKey("BabyId");

                    b.ToTable("Baby");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Bodysuits.Bodysuit", b =>
                {
                    b.Property<Guid>("BodysuitsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("BabyIdClass")
                        .HasColumnType("char(36)");

                    b.Property<int>("BodySuitsSizeType")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.HasKey("BodysuitsId");

                    b.HasIndex("BabyIdClass");

                    b.ToTable("Bodysuits");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Bodysuits.BodysuitPicture", b =>
                {
                    b.Property<Guid>("PictureId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("BodysuitId")
                        .HasColumnType("char(36)");

                    b.Property<string>("ContentType")
                        .HasColumnType("longtext");

                    b.Property<string>("FileName")
                        .HasColumnType("longtext");

                    b.Property<string>("FilePath")
                        .HasColumnType("longtext");

                    b.HasKey("PictureId");

                    b.HasIndex("BodysuitId");

                    b.ToTable("BodysuitsPictures");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Coverall.CoverallClass", b =>
                {
                    b.Property<Guid>("CoverallsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("BabyClassID")
                        .HasColumnType("char(36)");

                    b.Property<int>("CoverallsSizeType")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.HasKey("CoverallsId");

                    b.HasIndex("BabyClassID");

                    b.ToTable("CoverallClass");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Coverall.CoverallPicture", b =>
                {
                    b.Property<Guid>("PictureId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("ContentType")
                        .HasColumnType("longtext");

                    b.Property<Guid>("CoverallsId")
                        .HasColumnType("char(36)");

                    b.Property<string>("FileName")
                        .HasColumnType("longtext");

                    b.Property<string>("FilePath")
                        .HasColumnType("longtext");

                    b.HasKey("PictureId");

                    b.HasIndex("CoverallsId");

                    b.ToTable("CoverallPicture");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.User.BaseUser", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("longtext");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasDiscriminator<int>("UserType");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.User.AdminUser", b =>
                {
                    b.HasBaseType("Ecommerce.DataLayer.Models.User.BaseUser");

                    b.HasDiscriminator().HasValue(2);
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.User.RegularUser", b =>
                {
                    b.HasBaseType("Ecommerce.DataLayer.Models.User.BaseUser");

                    b.HasDiscriminator().HasValue(1);
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Bodysuits.Bodysuit", b =>
                {
                    b.HasOne("Ecommerce.DataLayer.Models.Baby.BabyClass", "Baby")
                        .WithMany("Bodysuit")
                        .HasForeignKey("BabyIdClass")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Baby");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Bodysuits.BodysuitPicture", b =>
                {
                    b.HasOne("Ecommerce.DataLayer.Models.Baby.Bodysuits.Bodysuit", "Bodysuit")
                        .WithMany("BodysuitPictures")
                        .HasForeignKey("BodysuitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bodysuit");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Coverall.CoverallClass", b =>
                {
                    b.HasOne("Ecommerce.DataLayer.Models.Baby.BabyClass", "Baby")
                        .WithMany("Coverall")
                        .HasForeignKey("BabyClassID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Baby");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Coverall.CoverallPicture", b =>
                {
                    b.HasOne("Ecommerce.DataLayer.Models.Baby.Coverall.CoverallClass", "Coverall")
                        .WithMany("CoverallPictures")
                        .HasForeignKey("CoverallsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coverall");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.BabyClass", b =>
                {
                    b.Navigation("Bodysuit");

                    b.Navigation("Coverall");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Bodysuits.Bodysuit", b =>
                {
                    b.Navigation("BodysuitPictures");
                });

            modelBuilder.Entity("Ecommerce.DataLayer.Models.Baby.Coverall.CoverallClass", b =>
                {
                    b.Navigation("CoverallPictures");
                });
#pragma warning restore 612, 618
        }
    }
}
