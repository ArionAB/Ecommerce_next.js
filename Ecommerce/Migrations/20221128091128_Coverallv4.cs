using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class Coverallv4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoverallClass_Baby_BabyClassID",
                table: "CoverallClass");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverallPicture_CoverallClass_CoverallsId",
                table: "CoverallPicture");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoverallClass",
                table: "CoverallClass");

            migrationBuilder.RenameTable(
                name: "CoverallClass",
                newName: "Coveralls");

            migrationBuilder.RenameIndex(
                name: "IX_CoverallClass_BabyClassID",
                table: "Coveralls",
                newName: "IX_Coveralls_BabyClassID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coveralls",
                table: "Coveralls",
                column: "CoverallsId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallPicture_Coveralls_CoverallsId",
                table: "CoverallPicture",
                column: "CoverallsId",
                principalTable: "Coveralls",
                principalColumn: "CoverallsId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Coveralls_Baby_BabyClassID",
                table: "Coveralls",
                column: "BabyClassID",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoverallPicture_Coveralls_CoverallsId",
                table: "CoverallPicture");

            migrationBuilder.DropForeignKey(
                name: "FK_Coveralls_Baby_BabyClassID",
                table: "Coveralls");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coveralls",
                table: "Coveralls");

            migrationBuilder.RenameTable(
                name: "Coveralls",
                newName: "CoverallClass");

            migrationBuilder.RenameIndex(
                name: "IX_Coveralls_BabyClassID",
                table: "CoverallClass",
                newName: "IX_CoverallClass_BabyClassID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CoverallClass",
                table: "CoverallClass",
                column: "CoverallsId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallClass_Baby_BabyClassID",
                table: "CoverallClass",
                column: "BabyClassID",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallPicture_CoverallClass_CoverallsId",
                table: "CoverallPicture",
                column: "CoverallsId",
                principalTable: "CoverallClass",
                principalColumn: "CoverallsId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
