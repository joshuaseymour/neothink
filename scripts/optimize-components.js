const fs = require('fs')
const path = require('path')

// Components to make dynamic
const DYNAMIC_COMPONENTS = [
  'dashboard/quick-actions.tsx',
  'dashboard/upcoming-events.tsx',
  'dashboard/recent-activity.tsx',
]

// Add dynamic imports
DYNAMIC_COMPONENTS.forEach(componentPath => {
  const fullPath = path.join(__dirname, '../components', componentPath)
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8')
    
    // Only add dynamic if not already present
    if (!content.includes('use client')) {
      content = `'use client'\n\n${content}`
      fs.writeFileSync(fullPath, content)
      console.log(`✅ Made ${componentPath} dynamic`)
    }
  }
})
