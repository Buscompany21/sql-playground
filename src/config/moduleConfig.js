/**
 * Table names referenced in each module’s lesson JSON (`levels[].table`),
 * for UI copy on the home page. Keep in sync with `public/curriculum/modules/*.json`.
 */
export const moduleConfig = {
  '1': {
    title: "SELECT, DISTINCT, FROM, ORDER BY",
    levels: 5,
    practiceTables: ['top_songs'],
    storyline: {
      text: "It's your first week at Stellar Sound Records, and you're eager to prove yourself. Your manager hands you a login to the music database and says, 'Let's see what you can do!' Time to dig into the data and show them you've got star potential—even behind the scenes.",
      image: "/images/storyline/module1.png"
    }
  },
  '2': {
    title: "WHERE Statements",
    levels: 5,
    practiceTables: ['top_songs'],
    storyline: {
      text: "Now that you've mastered the basics, you're trusted with more specific tasks. The team needs help finding songs for marketing campaigns, playlists, and artist highlights. You're learning that asking the right questions—just like writing a hit song—is everything.",
      image: "/images/storyline/module2.png"
    }
  },
  '3': {
    title: "Advanced WHERE Statements",
    levels: 5,
    practiceTables: ['top_songs'],
    storyline: {
      text: "The work is getting more detailed. You're analyzing patterns, filtering across different dates and keywords, and helping teams curate niche content. Every new skill gets you closer to understanding how data drives decisions in the music industry.",
      image: "/images/storyline/module3.png"
    }
  },
  '4': {
    title: "Aggregates and Group By",
    levels: 5,
    practiceTables: ['top_songs'],
    storyline: {
      text: "Since you have been doing such great work, you've been promoted from intern to Junior Analyst. You're not just pulling data—you're uncovering insights. Whether it's finding the most popular genres or tracking artist releases, your work is influencing what gets produced, promoted, and played. You're becoming a true data star behind the stars.",
      image: "/images/storyline/module4.png"
    }
  },
  '5': {
    title: "Changing Data",
    levels: 5,
    practiceTables: ['new_artists'],
    storyline: {
      text: "The label is launching a new artist scouting program, and you're the first to get the chance to build the database from scratch. You'll create tables, insert rows, update records, and delete data—all the skills you've learned so far, in practice.",
      image: "/images/storyline/module5.png"
    }
  },
  '6': {
    title: "Practice: Putting It All Together",
    levels: 5,
    practiceTables: ['top_songs'],
    storyline: {
      text: "You've picked up a real toolkit—filtering, sorting, grouping, and crunching numbers—and now your manager wants to see it all in action. The asks aren't simple anymore: they mix a filter here, a count there, a summary at the bottom. This is where the basics start to click as one connected skill.",
      image: "/images/storyline/module6.png"
    }
  },
  '7': {
    title: "Joins: Chart Data Meets Label Metadata",
    levels: 5,
    practiceTables: ['album_info', 'top_songs'],
    storyline: {
      text: "The team needs help finding songs for marketing campaigns, playlists, and artist highlights. You're learning that asking the right questions—just like writing a hit song—is everything.",
      image: "/images/storyline/Module7.png"
    }
  },
  '8': {
    title: "Data Transformations",
    levels: 5,
    practiceTables: ['album_info', 'top_songs'],
    storyline: {
      text: "Raw exports rarely match what stakeholders want to read. You're learning to reshape values in the query itself—swapping bad text for good text, turning numbers into friendly categories, and filling gaps—so every spreadsheet looks intentional before it leaves your desk.",
      image: "/images/storyline/Module8.png"
    }
  },
  '9': {
    title: "Filtering and Reporting with Joins",
    levels: 5,
    practiceTables: ['album_info', 'top_songs'],
    storyline: {
      text: "The catalog keeps growing, and teams need faster answers from their data. You’re learning how to combine tables, filter the right rows, and build reports that help Stellar Sound make decisions quickly.",
      image: "/images/storyline/Module9.png"
    }
  },
  '10': {
    title: "Reporting with CASE and HAVING",
    levels: 5,
    practiceTables: ['top_songs'],
    storyline: {
      text: "You're not just answering questions anymore—you're shaping the stories Stellar Sound tells. Your reports power newsletters, marketing posters, and the slides leadership shows in boardrooms. A few clever rows of SQL turn into the headlines everyone reads.",
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
