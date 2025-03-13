const { execSync } = require("child_process")

// Clean build files
console.log("🧹 Cleaning build files...")
try {
  execSync("rm -rf .next", { stdio: "inherit" })
} catch (error) {
  console.error("Error cleaning build files:", error)
}

// Build with bundle analyzer
console.log("📊 Building with bundle analyzer...")
try {
  execSync("ANALYZE=true next build", { stdio: "inherit" })
} catch (error) {
  console.error("Error building:", error)
}
