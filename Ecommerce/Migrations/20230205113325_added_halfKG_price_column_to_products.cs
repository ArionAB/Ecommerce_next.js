using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class added_halfKG_price_column_to_products : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Product",
                newName: "PriceKg");

            migrationBuilder.AddColumn<int>(
                name: "PriceHalf",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceHalf",
                table: "Product");

            migrationBuilder.RenameColumn(
                name: "PriceKg",
                table: "Product",
                newName: "Price");
        }
    }
}
