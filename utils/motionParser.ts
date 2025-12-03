/**
 * Shared utilities for parsing muscle action text and extracting motion keywords
 */

/**
 * Standard motion keywords used across the app
 * Compound motions (2+ words) should come first for accurate matching
 */
export const MOTION_KEYWORDS = [
  'medial rotation', 
  'lateral rotation',
  'flexion',
  'extension',
  'abduction',
  'adduction',
  'rotation',
  'pronation',
  'supination',
  'dorsiflexion',
  'plantarflexion',
  'elevation',
  'depression',
  'protraction',
  'retraction',
  'inversion',
  'eversion',
  'circumduction',
  'opposition'
] as const;

/**
 * Regex pattern for splitting action text by newlines, semicolons, or numbered items
 * Matches: \n, ;, or position before "1.", "2.", etc.
 */
export const ACTION_SPLIT_PATTERN = /[\n;]|(?=\d+\.)/;

/**
 * Parse action string and extract individual motion keywords
 * @param actionText - The action description text to parse
 * @param limit - Maximum number of motions to return (default: 6)
 * @returns Array of motion keywords found in the text
 */
export function extractMotionKeywords(actionText: string, limit: number = 6): string[] {
  if (!actionText || actionText.trim().length === 0) {
    return [];
  }

  // Split by newlines, semicolons, or before numbered items
  const actionList = actionText
    .split(ACTION_SPLIT_PATTERN)
    .map((s) => s.replace(/^\d+\.\s*/, '').trim()) // Remove leading numbers
    .filter((s) => s.length > 3 && !s.match(/^\d+$/)); // Filter short or number-only items
  
  const found: string[] = [];
  
  // Check for motion keywords (compound first, then simple)
  actionList.forEach((action) => {
    const lower = action.toLowerCase();
    MOTION_KEYWORDS.forEach((keyword) => {
      if (lower.includes(keyword) && !found.includes(keyword)) {
        found.push(keyword);
      }
    });
  });
  
  // If no specific motions found but content exists, return a generic indicator
  if (found.length === 0 && actionText.length > 0) {
    return ['action'];
  }
  
  return found.slice(0, limit);
}
