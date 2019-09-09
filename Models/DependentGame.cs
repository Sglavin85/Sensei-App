using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sensei.Models
{
    public class DependentGame
    {
        public int Id { get; set; }
        public int GameId {get; set;}
        public int DependentId { get; set; }

    }
}
