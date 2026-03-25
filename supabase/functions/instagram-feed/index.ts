const TOKEN = Deno.env.get('INSTAGRAM_TOKEN');
const USER_ID = Deno.env.get('INSTAGRAM_USER_ID');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://sushi-iwa.com',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (!TOKEN || !USER_ID) {
    return new Response(
      JSON.stringify({ error: 'Instagram credentials not configured' }),
      { status: 500, headers: CORS_HEADERS },
    );
  }

  const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${TOKEN}&limit=12`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: CORS_HEADERS,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=3600',
    },
  });
});
