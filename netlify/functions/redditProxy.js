export async function handler(event) {
  // 1. Handle CORS pre-flight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: "",
    };
  }

  try {
    // 2. Clean and format the path
    let path = event.path.replace(/^\/.netlify\/functions\/redditProxy/, "");
    if (!path || path === "/") path = "/r/all"; // Default path
    if (!path.startsWith("/")) path = "/" + path;

    // 3. MANDATORY: Append .json for unauthenticated requests
    // Reddit often blocks requests to standard URLs that don't end in .json
    let redditPath = path.endsWith("/") ? path.slice(0, -1) : path;
    if (!redditPath.endsWith(".json")) {
      redditPath += ".json";
    }

    // 4. Reconstruct URL with query parameters
    const queryString = event.rawQuery ? `?${event.rawQuery}` : "";
    const redditURL = `https://www.reddit.com${redditPath}${queryString}`;

    // 5. Use a descriptive User-Agent (Required by Reddit API rules)
    // Format: platform:app_id:version (by /u/your_username)
    const customHeaders = {
      "User-Agent": "web:my-reddit-app:v1.0.0 (by /u/YourRedditUsername)",
      Accept: "application/json",
    };

    const response = await fetch(redditURL, {
      headers: customHeaders,
    });

    const data = await response.text();

    // 6. Check for Bot Challenges (HTML responses)
    if (data.trim().startsWith("<")) {
      return {
        statusCode: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Reddit blocked this request (Returned HTML/CAPTCHA).",
          tip: "Ensure your User-Agent is unique and you are below 10 requests per minute.",
          url: redditURL,
        }),
      };
    }

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60", // Cache for 1 min to save rate limits
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
