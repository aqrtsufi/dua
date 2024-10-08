const GITHUB_RAW_CONTENT_URL = 'https://raw.githubusercontent.com/yashineonline/duaRepository/main/dua.txt';

const CACHE_KEY = 'duaContent';

export async function fetchDuaContent(): Promise<string> {
  try {
    const response = await fetch(GITHUB_RAW_CONTENT_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch dua content: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    localStorage.setItem(CACHE_KEY, text);

    return text;
  } catch (error) {
    console.error('Error fetching dua content:', error);
    const cachedContent = localStorage.getItem(CACHE_KEY);
    if (cachedContent) {
      console.log('Using cached content');
      return cachedContent;
    }
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
  salawat: string;
  fatiha: string;
} {
  const lines = content.split('\n');
  let result = {
    introduction: '',
    procedure: '',
    link: '',
    recommendation: '',
    prayers: [] as Prayer[],
    ending: '',
    salawat: '',
    fatiha: ''
  };

  let currentSection = '';
  let arabicLines: string[] = [];
  let meaningLines: string[] = [];
  let isCollectingArabic = false;
  let isCollectingMeaning = false;

  for (const line of lines) {
    if (line.startsWith('POSITIVITY PRAYERS')) {
      currentSection = 'introduction';
    } else if (line.startsWith('P:')) {
      currentSection = 'procedure';
    } else if (line.startsWith('I:')) {
      currentSection = 'recommendation';
      result.recommendation += line.substring(2).trim() + '\n';
    } else if (line.startsWith('A:')) {
      isCollectingArabic = true;
      isCollectingMeaning = false;
      arabicLines = [];
    } else if (line.startsWith('E:')) {
      isCollectingArabic = false;
      isCollectingMeaning = true;
      meaningLines = [];
    } else if (line.startsWith('SF:')) {
      currentSection = 'ending';
      result.ending += line.substring(3).trim() + '\n';
    } else if (line.startsWith('S:')) {
      currentSection = 'salawat';
    } else if (line.startsWith('F:')) {
      currentSection = 'fatiha';
    } else if (line.startsWith('L:')) {
      result.link = line.substring(2).trim();
    } else if (line.startsWith('PP:')) {
      currentSection = 'protectionPrayers';
    } else if (line.startsWith('TP:')) {
      currentSection = 'travelingPrayers';
    } else if (isCollectingArabic && line.trim() !== '') {
      arabicLines.push(line.trim());
    } else if (isCollectingMeaning && line.trim() !== '') {
      meaningLines.push(line.trim());
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
        case 'salawat':
          result.salawat += line + '\n';
          break;
        case 'fatiha':
          result.fatiha += line + '\n';
          break;
      }
    }
  }

  // Process collected Arabic and Meaning lines
  for (let i = 1; i < arabicLines.length; i++) {
    result.prayers.push({
      arabic: arabicLines[i],
      meaning: meaningLines[i] || ''
    });
  }

  return result;
}