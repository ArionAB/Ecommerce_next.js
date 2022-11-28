using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Migrations
{
    public partial class Coverallv8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoverallClass_Baby_BabyId",
                table: "CoverallClass");

            migrationBuilder.DropColumn(
                name: "BabyIdClass",
                table: "CoverallClass");

            migrationBuilder.AlterColumn<Guid>(
                name: "BabyId",
                table: "CoverallClass",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallClass_Baby_BabyId",
                table: "CoverallClass",
                column: "BabyId",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoverallClass_Baby_BabyId",
                table: "CoverallClass");

            migrationBuilder.AlterColumn<Guid>(
                name: "BabyId",
                table: "CoverallClass",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "BabyIdClass",
                table: "CoverallClass",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverallClass_Baby_BabyId",
                table: "CoverallClass",
                column: "BabyId",
                principalTable: "Baby",
                principalColumn: "BabyId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
