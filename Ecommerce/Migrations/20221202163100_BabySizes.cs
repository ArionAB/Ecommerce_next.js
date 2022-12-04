using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class BabySizes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BabySize",
                table: "Baby");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Baby");

            migrationBuilder.CreateTable(
                name: "BabySizes",
                columns: table => new
                {
                    BabySizeId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BabyId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Size = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BabySizes", x => x.BabySizeId);
                    table.ForeignKey(
                        name: "FK_BabySizes_Baby_BabyId",
                        column: x => x.BabyId,
                        principalTable: "Baby",
                        principalColumn: "BabyId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BabySizes_BabyId",
                table: "BabySizes",
                column: "BabyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BabySizes");

            migrationBuilder.AddColumn<int>(
                name: "BabySize",
                table: "Baby",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Baby",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
