using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class Coverallv3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Baby",
                columns: table => new
                {
                    BabyId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Baby", x => x.BabyId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Bodysuits",
                columns: table => new
                {
                    BodysuitsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BabyIdClass = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BodySuitsSizeType = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bodysuits", x => x.BodysuitsId);
                    table.ForeignKey(
                        name: "FK_Bodysuits_Baby_BabyIdClass",
                        column: x => x.BabyIdClass,
                        principalTable: "Baby",
                        principalColumn: "BabyId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CoverallClass",
                columns: table => new
                {
                    CoverallsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BabyClassID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CoverallsSizeType = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoverallClass", x => x.CoverallsId);
                    table.ForeignKey(
                        name: "FK_CoverallClass_Baby_BabyClassID",
                        column: x => x.BabyClassID,
                        principalTable: "Baby",
                        principalColumn: "BabyId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BodysuitsPictures",
                columns: table => new
                {
                    PictureId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BodysuitId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContentType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FilePath = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodysuitsPictures", x => x.PictureId);
                    table.ForeignKey(
                        name: "FK_BodysuitsPictures_Bodysuits_BodysuitId",
                        column: x => x.BodysuitId,
                        principalTable: "Bodysuits",
                        principalColumn: "BodysuitsId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CoverallPicture",
                columns: table => new
                {
                    PictureId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CoverallsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContentType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FilePath = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoverallPicture", x => x.PictureId);
                    table.ForeignKey(
                        name: "FK_CoverallPicture_CoverallClass_CoverallsId",
                        column: x => x.CoverallsId,
                        principalTable: "CoverallClass",
                        principalColumn: "CoverallsId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Bodysuits_BabyIdClass",
                table: "Bodysuits",
                column: "BabyIdClass");

            migrationBuilder.CreateIndex(
                name: "IX_BodysuitsPictures_BodysuitId",
                table: "BodysuitsPictures",
                column: "BodysuitId");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallClass_BabyClassID",
                table: "CoverallClass",
                column: "BabyClassID");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallPicture_CoverallsId",
                table: "CoverallPicture",
                column: "CoverallsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BodysuitsPictures");

            migrationBuilder.DropTable(
                name: "CoverallPicture");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Bodysuits");

            migrationBuilder.DropTable(
                name: "CoverallClass");

            migrationBuilder.DropTable(
                name: "Baby");
        }
    }
}
