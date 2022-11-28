using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class Coverallv5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coveralls_Baby_BabyClassID",
                table: "Coveralls");

            migrationBuilder.RenameColumn(
                name: "BabyClassID",
                table: "Coveralls",
                newName: "BabyIdClass");

            migrationBuilder.RenameIndex(
                name: "IX_Coveralls_BabyClassID",
                table: "Coveralls",
                newName: "IX_Coveralls_BabyIdClass");

            migrationBuilder.RenameColumn(
                name: "BabyId",
                table: "Baby",
                newName: "BabyIdClass");

            migrationBuilder.AddForeignKey(
                name: "FK_Coveralls_Baby_BabyIdClass",
                table: "Coveralls",
                column: "BabyIdClass",
                principalTable: "Baby",
                principalColumn: "BabyIdClass",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coveralls_Baby_BabyIdClass",
                table: "Coveralls");

            migrationBuilder.RenameColumn(
                name: "BabyIdClass",
                table: "Coveralls",
                newName: "BabyClassID");

            migrationBuilder.RenameIndex(
                name: "IX_Coveralls_BabyIdClass",
                table: "Coveralls",
                newName: "IX_Coveralls_BabyClassID");

            migrationBuilder.RenameColumn(
                name: "BabyIdClass",
                table: "Baby",
                newName: "BabyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Coveralls_Baby_BabyClassID",
                table: "Coveralls",
                column: "BabyClassID",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
