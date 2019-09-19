using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sensei.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public GameType Type { get; set; }
        public virtual ICollection<DependentGame> DependentGames { get; set; }
     }
}
