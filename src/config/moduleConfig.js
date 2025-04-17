export const moduleConfig = {
  '1': {
    title: "Introduction to SQL",
    description: "Learn the basics of SQL queries and database manipulation",
    levels: 3
  },
  '2': {
    title: "Intermediate Queries",
    description: "Master JOIN operations and subqueries",
    levels: 5
  },
  '3': {
    title: "Advanced SQL",
    description: "Explore complex queries and database optimization",
    levels: 4
  },
  '4': {
    title: "Data Manipulation",
    description: "Learn to insert, update, and delete data effectively",
    levels: 6
  },
  '5': {
    title: "Database Design",
    description: "Master database schema design and relationships",
    levels: 5
  }
}

export const getModuleLevels = (moduleId) => {
  return moduleConfig[moduleId]?.levels || 5 // default to 5 levels if not specified
}

export const getAllModules = () => {
  return Object.keys(moduleConfig).map(id => ({ moduleId: id }))
} 