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
    const lines = content.split('\n');
    let result = {
      introduction: '',
      procedure: '',
      link: '',
      recommendation: '',
      prayers: [] as Prayer [],
      ending: ''
    };
  
    let currentSection = '';
    for (const line of lines) {
      if (line.startsWith('POSITIVITY PRAYERS')) {
        currentSection = 'introduction';
      } else if (line.startsWith('Procedure of reciting')) {
        currentSection = 'procedure';
      } else if (line.startsWith('bit.ly/')) {
        result.link = line.trim();
      } else if (line.startsWith('Repeat each set')) {
        currentSection = 'recommendation';
      } else if (line.startsWith('A:')) {
        currentSection = 'prayers';
        result.prayers.push({ title: line.substring(2).trim(), arabic: '', meaning: '' });
      } else if (line.startsWith('E:') && result.prayers.length > 0) {
        result.prayers[result.prayers.length - 1].meaning = line.substring(2).trim();
      } else if (line.startsWith('At the end, recite:')) {
        currentSection = 'ending';
      } 
    }
    return result;
  }