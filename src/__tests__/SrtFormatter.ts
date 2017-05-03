import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import SrtFormatter from '../SrtFormatter';
import SubtitleSet from '../SubtitleSet';

describe('SrtFormatter', () => {
  describe('secondsToTimestamp', () => {
    it('returns timecodes correctly', () => {
      expect(SrtFormatter.secondsToTimestamp(123.45678)).toBe('00:02:03,457');
    })
  });

  describe('format', () => {
    it('produces SRT files correctly', () => {
      const input = JSON.parse(readFileSync(join(__dirname, 'fixtures', 'subtitles.json')).toString());
      const expectedOutput = readFileSync(join(__dirname, 'fixtures', 'output.srt')).toString();

      const subtitleSet = new SubtitleSet(input);

      expect(SrtFormatter.format(subtitleSet)).toBe(expectedOutput);
    });
  });
});
 