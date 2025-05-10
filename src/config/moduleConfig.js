export const moduleConfig = {
  '1': {
    title: "SELECT, DISTINCT, FROM, ORDER BY",
    description: "Learn the basics of SQL queries and database manipulation",
    levels: 5,
    storyline: {
      text: "It's your first week at Stellar Sound Records, and you're eager to prove yourself. Your manager hands you a login to the music database and says, \"Let's see what you can do!\" Time to dig into the data and show them you've got star potential—even behind the scenes.",
      image: "/images/storyline/module1.jpg"
    }
  },
  '2': {
    title: "WHERE Statements",
    description: "Master filtering data with WHERE clauses",
    levels: 5,
    storyline: {
      text: "Now that you've mastered the basics, you're trusted with more specific tasks. The team needs help finding songs for marketing campaigns, playlists, and artist highlights. You're learning that asking the right questions—just like writing a hit song—is everything.",
      image: "/images/storyline/module2.jpg"
    }
  },
  '3': {
    title: "Advanced WHERE Statements",
    description: "Explore complex filtering techniques",
    levels: 5,
    storyline: {
      text: "The work is getting more detailed. You're analyzing patterns, filtering across different dates and keywords, and helping teams curate niche content. Every new skill gets you closer to understanding how data drives decisions in the music industry.",
      image: "/images/storyline/module3.jpg"
    }
  },
  '4': {
    title: "Aggregates and Group By",
    description: "Learn to create summary statistics and group data",
    levels: 5,
    storyline: {
      text: "Since you have been doing such great work, you've been promoted from intern to Junior Analyst. You're not just pulling data—you're uncovering insights. Whether it's finding the most popular genres or tracking artist releases, your work is influencing what gets produced, promoted, and played. You're becoming a true data star behind the stars.",
      image: "/images/storyline/module4.jpg"
    }
  },
  '5': {
    title: "Database Design",
    description: "Master database schema design and relationships",
    levels: 5
  }
}

// Add the overall storyline context
export const curriculumStoryline = {
  title: "TOP SONGS SQL CURRICULUM",
  introduction: "You dream of becoming a famous singer, and to get your foot in the door, you've landed an internship at one of the world's top music labels: Stellar Sound Records. As a junior data analyst, you'll use SQL to explore hit songs, uncover trends, and help the label make decisions—all while secretly hoping your name ends up on this list one day."
}

export const getModuleLevels = (moduleId) => {
  return moduleConfig[moduleId]?.levels || 5 // default to 5 levels if not specified
}

export const getAllModules = () => {
  return Object.keys(moduleConfig).map(id => ({ moduleId: id }))
} 