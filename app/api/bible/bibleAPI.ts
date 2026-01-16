const bibleBooks = [
  { book: "Genesis", chapters: 50 },
  { book: "Exodus", chapters: 40 },
  { book: "Leviticus", chapters: 27 },
  { book: "Numbers", chapters: 36 },
  { book: "Deuteronomy", chapters: 34 },
  { book: "Joshua", chapters: 24 },
  { book: "Judges", chapters: 21 },
  { book: "Ruth", chapters: 4 },
  { book: "1 Samuel", chapters: 31 },
  { book: "2 Samuel", chapters: 24 },
  { book: "1 Kings", chapters: 22 },
  { book: "2 Kings", chapters: 25 },
  { book: "1 Chronicles", chapters: 29 },
  { book: "2 Chronicles", chapters: 36 },
  { book: "Ezra", chapters: 10 },
  { book: "Nehemiah", chapters: 13 },
  { book: "Esther", chapters: 10 },
  { book: "Job", chapters: 42 },
  { book: "Psalm", chapters: 150 },
  { book: "Proverbs", chapters: 31 },
  { book: "Ecclesiastes", chapters: 12 },
  { book: "Song of Solomon", chapters: 8 },
  { book: "Isaiah", chapters: 66 },
  { book: "Jeremiah", chapters: 52 },
  { book: "Lamentations", chapters: 5 },
  { book: "Ezekiel", chapters: 48 },
  { book: "Daniel", chapters: 12 },
  { book: "Hosea", chapters: 14 },
  { book: "Joel", chapters: 3 },
  { book: "Amos", chapters: 9 },
  { book: "Obadiah", chapters: 1 },
  { book: "Jonah", chapters: 4 },
  { book: "Micah", chapters: 7 },
  { book: "Nahum", chapters: 3 },
  { book: "Habakkuk", chapters: 3 },
  { book: "Zephaniah", chapters: 3 },
  { book: "Haggai", chapters: 2 },
  { book: "Zechariah", chapters: 14 },
  { book: "Malachi", chapters: 4 },
  { book: "Matthew", chapters: 28 },
  { book: "Mark", chapters: 16 },
  { book: "Luke", chapters: 24 },
  { book: "John", chapters: 21 },
  { book: "Acts", chapters: 28 },
  { book: "Romans", chapters: 16 },
  { book: "1 Corinthians", chapters: 16 },
  { book: "2 Corinthians", chapters: 13 },
  { book: "Galatians", chapters: 6 },
  { book: "Ephesians", chapters: 6 },
  { book: "Philippians", chapters: 4 },
  { book: "Colossians", chapters: 4 },
  { book: "1 Thessalonians", chapters: 5 },
  { book: "2 Thessalonians", chapters: 3 },
  { book: "1 Timothy", chapters: 6 },
  { book: "2 Timothy", chapters: 4 },
  { book: "Titus", chapters: 3 },
  { book: "Philemon", chapters: 1 },
  { book: "Hebrews", chapters: 13 },
  { book: "James", chapters: 5 },
  { book: "1 Peter", chapters: 5 },
  { book: "2 Peter", chapters: 3 },
  { book: "1 John", chapters: 5 },
  { book: "2 John", chapters: 1 },
  { book: "3 John", chapters: 1 },
  { book: "Jude", chapters: 1 },
  { book: "Revelation", chapters: 22 },
];

export interface BibleApiResponse {
  reference: string;
  verses: {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

export async function getVerse(
  reference: string,
  translation: string = "WEB"
): Promise<BibleApiResponse> {
  const res = await fetch(
    `https://bible-api.com/${encodeURIComponent(reference)}?translation=${translation}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error(`Bible API error: ${res.status}`);
  }

  return res.json();
}

export async function getDailyVerse(translation = "WEB") {
  const reference = await getDailyVerseReference();
  return getVerse(reference, translation);
}

export function getChapterCount(book: string): number {
  const found = bibleBooks.find((b) => b.book === book);
  return found ? found.chapters : 0;
}

export async function getVerseCount(book: string, chapter: number): Promise<number> {
  const res = await fetch(
    `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chapter");
  }

  const data: BibleApiResponse = await res.json();
  return data.verses.length;
}

async function getDailyVerseReference(): Promise<string> {
  const today = new Date();
  const seed = today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();

  function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Pick book
  const bookIndex = Math.floor(seededRandom(seed) * bibleBooks.length);
  const book = bibleBooks[bookIndex];

  // Pick chapter
  const chapter = Math.floor(seededRandom(seed + 1) * book.chapters) + 1;

  // Get total verses in that chapter
  const verseCount = await getVerseCount(book.book, chapter);

  // Pick a start verse
  const startVerse = Math.floor(seededRandom(seed + 2) * verseCount) + 1;

  // Pick length of passage between 1–6, but stay within chapter
  const passageLength = Math.min(Math.floor(seededRandom(seed + 3) * 4) + 1, verseCount - startVerse + 1);

  // End verse
  const endVerse = startVerse + passageLength - 1;

  return `${book.book} ${chapter}:${startVerse}-${endVerse}`;
}
