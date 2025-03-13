export async function getLocationByIp(ip: string): Promise<{ city: string; country: string } | null> {
  try {
    // This is a placeholder implementation. In a real application, you would use a geolocation API.
    // Using Abstract API: https://www.abstractapi.com/ip-geolocation-api
    // Make sure to sign up for an API key and replace 'YOUR_ABSTRACT_API_KEY' with your actual key.
    const apiKey = process.env.ABSTRACT_API_KEY
    if (!apiKey) {
      console.warn("Abstract API key is missing. Using mock location data.")
      return { city: "Unknown", country: "Unknown" }
    }

    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ip}`)

    if (!response.ok) {
      console.error("Geolocation API request failed:", response.status, response.statusText)
      return null
    }

    const data = await response.json()

    if (data) {
      return {
        city: data.city || "Unknown",
        country: data.country || "Unknown",
      }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting location:", error)
    return null
  }
}

