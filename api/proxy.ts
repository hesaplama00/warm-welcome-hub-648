export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  const response = await fetch("https://www.amasyakuyumculardernegi.com/");
  const html = await response.text();
  
  return new Response(JSON.stringify({ contents: html }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
```

Kaydedince CMD'de:
```
git add .
git commit -m "proxy guncellendi"
git push