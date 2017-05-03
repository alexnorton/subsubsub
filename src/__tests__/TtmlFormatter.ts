import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import TtmlFormatter from '../TtmlFormatter';
import SubtitleSet from '../SubtitleSet';

describe('TtmlFormatter', () => {
  describe('secondsToTimestamp', () => {
    it('returns timecodes correctly', () => {
      const input = 123.45678;
      const output = TtmlFormatter.secondsToTimestamp(input);
      expect(output).toBe('00:02:03.46');
    })
  });

  describe('format', () => {
    it('formats TTML files correctly', () => {
      const input = JSON.parse(readFileSync(join(__dirname, 'fixtures', 'subtitles.json')).toString());
      const expectedOutput = readFileSync(join(__dirname, 'fixtures', 'output.xml')).toString();

      const subtitleSet = new SubtitleSet(input);
      
      expect(TtmlFormatter.format(subtitleSet, 'Transcript to TTML', 'BBC 2016')).toBe(expectedOutput);
    });
  });
});
