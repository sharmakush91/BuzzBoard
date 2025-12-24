export async function handler(event) {
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
    let path = event.path.replace(/^\/.netlify\/functions\/redditProxy/, "");
    if (!path.startsWith("/")) path = "/" + path;
    if (event.rawQuery) path += `?${event.rawQuery}`;

    const redditURL = `https://www.reddit.com${path}`;

    const response = await fetch(redditURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://www.reddit.com/",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    const text = await response.text();

    if (text.trim().startsWith("<")) {
      return {
        statusCode: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error:
            "Reddit blocked the request. Try using a different endpoint or add rate limiting.",
          url: redditURL,
          suggestion:
            "Consider using Reddit's official API with authentication",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
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
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      }),
    };
  }
}
