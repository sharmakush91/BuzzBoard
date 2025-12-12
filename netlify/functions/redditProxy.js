export async function handler(event) {
  try {
    let path = event.path.replace(/^\/.netlify\/functions\/redditProxy/, "");
    if (!path.startsWith("/")) path = "/" + path;
    if (event.rawQuery) path += `?${event.rawQuery}`;

    const redditURL = `https://www.reddit.com${path}`;
    const response = await fetch(redditURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.reddit.com/",
        Origin: "https://www.reddit.com",
      },
    });

    const text = await response.text();

    if (text.trim().startsWith("<")) {
      return {
        statusCode: 403,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          error: "Reddit blocked the request",
          url: redditURL,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
