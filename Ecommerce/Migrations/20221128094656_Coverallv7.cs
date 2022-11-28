using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class Coverallv7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bodysuits_Baby_BabyIdClass",
                table: "Bodysuits");

            migrationBuilder.RenameColumn(
                name: "BabyIdClass",
                table: "Bodysuits",
                newName: "BabyId");

            migrationBuilder.RenameIndex(
                name: "IX_Bodysuits_BabyIdClass",
                table: "Bodysuits",
                newName: "IX_Bodysuits_BabyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bodysuits_Baby_BabyId",
                table: "Bodysuits",
                column: "BabyId",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bodysuits_Baby_BabyId",
                table: "Bodysuits");

            migrationBuilder.RenameColumn(
                name: "BabyId",
                table: "Bodysuits",
                newName: "BabyIdClass");

            migrationBuilder.RenameIndex(
                name: "IX_Bodysuits_BabyId",
                table: "Bodysuits",
                newName: "IX_Bodysuits_BabyIdClass");

            migrationBuilder.AddForeignKey(
                name: "FK_Bodysuits_Baby_BabyIdClass",
                table: "Bodysuits",
                column: "BabyIdClass",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
