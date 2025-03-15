using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using Mission10_Sessions.Data;
using System.Collections.Generic;
using System.Linq;

namespace Mission10_Sessions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BowlersController : ControllerBase
    {
        private readonly BowlingLeagueContext _context;

        public BowlersController(BowlingLeagueContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var bowlerList = _context.Bowlers
                .Include(b => b.Team) // Joins the Teams table
                .Select(b => new
                {
                    b.BowlerId,
                    b.BowlerFirstName,
                    b.BowlerMiddleInit,
                    b.BowlerLastName,
                    b.BowlerAddress,
                    b.BowlerCity,
                    b.BowlerState,
                    b.BowlerZip,
                    b.BowlerPhoneNumber,
                    TeamName = b.Team != null ? b.Team.TeamName : "Unknown" //  team name
                })
                .ToList();

            return Ok(bowlerList);
        }
    }
}