export async function getRecipePhoto(query: string): Promise<string> {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}+food&per_page=1`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
    }
  );

  if (!res.ok) {
    return "/placeholder.jpg";
  }

  const data = await res.json();
  return data.photos?.[0]?.src?.large ?? "/placeholder.jpg";
}
