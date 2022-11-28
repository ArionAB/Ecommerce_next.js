using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class deletedBaby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bodysuits_Baby_BabyId",
                table: "Bodysuits");

            migrationBuilder.DropTable(
                name: "CoverallPicture");

            migrationBuilder.DropTable(
                name: "CoverallClass");

            migrationBuilder.DropTable(
                name: "Baby");

            migrationBuilder.DropIndex(
                name: "IX_Bodysuits_BabyId",
                table: "Bodysuits");

            migrationBuilder.DropColumn(
                name: "BabyId",
                table: "Bodysuits");

            migrationBuilder.AddColumn<int>(
                name: "CategoryType",
                table: "Bodysuits",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryType",
                table: "Bodysuits");

            migrationBuilder.AddColumn<Guid>(
                name: "BabyId",
                table: "Bodysuits",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

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
                name: "CoverallClass",
                columns: table => new
                {
                    CoverallsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BabyId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CoverallsSizeType = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoverallClass", x => x.CoverallsId);
                    table.ForeignKey(
                        name: "FK_CoverallClass_Baby_BabyId",
                        column: x => x.BabyId,
                        principalTable: "Baby",
                        principalColumn: "BabyId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CoverallPicture",
                columns: table => new
                {
                    PictureId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ContentType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CoverallsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CoverallsId1 = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FilePath = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoverallPicture", x => x.PictureId);
                    table.ForeignKey(
                        name: "FK_CoverallPicture_CoverallClass_CoverallsId1",
                        column: x => x.CoverallsId1,
                        principalTable: "CoverallClass",
                        principalColumn: "CoverallsId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Bodysuits_BabyId",
                table: "Bodysuits",
                column: "BabyId");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallClass_BabyId",
                table: "CoverallClass",
                column: "BabyId");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallPicture_CoverallsId1",
                table: "CoverallPicture",
                column: "CoverallsId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Bodysuits_Baby_BabyId",
                table: "Bodysuits",
                column: "BabyId",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
