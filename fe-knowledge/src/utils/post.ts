export const calculateMinRead = (content: string): number => {
    const wordCount: number = content.trim().split(/\s+/).length;
    const wordsPerMinute: number = 200;
    const minRead: number = Math.ceil(wordCount / wordsPerMinute);

    return minRead;
}

