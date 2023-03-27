using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class added_mixedFruitId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MixedFruitId",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "MixedFruitId",
                table: "OrderProducts",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "MixedFruitId",
                table: "CartProducts",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MixedFruitId",
                table: "OrderProducts");

            migrationBuilder.DropColumn(
                name: "MixedFruitId",
                table: "CartProducts");

            migrationBuilder.AddColumn<string>(
                name: "MixedFruitId",
                table: "Product",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
