// netlify/functions/redditProxy.js
export async function handler(event) {
  try {
    // 1️⃣ Get path after the function
    let path = event.path.replace(/^\/.netlify\/functions\/redditProxy/, "");

    // 2️⃣ Preserve query parameters
    const queryString = event.rawQuery || "";
    if (queryString) {
      path += `?${queryString}`;
    }

    // 3️⃣ Construct Reddit URL
    const redditURL = `https://www.reddit.com${path}`;
    console.log("Fetching Reddit URL:", redditURL);

    // 4️⃣ Fetch from Reddit with proper User-Agent
    const response = await fetch(redditURL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NetlifyFunction/1.0)",
      },
    });

    const text = await response.text();

    // 5️⃣ Parse JSON safely
    let data;
    try {
      const json = JSON.parse(text);

      // 6️⃣ Normalize results so slices always get data.children
      if (path.startsWith("/subreddits/search.json")) {
        // For subreddit search (enter)
        data = {
          data: { children: json.subreddits || json.data?.children || [] },
        };
      } else if (path.startsWith("/api/subreddit_autocomplete_v2.json")) {
        // For autocomplete (keydown)
        data = { data: { children: json.data?.children || [] } };
      } else {
        // For posts (/r/...)
        data = json;
      }
    } catch (err) {
      // If Reddit returns HTML (404, captcha, etc.), send raw response
      return { statusCode: response.status, body: text };
    }

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
