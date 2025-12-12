export async function handler(event) {
  try {
    // Get Reddit path from the request
    const path =
      event.path.replace(/^\/.netlify\/functions\/redditProxy/, "") || "/";
    const url = `https://www.reddit.com${path}${
      event.rawQuery ? "?" + event.rawQuery : ""
    }`;

    // Fetch Reddit JSON
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
    });

    const text = await res.text();

    // If Reddit returns HTML (blocked), return 403
    if (text.trim().startsWith("<")) {
      return {
        statusCode: 403,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: "Blocked by Reddit",
      };
    }

    // Return JSON
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: err.message,
    };
  }
}
