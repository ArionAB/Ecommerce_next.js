using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class Coverallv6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoverallPicture_Coveralls_CoverallsId",
                table: "CoverallPicture");

            migrationBuilder.DropForeignKey(
                name: "FK_Coveralls_Baby_BabyIdClass",
                table: "Coveralls");

            migrationBuilder.DropIndex(
                name: "IX_CoverallPicture_CoverallsId",
                table: "CoverallPicture");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coveralls",
                table: "Coveralls");

            migrationBuilder.DropIndex(
                name: "IX_Coveralls_BabyIdClass",
                table: "Coveralls");

            migrationBuilder.RenameTable(
                name: "Coveralls",
                newName: "CoverallClass");

            migrationBuilder.RenameColumn(
                name: "BabyIdClass",
                table: "Baby",
                newName: "BabyId");

            migrationBuilder.AddColumn<Guid>(
                name: "CoverallsId1",
                table: "CoverallPicture",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "BabyId",
                table: "CoverallClass",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CoverallClass",
                table: "CoverallClass",
                column: "CoverallsId");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallPicture_CoverallsId1",
                table: "CoverallPicture",
                column: "CoverallsId1");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallClass_BabyId",
                table: "CoverallClass",
                column: "BabyId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallClass_Baby_BabyId",
                table: "CoverallClass",
                column: "BabyId",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallPicture_CoverallClass_CoverallsId1",
                table: "CoverallPicture",
                column: "CoverallsId1",
                principalTable: "CoverallClass",
                principalColumn: "CoverallsId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoverallClass_Baby_BabyId",
                table: "CoverallClass");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverallPicture_CoverallClass_CoverallsId1",
                table: "CoverallPicture");

            migrationBuilder.DropIndex(
                name: "IX_CoverallPicture_CoverallsId1",
                table: "CoverallPicture");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoverallClass",
                table: "CoverallClass");

            migrationBuilder.DropIndex(
                name: "IX_CoverallClass_BabyId",
                table: "CoverallClass");

            migrationBuilder.DropColumn(
                name: "CoverallsId1",
                table: "CoverallPicture");

            migrationBuilder.DropColumn(
                name: "BabyId",
                table: "CoverallClass");

            migrationBuilder.RenameTable(
                name: "CoverallClass",
                newName: "Coveralls");

            migrationBuilder.RenameColumn(
                name: "BabyId",
                table: "Baby",
                newName: "BabyIdClass");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coveralls",
                table: "Coveralls",
                column: "CoverallsId");

            migrationBuilder.CreateIndex(
                name: "IX_CoverallPicture_CoverallsId",
                table: "CoverallPicture",
                column: "CoverallsId");

            migrationBuilder.CreateIndex(
                name: "IX_Coveralls_BabyIdClass",
                table: "Coveralls",
                column: "BabyIdClass");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallPicture_Coveralls_CoverallsId",
                table: "CoverallPicture",
                column: "CoverallsId",
                principalTable: "Coveralls",
                principalColumn: "CoverallsId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Coveralls_Baby_BabyIdClass",
                table: "Coveralls",
                column: "BabyIdClass",
                principalTable: "Baby",
                principalColumn: "BabyIdClass",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
