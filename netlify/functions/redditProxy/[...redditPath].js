export async function handler(event) {
  try {
    // Get everything after /redditProxy/ from the dynamic route
    const path = "/" + event.pathParameters.redditPath;

    // Fetch Reddit JSON
    const res = await fetch(
      `https://www.reddit.com${path}${
        event.rawQuery ? "?" + event.rawQuery : ""
      }`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.reddit.com/",
          Origin: "https://www.reddit.com",
        },
      }
    );

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
