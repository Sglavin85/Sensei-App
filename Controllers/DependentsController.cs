using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sensei.Data;
using Sensei.Models;

namespace Sensei.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DependentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<IdentityUser> _userManager;

        public DependentsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Dependents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dependent>>> GetDependents()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                Claim userClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
                var user = await _userManager.FindByIdAsync(userClaim.Value);
                var reply = await _context.Dependents.Include(d => d.DependentGames).Where(d => d.UserId == user.Id).ToListAsync();
                return reply;
            } else
            {
                return NotFound();
            }

        }

        // GET: api/Dependents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dependent>> GetDependent(int id)
        {
            var dependent = await _context.Dependents.FindAsync(id);

            if (dependent == null)
            {
                return NotFound();
            }

            return dependent;
        }

        // GET: api/Dependents/favorite/5
        [Route("favorite")]
        [HttpGet("/favorite/{id}")]
        public async Task<ActionResult<DependentGame>> GetFavorite(int id)
        {
            var game = await _context.DependentGames.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }
            return game;
        }

        // PUT: api/Dependents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDependent(int id, Dependent dependent)
        {
            if (id != dependent.Id)
            {
                return BadRequest();
            }

            _context.Entry(dependent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DependentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Dependents
        [HttpPost]
        public async Task<ActionResult<Dependent>> PostDependent(Dependent dependent)
        {
            _context.Dependents.Add(dependent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDependent", new { id = dependent.Id }, dependent);
        }

        // POST: /api/Dependents/favorite
        [Route("HailMary")]
        [HttpPost]
        public async Task<ActionResult> Favorite(DependentGame fav)
        {
            _context.DependentGames.Add(fav);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavorite", new { id = fav.Id }, fav);
        }

        // DELETE: api/Dependents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Dependent>> DeleteDependent(int id)
        {
            var dependent = await _context.Dependents.FindAsync(id);
            if (dependent == null)
            {
                return NotFound();
            }

            _context.Dependents.Remove(dependent);
            await _context.SaveChangesAsync();

            return dependent;
        }

        // DELETE: /api/Dependents/favorite/5
        [Route("favorite")]
        [HttpDelete("/favorite/{id}")]
        public async Task<ActionResult<DependentGame>> DeleteFavorite(int fav)
        {
            var favoriteGame = await _context.DependentGames.FindAsync(fav);
            if (favoriteGame == null)
            {
                return NotFound();
            }
            _context.DependentGames.Remove(favoriteGame);
            await _context.SaveChangesAsync();

            return favoriteGame;
        }



        private bool DependentExists(int id)
        {
            return _context.Dependents.Any(e => e.Id == id);
        }
    }
}
