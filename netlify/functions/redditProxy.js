export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: "",
    };
  }

  try {
    // Strip Netlify function path
    let path = event.path.replace(/^\/.netlify\/functions\/redditProxy/, "");
    if (!path.startsWith("/")) path = "/" + path;

    // Preserve query string (?limit=20 etc.)
    if (event.rawQuery) {
      path += `?${event.rawQuery}`;
    }

    const redditURL = `https://www.reddit.com${path}`;

    const response = await fetch(redditURL, {
      headers: {
        // ✅ Reddit-compliant User-Agent (THIS is the important part)
        "User-Agent": "web:BuzzBoard:v1.0 (by /u/Puzzleheaded_Hat_362)",
        Accept: "application/json",
      },
    });

    const text = await response.text();

    // Reddit sometimes returns HTML when blocking
    if (!response.ok || text.trim().startsWith("<")) {
      return {
        statusCode: response.status || 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Reddit blocked the request",
          status: response.status,
          url: redditURL,
          note: "This usually happens due to rate limiting on serverless IPs",
        }),
      };
    }

    // Successful response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Cache to reduce Reddit hits
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
}
