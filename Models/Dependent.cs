using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sensei.Models
{
    public class Dependent
    {
        public int Id { get; set; }
        public string UserId {get; set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string FavoriteColor { get; set; }
        public IdentityUser User { get; set; }
        public List<Game> Games { get; set;  }
    }
}
