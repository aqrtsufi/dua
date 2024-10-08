const GITHUB_RAW_CONTENT_URL = '/api/yashineonline/duaRepository/main/dua.txt';

export async function fetchDuaContent(): Promise<string> {
  try {
    console.log('Fetching dua content from:', GITHUB_RAW_CONTENT_URL);
    const response = await fetch(GITHUB_RAW_CONTENT_URL);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch dua content: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    console.log('Fetched content:', text.substring(0, 100) + '...'); // Log first 100 characters
    return text;
  } catch (error) {
    console.error('Error fetching dua content:', error);
    throw error;
  }
}

import type { Prayer } from '../types/prayer'

export function parseDuaContent(content: string): {
  introduction: string;
  procedure: string;
  link: string;
  recommendation: string;
  prayers: Prayer[];
  ending: string;
} {
  const lines = content.split('\n');
  let result = {
    introduction: '',
    procedure: '',
    link: '',
    recommendation: '',
    prayers: [] as Prayer[],
    ending: ''
  };

  let currentSection = '';
  let currentPrayer: Partial<Prayer> = {};

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
      if (currentPrayer.title) {
        result.prayers.push(currentPrayer as Prayer);
      }
      currentPrayer = { title: line.substring(2).trim() };
    } else if (line.startsWith('E:') && currentPrayer.title) {
      currentPrayer.meaning = line.substring(2).trim();
      result.prayers.push(currentPrayer as Prayer);
      currentPrayer = {};
    } else if (line.startsWith('At the end, recite:')) {
      currentSection = 'ending';
    } else {
      switch (currentSection) {
        case 'introduction':
          result.introduction += line + '\n';
          break;
        case 'procedure':
          result.procedure += line + '\n';
          break;
        case 'recommendation':
          result.recommendation += line + '\n';
          break;
        case 'ending':
          result.ending += line + '\n';
          break;
      }
    }
  }

  return result;
}