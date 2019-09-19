using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Sensei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sensei.Models.ViewModels;

namespace Sensei.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }
        public DbSet<Dependent> Dependents { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameType> GameTypes { get; set; }
        public DbSet<DependentGame> DependentGames { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region "Seed Data"

            builder.Entity<IdentityRole>().HasData(
                new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = "2", Name = "Customer", NormalizedName = "CUSTOMER" }
            );


            builder.Entity<DependentGame>()
                .HasOne(dg => dg.Game)
                .WithMany(g => g.DependentGames)
                .HasForeignKey(dg => dg.GameId);
            builder.Entity<DependentGame>()
                .HasOne(dg => dg.Dependent)
                .WithMany(d => d.DependentGames)
                .HasForeignKey(dg => dg.DependentId);

            #endregion
        }


    }

}