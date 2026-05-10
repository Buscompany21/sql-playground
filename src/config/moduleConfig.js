export const moduleConfig = {
  '1': {
    title: "SELECT, DISTINCT, FROM, ORDER BY",
    levels: 5,
    storyline: {
      text: "You use SELECT and FROM on the chart table, pick out one column, use DISTINCT for unique names, and ORDER BY to sort. Reading data only—no filters yet.",
      image: "/images/storyline/module1.png"
    }
  },
  '2': {
    title: "WHERE Statements",
    levels: 5,
    storyline: {
      text: "You filter rows with WHERE: same artist, stream counts, dates before a cutoff, and AND for more than one rule.",
      image: "/images/storyline/module2.png"
    }
  },
  '3': {
    title: "Advanced WHERE Statements",
    levels: 5,
    storyline: {
      text: "You go further with WHERE: BETWEEN for date ranges, LIKE and wildcards for text, and IN for a short list of values.",
      image: "/images/storyline/module3.png"
    }
  },
  '4': {
    title: "Aggregates and Group By",
    levels: 5,
    storyline: {
      text: "You group rows with GROUP BY and use SUM, COUNT, AVG, MIN, and MAX to turn many rows into simple totals and averages.",
      image: "/images/storyline/module4.png"
    }
  },
  '5': {
    title: "Changing Data",
    levels: 5,
    storyline: {
      text: "You create small tables with CREATE and INSERT, then change the chart: UPDATE a typo, DELETE old rows, INSERT a new song.",
      image: "/images/storyline/module5.png"
    }
  },
  '6': {
    title: "Joins: Chart Data Meets Label Metadata",
    levels: 5,
    storyline: {
      text: "Label data lives in a second table. You join it to songs with INNER and LEFT joins, count rows each way, and use CASE when a label is missing.",
      image: "/images/storyline/module6.png"
    }
  },
  '7': {
    title: "Window Functions",
    levels: 5,
    storyline: {
      text: "You rank and number rows without losing detail: RANK and ROW_NUMBER, totals across the set, running counts, and LAG to peek at the previous row.",
      image: "/images/storyline/Module7.png"
    }
  },
  '8': {
    title: "Common Table Expressions (CTEs)",
    levels: 5,
    storyline: {
      text: "You split big questions into named steps using WITH … AS (CTEs), then SELECT from each step so the query is easier to read and fix.",
      image: "/images/storyline/Module8.png"
    }
  },
  '9': {
    title: "Indexes and Query Performance",
    levels: 5,
    storyline: {
      text: "You practice tight WHERE filters on dates, cities, and chart weeks—small slices of data, the kind that stays quick when the database adds indexes.",
      image: "/images/storyline/Module9.png"
    }
  },
  '10': {
    title: "Advanced Analytics and Reporting",
    levels: 5,
    storyline: {
      text: "You filter groups with HAVING, bucket rows with CASE, and count across conditions in one query—short answers for “who has enough songs?” and “before vs after a date.”",
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
