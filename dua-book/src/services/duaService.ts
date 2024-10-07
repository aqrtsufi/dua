const GITHUB_RAW_CONTENT_URL = 'https://raw.githubusercontent.com/yashineonline/duaRepository/main/dua.txt';

export async function fetchDuaContent(): Promise<string> {
  try {
    const response = await fetch(GITHUB_RAW_CONTENT_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch dua content');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching dua content:', error);
    throw error;
  }
}

export function parseDuaContent(content: string): any {
  // Implement parsing logic here
  // This will depend on the exact format of your dua.txt file
  // For now, let's return the raw content
  return content;
}