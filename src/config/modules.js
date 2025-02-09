export const MODULE_CONFIG = {
  1: { levels: 5 },  // Module 1 has 5 levels
  2: { levels: 7 },  // Module 2 has 7 levels
  3: { levels: 4 },  // Module 3 has 4 levels
  4: { levels: 6 },  // etc...
  5: { levels: 5 },
  6: { levels: 8 },
  7: { levels: 6 },
  8: { levels: 7 },
  9: { levels: 5 },
  10: { levels: 9 },
}

export const getModuleLevels = (moduleId) => {
  return MODULE_CONFIG[moduleId]?.levels || 5 // default to 5 levels if not specified
}

export const getAllModules = () => {
  return Object.keys(MODULE_CONFIG).map(id => ({ moduleId: id }))
} 