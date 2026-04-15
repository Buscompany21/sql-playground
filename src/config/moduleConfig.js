export const moduleConfig = {
  '1': {
    title: "SELECT, DISTINCT, FROM, ORDER BY",
    description: "Learn the basics of SQL queries and database manipulation",
    levels: 5,
    storyline: {
      text: "It's your first week at Stellar Sound Records, and you're eager to prove yourself. Your manager hands you a login to the music database and says, \"Let's see what you can do!\" Time to dig into the data and show them you've got star potential—even behind the scenes.",
      image: "/images/storyline/module1.png"
    }
  },
  '2': {
    title: "WHERE Statements",
    description: "Master filtering data with WHERE clauses",
    levels: 5,
    storyline: {
      text: "Now that you've mastered the basics, you're trusted with more specific tasks. The team needs help finding songs for marketing campaigns, playlists, and artist highlights. You're learning that asking the right questions—just like writing a hit song—is everything.",
      image: "/images/storyline/module2.png"
    }
  },
  '3': {
    title: "Advanced WHERE Statements",
    description: "Explore complex filtering techniques",
    levels: 5,
    storyline: {
      text: "The work is getting more detailed. You're analyzing patterns, filtering across different dates and keywords, and helping teams curate niche content. Every new skill gets you closer to understanding how data drives decisions in the music industry.",
      image: "/images/storyline/module3.png"
    }
  },
  '4': {
    title: "Aggregates and Group By",
    description: "Learn to create summary statistics and group data",
    levels: 5,
    storyline: {
      text: "Since you have been doing such great work, you've been promoted from intern to Junior Analyst. You're not just pulling data—you're uncovering insights. Whether it's finding the most popular genres or tracking artist releases, your work is influencing what gets produced, promoted, and played. You're becoming a true data star behind the stars.",
      image: "/images/storyline/module4.png"
    }
  },
  '5': {
    title: "Database Design",
    description: "Master database schema design and relationships",
    levels: 5,
    storyline: {
      text: "As your role at Stellar Sound Records grows, the label entrusts you with designing a new database for an upcoming music festival. You'll need to model relationships between artists, venues, and performances, ensuring all the festival's data is perfectly organized.",
      image: "/images/storyline/module5.png"
    }
  },
  '6': {
    title: "Advanced Joins and Subqueries",
    description: "Master complex database operations with advanced joins and subqueries",
    levels: 5,
    storyline: {
      text: "Congratulations! You've been promoted to Senior Data Analyst. The CEO has a special project just for you: analyzing cross-platform performance and artist collaboration patterns. This complex analysis will require your most advanced SQL skills yet, connecting data across multiple systems.",
      image: "/images/storyline/module6.png"
    }
  },
  '7': {
    title: "Window Functions",
    description: "Use ranking, running totals, and analytic functions over result sets",
    levels: 5,
    storyline: {
      text: "The analytics team needs leaderboards, rolling charts, and per-artist rankings without losing row-level detail. Window functions let you compute sophisticated metrics in a single query—perfect for Stellar Sound's streaming dashboards and year-end awards.",
      image: "/images/storyline/Module7.png"
    }
  },
  '8': {
    title: "Common Table Expressions (CTEs)",
    description: "Structure complex queries with readable, reusable CTEs",
    levels: 5,
    storyline: {
      text: "Your reports are getting layered: festival lineups, royalty splits, and tour schedules all need to build on each other. CTEs help you break big problems into clear steps so the whole team can follow your logic—and trust the numbers.",
      image: "/images/storyline/Module8.png"
    }
  },
  '9': {
    title: "Indexes and Query Performance",
    description: "Understand how indexes affect speed and how to tune queries",
    levels: 5,
    storyline: {
      text: "Dashboards are slowing down right before release week. You're partnering with engineering to see which queries scan too much data and how indexing keeps fans and execs from waiting on the insights they need.",
      image: "/images/storyline/Module9.png"
    }
  },
  '10': {
    title: "Advanced Analytics and Reporting",
    description: "Combine techniques for executive-ready analysis and summaries",
    levels: 5,
    storyline: {
      text: "You've become the go-to analyst for board-ready metrics: revenue trends, market share, and artist growth. This capstone-style work pulls together everything you've learned so leadership can steer Stellar Sound with confidence.",
      image: "/images/storyline/Module10.png"
    }
  }
}

export const curriculumStoryline = {
  title: "TOP SONGS SQL CURRICULUM",
}

export const getModuleLevels = (moduleId) => {
  return moduleConfig[moduleId]?.levels || 5 // default to 5 levels if not specified
}

/** Next module id in curriculum order, or null if `moduleId` is the last module. */
export const getNextModuleId = (moduleId) => {
  const ids = Object.keys(moduleConfig).sort((a, b) => Number(a) - Number(b))
  const idx = ids.indexOf(String(moduleId))
  if (idx === -1 || idx === ids.length - 1) return null
  return ids[idx + 1]
} 