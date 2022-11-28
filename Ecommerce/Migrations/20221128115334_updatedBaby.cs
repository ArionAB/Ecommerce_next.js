using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class updatedBaby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BodysuitsPictures");

            migrationBuilder.RenameColumn(
                name: "BodySuitsSizeType",
                table: "Bodysuits",
                newName: "BabySize");

            migrationBuilder.RenameColumn(
                name: "BodysuitsId",
                table: "Bodysuits",
                newName: "BabyId");

            migrationBuilder.CreateTable(
                name: "BodyPictures",
                columns: table => new
                {
                    PictureId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BabyId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContentType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FilePath = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodyPictures", x => x.PictureId);
                    table.ForeignKey(
                        name: "FK_BodyPictures_Bodysuits_BabyId",
                        column: x => x.BabyId,
                        principalTable: "Bodysuits",
                        principalColumn: "BabyId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BodyPictures_BabyId",
                table: "BodyPictures",
                column: "BabyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BodyPictures");

            migrationBuilder.RenameColumn(
                name: "BabySize",
                table: "Bodysuits",
                newName: "BodySuitsSizeType");

            migrationBuilder.RenameColumn(
                name: "BabyId",
                table: "Bodysuits",
                newName: "BodysuitsId");

            migrationBuilder.CreateTable(
                name: "BodysuitsPictures",
                columns: table => new
                {
                    PictureId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BodysuitId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ContentType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_BodysuitsPictures_BodysuitId",
                table: "BodysuitsPictures",
                column: "BodysuitId");
        }
    }
}
