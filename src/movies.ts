import { Movie } from "./types";

const STREAMS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
];

const POSTERS = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60", // Cinema
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60", // Theater
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60", // Sci-fi/controller
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=60", // Dark/Drama
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60", // Retro
  "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60", // Comedy
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60"  // Tech/Action
];

export const MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Departed",
    year: 2006,
    rating: "R",
    runtime: 151,
    genres: ["Crime", "Drama", "Thriller"],
    synopsis: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston. Directed by Martin Scorsese, this intense crime epic explores loyalty, double-lives, and deception in Boston's underworld.",
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson", "Mark Wahlberg", "Martin Sheen"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[0],
    avgRating: 4.8,
    reviews: [
      { id: "r1", author: "Cinephile99", date: "2006-10-12", rating: 5, text: "Absolutely brilliant. Jack Nicholson is terrifying and Leonardo DiCaprio gives a career-best performance. Martin Scorsese's best work in years!" },
      { id: "r2", author: "DVDWatcher", date: "2006-11-03", rating: 4, text: "A bit long, but the suspense never lets up. The ending had me completely shocked. Highly recommended for crime fans." }
    ]
  },
  {
    id: "2",
    title: "Casino Royale",
    year: 2006,
    rating: "PG-13",
    runtime: 144,
    genres: ["Action", "Adventure", "Thriller"],
    synopsis: "After earning 00 status and a licence to kill, secret agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, Montenegro.",
    director: "Martin Campbell",
    cast: ["Daniel Craig", "Eva Green", "Mads Mikkelsen", "Judi Dench", "Jeffrey Wright"],
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 4.7,
    reviews: [
      { id: "r3", author: "SpyFan007", date: "2006-11-20", rating: 5, text: "Daniel Craig is a revelation! He brings a gritty, brutal realism that James Bond desperately needed. The poker sequence is incredibly tense." },
      { id: "r4", author: "MovieMogul", date: "2006-12-05", rating: 5, text: "The best Bond film since GoldenEye. Eva Green is stunning and her chemistry with Craig is palpable. The action scenes are top-tier." }
    ]
  },
  {
    id: "3",
    title: "The Prestige",
    year: 2006,
    rating: "PG-13",
    runtime: 130,
    genres: ["Drama", "Mystery", "Sci-Fi"],
    synopsis: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other. Directed by Christopher Nolan, it is a masterclass in cinematic misdirection.",
    director: "Christopher Nolan",
    cast: ["Hugh Jackman", "Christian Bale", "Scarlett Johansson", "Michael Caine", "David Bowie"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[2],
    avgRating: 4.6,
    reviews: [
      { id: "r5", author: "MagicLover", date: "2006-10-25", rating: 5, text: "Are you watching closely? This movie is a magic trick in itself. Bale and Jackman are perfect rivals." }
    ]
  },
  {
    id: "4",
    title: "Batman Begins",
    year: 2005,
    rating: "PG-13",
    runtime: 140,
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption. He must stop Scarecrow and the League of Shadows from destroying Gotham using a fear-inducing toxin.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Michael Caine", "Liam Neeson", "Katie Holmes", "Gary Oldman", "Cillian Murphy"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[3],
    avgRating: 4.7,
    reviews: [
      { id: "r6", author: "GothamKnight", date: "2005-06-22", rating: 5, text: "Finally, a Batman movie that takes the character seriously! Dark, gritty, and deeply psychological. Bale is outstanding." }
    ]
  },
  {
    id: "5",
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    year: 2003,
    rating: "PG-13",
    runtime: 143,
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis: "Blacksmith Will Turner teams up with eccentric pirate 'Captain' Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead crew members cursed by Aztec gold.",
    director: "Gore Verbinski",
    cast: ["Johnny Depp", "Geoffrey Rush", "Orlando Bloom", "Keira Knightley", "Jack Davenport"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[4],
    avgRating: 4.8,
    reviews: [
      { id: "r7", author: "ScurvyDog", date: "2003-07-15", rating: 5, text: "Johnny Depp's Jack Sparrow is an instant icon! Fun, spectacular, and has some of the best orchestral music ever." }
    ]
  },
  {
    id: "6",
    title: "The Matrix",
    year: 1999,
    rating: "R",
    runtime: 136,
    genres: ["Action", "Sci-Fi"],
    synopsis: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence. He must rebel to free humanity.",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[5],
    avgRating: 4.9,
    reviews: [
      { id: "r8", author: "NeoTheOne", date: "2001-04-11", rating: 5, text: "Mind-blowing. Changed action movies forever. The leather coats, bullet time, and philosophical depth are unmatched." }
    ]
  },
  {
    id: "7",
    title: "Finding Nemo",
    year: 2003,
    rating: "G",
    runtime: 100,
    genres: ["Animation", "Adventure", "Comedy", "Family"],
    synopsis: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish embarks on a journey to bring him home, accompanied by a blue tang fish who suffers from short-term memory loss.",
    director: "Andrew Stanton",
    cast: ["Albert Brooks", "Ellen DeGeneres", "Alexander Gould", "Willem Dafoe", "Allison Janney"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[6],
    avgRating: 4.8,
    reviews: [
      { id: "r9", author: "PixarFan", date: "2003-06-01", rating: 5, text: "Just keep swimming! Ellen is hilarious as Dory. Pixar makes another masterpiece that appeals to kids and adults alike." }
    ]
  },
  {
    id: "8",
    title: "Gladiator",
    year: 2000,
    rating: "R",
    runtime: 155,
    genres: ["Action", "Adventure", "Drama"],
    synopsis: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery. Ridley Scott's masterpiece revived the swords-and-sandals genre.",
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed", "Richard Harris"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[0],
    avgRating: 4.8,
    reviews: [
      { id: "r10", author: "RomeLover", date: "2001-12-25", rating: 5, text: "Are you not entertained? Russell Crowe is magnificent, and Joaquin Phoenix is the perfect petulant villain." }
    ]
  },
  {
    id: "9",
    title: "Shrek 2",
    year: 2004,
    rating: "PG",
    runtime: 93,
    genres: ["Animation", "Adventure", "Comedy", "Family"],
    synopsis: "Our favorite green ogre travels to the Far Far Away kingdom with Princess Fiona to meet her parents, who are shocked to find their daughter married to an ogre. Features the legendary debut of Puss in Boots.",
    director: "Andrew Adamson",
    cast: ["Mike Myers", "Eddie Murphy", "Cameron Diaz", "Antonio Banderas", "Julie Andrews"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 4.6,
    reviews: [
      { id: "r11", author: "OgreAchiever", date: "2004-05-20", rating: 5, text: "Even better than the first! Puss in Boots steals every single scene. The soundtrack is fantastic!" }
    ]
  },
  {
    id: "10",
    title: "Napoleon Dynamite",
    year: 2004,
    rating: "PG",
    runtime: 96,
    genres: ["Comedy"],
    synopsis: "A listless and alienated teenager decides to help his new eccentric friend win the class presidency in their small western high school, while dealing with his bizarre family life in Idaho.",
    director: "Jared Hess",
    cast: ["Jon Heder", "Efren Ramirez", "Jon Gries", "Aaron Ruell", "Tina Majorino"],
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[2],
    avgRating: 4.4,
    reviews: [
      { id: "r12", author: "VoteForPedro", date: "2004-09-10", rating: 5, text: "This movie is flipping sweet! Heck yes. The dance scene at the end is legendary." }
    ]
  },
  {
    id: "11",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    rating: "PG-13",
    runtime: 178,
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron. An epic cinematic landmark.",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen", "Orlando Bloom", "Sean Astin", "Liv Tyler"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[3],
    avgRating: 4.9,
    reviews: [
      { id: "r13", author: "TolkienNerd", date: "2001-12-20", rating: 5, text: "Perfect adaptation! Jackson has done the impossible. The cast, the scenery, the music - everything is magnificent." }
    ]
  },
  {
    id: "12",
    title: "Spider-Man",
    year: 2002,
    rating: "PG-13",
    runtime: 121,
    genres: ["Action", "Adventure", "Sci-Fi"],
    synopsis: "After being bitten by a genetically modified spider, a shy high school student gains spider-like abilities that he must use to fight evil as a superhero, starting with the maniacal Green Goblin.",
    director: "Sam Raimi",
    cast: ["Tobey Maguire", "Willem Dafoe", "Kirsten Dunst", "James Franco", "Cliff Robertson"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[4],
    avgRating: 4.6,
    reviews: [
      { id: "r14", author: "WebSlinger", date: "2002-05-10", rating: 4, text: "Tobey Maguire is the perfect Peter Parker. The swinging scenes look incredible! Sam Raimi captures the comic book feel perfectly." }
    ]
  },
  {
    id: "13",
    title: "Cars",
    year: 2006,
    rating: "G",
    runtime: 117,
    genres: ["Animation", "Comedy", "Family"],
    synopsis: "A hotshot race-car named Lightning McQueen gets stranded in Radiator Springs, where he finds the true meaning of friendship and family. A visual marvel from Pixar with high-octane racing and heart.",
    director: "John Lasseter",
    cast: ["Owen Wilson", "Paul Newman", "Bonnie Hunt", "Larry the Cable Guy", "Cheech Marin"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[5],
    avgRating: 4.5,
    reviews: [
      { id: "r15", author: "Route66", date: "2006-06-15", rating: 5, text: "Ka-chow! Beautifully detailed reflections on the cars, and a wonderful heartwarming story about small-town America." }
    ]
  },
  {
    id: "14",
    title: "The Da Vinci Code",
    year: 2006,
    rating: "PG-13",
    runtime: 149,
    genres: ["Mystery", "Thriller"],
    synopsis: "A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead a symbologist and a cryptologist to a religious mystery protected by a secret society for two thousand years.",
    director: "Ron Howard",
    cast: ["Tom Hanks", "Audrey Tautou", "Ian McKellen", "Jean Reno", "Paul Bettany"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[6],
    avgRating: 4.1,
    reviews: [
      { id: "r16", author: "BookWorm", date: "2006-05-25", rating: 4, text: "Not quite as gripping as Dan Brown's book, but Tom Hanks and Ian McKellen keep you glued to your screen. Very atmospheric." }
    ]
  },
  {
    id: "15",
    title: "Anchorman: The Legend of Ron Burgundy",
    year: 2004,
    rating: "PG-13",
    runtime: 94,
    genres: ["Comedy"],
    synopsis: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated 1970s broadcast journalism. His world is shaken when an ambitious female anchor is hired to co-anchor with him.",
    director: "Adam McKay",
    cast: ["Will Ferrell", "Christina Applegate", "Paul Rudd", "Steve Carell", "David Koechner"],
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[0],
    avgRating: 4.7,
    reviews: [
      { id: "r17", author: "StayClassy", date: "2004-07-12", rating: 5, text: "I'm kind of a big deal. Literally the most quotable comedy of the decade. Steve Carell as Brick is hilarious." }
    ]
  },
  {
    id: "16",
    title: "Lost in Translation",
    year: 2003,
    rating: "R",
    runtime: 102,
    genres: ["Drama", "Romance"],
    synopsis: "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in a luxury Tokyo hotel. A melancholic and beautiful examination of loneliness and human connection.",
    director: "Sofia Coppola",
    cast: ["Bill Murray", "Scarlett Johansson", "Giovanni Ribisi", "Anna Faris"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 4.5,
    reviews: [
      { id: "r18", author: "SuntoryTime", date: "2003-10-01", rating: 5, text: "Subtle, moving, and gorgeously shot. Bill Murray shows incredible dramatic range and Scarlett Johansson is luminous." }
    ]
  },
  {
    id: "17",
    title: "Kill Bill: Vol. 1",
    year: 2003,
    rating: "R",
    runtime: 111,
    genres: ["Action", "Crime", "Thriller"],
    synopsis: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her, led by her former lover and boss, Bill. Quentin Tarantino's high-octane martial arts homage.",
    director: "Quentin Tarantino",
    cast: ["Uma Thurman", "Lucy Liu", "Vivica A. Fox", "Daryl Hannah", "David Carradine"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[2],
    avgRating: 4.8,
    reviews: [
      { id: "r19", author: "KatanaMaster", date: "2003-10-15", rating: 5, text: "A spectacular ballet of blood, style, and revenge. The Crazy 88 fight is one of the greatest sequences ever committed to film." }
    ]
  },
  {
    id: "18",
    title: "Catch Me If You Can",
    year: 2002,
    rating: "PG-13",
    runtime: 141,
    genres: ["Biography", "Crime", "Drama"],
    synopsis: "A seasoned FBI agent pursues Frank Abagnale Jr. who, before his 19th birthday, successfully forged millions of dollars' worth of checks while posing as a Pan Am pilot, a doctor, and a legal prosecutor.",
    director: "Steven Spielberg",
    cast: ["Leonardo DiCaprio", "Tom Hanks", "Christopher Walken", "Martin Sheen", "Amy Adams"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[3],
    avgRating: 4.7,
    reviews: [
      { id: "r20", author: "CatchMe", date: "2003-01-05", rating: 5, text: "Incredibly stylish and fun. DiCaprio and Hanks have wonderful chemistry, and Christopher Walken is heartbreaking." }
    ]
  },
  {
    id: "19",
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    rating: "R",
    runtime: 108,
    genres: ["Drama", "Romance", "Sci-Fi"],
    synopsis: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories. But as his memories fade, he realizes he still loves her and tries to hide her in his subconscious.",
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst", "Mark Ruffalo", "Elijah Wood"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[4],
    avgRating: 4.7,
    reviews: [
      { id: "r21", author: "Clementine", date: "2004-03-25", rating: 5, text: "Jim Carrey proves he is a phenomenal dramatic actor. Kate Winslet is brilliant. A highly inventive, poetic romantic masterwork." }
    ]
  },
  {
    id: "20",
    title: "Mean Girls",
    year: 2004,
    rating: "PG-13",
    runtime: 97,
    genres: ["Comedy"],
    synopsis: "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
    director: "Mark Waters",
    cast: ["Lindsay Lohan", "Rachel McAdams", "Tina Fey", "Lacey Chabert", "Amanda Seyfried"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[5],
    avgRating: 4.6,
    reviews: [
      { id: "r22", author: "SoFetch", date: "2004-05-02", rating: 5, text: "That is so fetch! Easily the funniest, most savage high school satire since Heathers. Tina Fey's script is brilliant." }
    ]
  },
  {
    id: "21",
    title: "King Kong",
    year: 2005,
    rating: "PG-13",
    runtime: 187,
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    synopsis: "An ambitious movie producer coerces his cast and crew to travel to mysterious Skull Island, where they encounter a giant ape who becomes infatuated with the leading lady. Peter Jackson's lavish remake.",
    director: "Peter Jackson",
    cast: ["Naomi Watts", "Jack Black", "Adrien Brody", "Andy Serkis", "Thomas Kretschmann"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[6],
    avgRating: 4.4,
    reviews: [
      { id: "r23", author: "EmpireState", date: "2005-12-18", rating: 5, text: "The visual effects are breathtaking. Andy Serkis brings incredible humanity to Kong. The t-rex fight is jaw-dropping." }
    ]
  },
  {
    id: "22",
    title: "V for Vendetta",
    year: 2005,
    rating: "R",
    runtime: 132,
    genres: ["Action", "Drama", "Sci-Fi", "Thriller"],
    synopsis: "In a future British tyranny, a shadowy freedom fighter, known only by the alias of 'V', plots to overthrow the totalitarian government with the help of a young working-class woman.",
    director: "James McTeigue",
    cast: ["Natalie Portman", "Hugo Weaving", "Stephen Rea", "Stephen Fry", "John Hurt"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[0],
    avgRating: 4.6,
    reviews: [
      { id: "r24", author: "GuyFawkes", date: "2006-03-20", rating: 5, text: "Remember, remember, the fifth of November. Natalie Portman's performance is powerful. A thought-provoking and stylish sci-fi movie." }
    ]
  },
  {
    id: "23",
    title: "Little Miss Sunshine",
    year: 2006,
    rating: "R",
    runtime: 101,
    genres: ["Comedy", "Drama"],
    synopsis: "A family determined to get their young daughter into the finals of a beauty pageant take a cross-country road trip in their yellow Volkswagen bus, testing their sanity and relationships.",
    director: "Jonathan Dayton, Valerie Faris",
    cast: ["Abigail Breslin", "Steve Carell", "Toni Collette", "Greg Kinnear", "Alan Arkin", "Paul Dano"],
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 4.7,
    reviews: [
      { id: "r25", author: "IndieLover", date: "2006-08-15", rating: 5, text: "An absolute delight! Hilarious, quirky, emotional, and featuring one of the best ensembles of the decade." }
    ]
  },
  {
    id: "24",
    title: "The Devil Wears Prada",
    year: 2006,
    rating: "PG-13",
    runtime: 109,
    genres: ["Comedy", "Drama"],
    synopsis: "A smart but sensible graduate lands a job as an assistant to Miranda Priestly, the demanding Editor-in-Chief of a high fashion magazine, testing her relationship, ideals, and professional endurance.",
    director: "David Frankel",
    cast: ["Anne Hathaway", "Meryl Streep", "Emily Blunt", "Stanley Tucci", "Adrian Grenier"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[2],
    avgRating: 4.5,
    reviews: [
      { id: "r26", author: "FashionWatcher", date: "2006-07-05", rating: 5, text: "Meryl Streep is absolutely terrifying and brilliant! Emily Blunt steals every scene she is in. Anne Hathaway is lovely." }
    ]
  },
  {
    id: "25",
    title: "Blood Diamond",
    year: 2006,
    rating: "R",
    runtime: 143,
    genres: ["Action", "Adventure", "Drama", "Thriller"],
    synopsis: "A fisherman, a smuggler, and a syndicate of businessmen match wits over the possession of a priceless pink diamond, set against the backdrop of the Sierra Leone Civil War.",
    director: "Edward Zwick",
    cast: ["Leonardo DiCaprio", "Djimon Hounsou", "Jennifer Connelly", "Kagiso Kuypers"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[3],
    avgRating: 4.6,
    reviews: [
      { id: "r27", author: "DiamondEye", date: "2006-12-15", rating: 5, text: "Powerful, gut-wrenching, and educational. DiCaprio's Rhodesian accent is impressive, and Djimon Hounsou is the soul of the film." }
    ]
  },
  {
    id: "26",
    title: "Inside Man",
    year: 2006,
    rating: "R",
    runtime: 129,
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    synopsis: "A police detective, a bank robber, and a high-power broker enter high-stakes negotiations after the criminal's brilliant heist turns into a hostage situation. Spike Lee directs this intricate puzzle.",
    director: "Spike Lee",
    cast: ["Denzel Washington", "Clive Owen", "Jodie Foster", "Christopher Plummer", "Willem Dafoe"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[4],
    avgRating: 4.5,
    reviews: [
      { id: "r28", author: "HeistNerd", date: "2006-04-01", rating: 5, text: "One of the smartest bank heist movies ever made! Clive Owen plays the perfect mastermind, and Denzel Washington is superb." }
    ]
  },
  {
    id: "27",
    title: "Pan's Labyrinth",
    year: 2006,
    rating: "R",
    runtime: 118,
    genres: ["Drama", "Fantasy", "War"],
    synopsis: "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world led by an old faun. Guillermo del Toro's dark masterpiece.",
    director: "Guillermo del Toro",
    cast: ["Ivana Baquero", "Ariadna Gil", "Sergi López", "Maribel Verdú", "Doug Jones"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[5],
    avgRating: 4.8,
    reviews: [
      { id: "r29", author: "FaunFriend", date: "2006-12-30", rating: 5, text: "A breathtaking, terrifying, and deeply moving fairy tale for adults. Doug Jones is incredible as the Faun and Pale Man." }
    ]
  },
  {
    id: "28",
    title: "Happy Feet",
    year: 2006,
    rating: "PG",
    runtime: 108,
    genres: ["Animation", "Comedy", "Family", "Musical"],
    synopsis: "In the cold land of Antarctica, the Emperor Penguins each need a Heartsong to attract a soul mate. But young Mumble cannot sing—instead, he was born with a talent for tap-dancing!",
    director: "George Miller",
    cast: ["Elijah Wood", "Robin Williams", "Brittany Murphy", "Hugh Jackman", "Nicole Kidman"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[6],
    avgRating: 4.2,
    reviews: [
      { id: "r30", author: "DanceMaster", date: "2006-11-18", rating: 4, text: "A cute movie with stunningly realistic rendering of ice and feathers, and the tap-dancing penguin is incredibly lovable!" }
    ]
  },
  {
    id: "29",
    title: "Mission: Impossible III",
    year: 2006,
    rating: "PG-13",
    runtime: 126,
    genres: ["Action", "Adventure", "Thriller"],
    synopsis: "IMF agent Ethan Hunt comes into conflict with a sadistic arms dealer who threatens his life and his fiancée. J.J. Abrams directs this intense, action-packed installment with an amazing performance by Philip Seymour Hoffman.",
    director: "J.J. Abrams",
    cast: ["Tom Cruise", "Philip Seymour Hoffman", "Ving Rhames", "Billy Crudup", "Michelle Monaghan"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[0],
    avgRating: 4.4,
    reviews: [
      { id: "r31", author: "EthanHunt", date: "2006-05-10", rating: 5, text: "The bridge attack scene is crazy! Philip Seymour Hoffman is easily the best villain in the franchise's history." }
    ]
  },
  {
    id: "30",
    title: "Click",
    year: 2006,
    rating: "PG-13",
    runtime: 107,
    genres: ["Comedy", "Drama", "Fantasy"],
    synopsis: "A workaholic architect finds a universal remote control that allows him to fast-forward and rewind to different parts of his life. Complications arise when the remote starts memory-tracking and over-writing his choices.",
    director: "Frank Coraci",
    cast: ["Adam Sandler", "Kate Beckinsale", "Christopher Walken", "David Hasselhoff", "Henry Winkler"],
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 4.0,
    reviews: [
      { id: "r32", author: "SandlerFan", date: "2006-06-28", rating: 4, text: "Started off as a typical silly Adam Sandler comedy, but the second half had me crying like a baby. Surprisingly deep!" }
    ]
  },
  {
    id: "31",
    title: "Walk the Line",
    year: 2005,
    rating: "PG-13",
    runtime: 136,
    genres: ["Biography", "Drama", "Music"],
    synopsis: "A chronicle of country music legend Johnny Cash's life, from his early days on an Arkansas cotton farm to his rise to fame with Sun Records, his battles with addiction, and his romance with June Carter.",
    director: "James Mangold",
    cast: ["Joaquin Phoenix", "Reese Witherspoon", "Ginnifer Goodwin", "Robert Patrick"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[2],
    avgRating: 4.7,
    reviews: [
      { id: "r33", author: "ManInBlack", date: "2005-11-22", rating: 5, text: "Joaquin Phoenix and Reese Witherspoon do all their own singing and they are incredible! Witherspoon fully deserved her Oscar." }
    ]
  },
  {
    id: "32",
    title: "Brokeback Mountain",
    year: 2005,
    rating: "R",
    runtime: 134,
    genres: ["Drama", "Romance"],
    synopsis: "The story of a secretive relationship between two cowboys in the American West from 1963 to 1983, who face social, economic, and familial expectations while trying to maintain their secret bond.",
    director: "Ang Lee",
    cast: ["Heath Ledger", "Jake Gyllenhaal", "Michelle Williams", "Anne Hathaway", "Randy Quaid"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[3],
    avgRating: 4.6,
    reviews: [
      { id: "r34", author: "AngLeeFan", date: "2005-12-10", rating: 5, text: "A heartbreakingly beautiful film. Heath Ledger's performance is incredibly raw and tragic. A cinematic landmark." }
    ]
  },
  {
    id: "33",
    title: "Million Dollar Baby",
    year: 2004,
    rating: "PG-13",
    runtime: 132,
    genres: ["Drama", "Sport"],
    synopsis: "An underappreciated boxing trainer is persuaded to coach a determined, amateur female fighter who is eager to turn professional. Clint Eastwood directs and stars in this powerful boxing drama.",
    director: "Clint Eastwood",
    cast: ["Clint Eastwood", "Hilary Swank", "Morgan Freeman", "Jay Baruchel"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[4],
    avgRating: 4.7,
    reviews: [
      { id: "r35", author: "Knockout", date: "2004-12-17", rating: 5, text: "Devastating and masterful. Hilary Swank gives a powerhouse performance, and Morgan Freeman's narration is beautiful." }
    ]
  },
  {
    id: "34",
    title: "Talladega Nights: The Ballad of Ricky Bobby",
    year: 2006,
    rating: "PG-13",
    runtime: 108,
    genres: ["Comedy", "Sport"],
    synopsis: "NASCAR superstar Ricky Bobby is at the top of his game until a flamboyant French Formula One driver challenges him for the championship. Ricky Bobby must recover his courage and get his spark back.",
    director: "Adam McKay",
    cast: ["Will Ferrell", "John C. Reilly", "Sacha Baron Cohen", "Gary Cole", "Leslie Bibb"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[5],
    avgRating: 4.4,
    reviews: [
      { id: "r36", author: "ShakeAndBake", date: "2006-08-08", rating: 5, text: "Shake and bake! Will Ferrell and John C. Reilly are a match made in comedy heaven. Sacha Baron Cohen is hysterical." }
    ]
  },
  {
    id: "35",
    title: "Pirates of the Caribbean: Dead Man's Chest",
    year: 2006,
    rating: "PG-13",
    runtime: 151,
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis: "Jack Sparrow races to recover the heart of Davy Jones in order to avoid enslaving his soul to Jones' service, while other friends and foes seek the heart for their own agendas as well.",
    director: "Gore Verbinski",
    cast: ["Johnny Depp", "Orlando Bloom", "Keira Knightley", "Bill Nighy", "Geoffrey Rush"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[6],
    avgRating: 4.5,
    reviews: [
      { id: "r37", author: "DavyJones", date: "2006-07-10", rating: 4, text: "Bill Nighy's Davy Jones looks absolutely incredible! The CGI is mind-blowing. Sparrow is as fun as ever." }
    ]
  },
  {
    id: "36",
    title: "Ice Age: The Meltdown",
    year: 2006,
    rating: "PG",
    runtime: 91,
    genres: ["Animation", "Adventure", "Comedy", "Family"],
    synopsis: "Manny, Sid, and Diego discover that the ice dam holding back a massive body of water is about to rupture, and they must warn the other animals in the valley and escape before the flood.",
    director: "Carlos Saldanha",
    cast: ["Ray Romano", "John Leguizamo", "Denis Leary", "Queen Latifah", "Seann William Scott"],
    poster: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[0],
    avgRating: 4.2,
    reviews: [
      { id: "r38", author: "IceCool", date: "2006-04-05", rating: 4, text: "Scrat is still the best part of these movies! Very fun and fast-paced adventure for the family." }
    ]
  },
  {
    id: "37",
    title: "X-Men: The Last Stand",
    year: 2006,
    rating: "PG-13",
    runtime: 104,
    genres: ["Action", "Adventure", "Sci-Fi"],
    synopsis: "An announcement of a 'cure' for mutation threatens to alter the course of history. Mutants must choose between assimilation or retaining their uniqueness, while Magneto declares war on humanity.",
    director: "Brett Ratner",
    cast: ["Hugh Jackman", "Halle Berry", "Ian McKellen", "Patrick Stewart", "Famke Janssen", "Kelsey Grammer"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 3.8,
    reviews: [
      { id: "r39", author: "MutantPride", date: "2006-06-01", rating: 3, text: "A bit rushed compared to X2, but the action scenes are massive. Kelsey Grammer is perfect as Beast." }
    ]
  },
  {
    id: "38",
    title: "Superman Returns",
    year: 2006,
    rating: "PG-13",
    runtime: 154,
    genres: ["Action", "Adventure", "Sci-Fi"],
    synopsis: "Superman returns to Earth after a five-year absence, only to find that Lois Lane has moved on and his old nemesis Lex Luthor is plotting a scheme that will kill billions and reshape the planet.",
    director: "Bryan Singer",
    cast: ["Brandon Routh", "Kate Bosworth", "Kevin Spacey", "James Marsden", "Frank Langella"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[2],
    avgRating: 3.9,
    reviews: [
      { id: "r40", author: "ManOfSteel", date: "2006-07-02", rating: 4, text: "Kevin Spacey is a fantastic, menacing Lex Luthor. Brandon Routh does a respectable job channeling Christopher Reeve." }
    ]
  },
  {
    id: "39",
    title: "Sintel",
    year: 2010, // Included as a classic open-source film, visually fits 2006 fantasy
    rating: "PG-13",
    runtime: 15,
    genres: ["Animation", "Fantasy", "Drama"],
    synopsis: "A lonely young woman named Sintel searches for her companion, a baby dragon named Scales, whom she nursed back to health. An emotional story of search, loss, and the nature of memory.",
    director: "Colin Levy",
    cast: ["Halina Reijn", "Thom Hoffman"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[1],
    avgRating: 4.8,
    reviews: [
      { id: "r41", author: "BlenderFan", date: "2010-09-30", rating: 5, text: "Breathtaking animation and a deeply touching story. One of the finest examples of open-source cinematic rendering." }
    ]
  },
  {
    id: "40",
    title: "Tears of Steel",
    year: 2012, // Included for working action stream
    rating: "PG-13",
    runtime: 12,
    genres: ["Sci-Fi", "Action"],
    synopsis: "Set in a dystopian future, a group of scientists in Amsterdam's Oude Kerk try to rescue the world from destructive giant robots using advanced holographic technology and tactical combat.",
    director: "Ian Hubert",
    cast: ["Derek de Lint", "Sergio Hasselbaink"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    videoUrl: STREAMS[6],
    avgRating: 4.5,
    reviews: [
      { id: "r42", author: "SciFiGuy", date: "2012-10-10", rating: 5, text: "Incredible combination of live-action and CGI! The robotic design is magnificent." }
    ]
  }
];
