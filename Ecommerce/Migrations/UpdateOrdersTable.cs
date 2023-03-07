using Microsoft.EntityFrameworkCore.Migrations;
using System;

public partial class UpdateOrdersTable : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Orders_Users_UserId",
            table: "Orders");

        migrationBuilder.AlterColumn<Guid>(
            name: "UserId",
            table: "Orders",
            nullable: true,
            oldClrType: typeof(Guid),
            oldType: "char(36)");

        migrationBuilder.AddForeignKey(
            name: "FK_Orders_Users_UserId",
            table: "Orders",
            column: "UserId",
            principalTable: "Users",
            principalColumn: "UserId",
            onDelete: ReferentialAction.SetNull);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Orders_Users_UserId",
            table: "Orders");

        migrationBuilder.AlterColumn<Guid>(
            name: "UserId",
            table: "Orders",
            type: "char(36)",
            nullable: false,
            oldClrType: typeof(Guid),
            oldNullable: true);

        migrationBuilder.AddForeignKey(
            name: "FK_Orders_Users_UserId",
            table: "Orders",
            column: "UserId",
            principalTable: "Users",
            principalColumn: "UserId",
            onDelete: ReferentialAction.Cascade);
    }
}
