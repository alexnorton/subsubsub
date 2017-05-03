import { sprintf } from 'sprintf-js';

import SubtitleSet from './SubtitleSet';

class SrtFormatter {
  static secondsToTimestamp(totalSeconds: number): string {
    const hours = totalSeconds / 3600;
    const minutes = (totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;
    return sprintf('%02u:%02u:%06.3f', hours, minutes, seconds).replace('.', ',');
  }

  static format(subtitleSet: SubtitleSet): string {
    return subtitleSet.subtitles.map((subtitle, index) => (
      [
        index + 1,
        `${this.secondsToTimestamp(subtitle.start)} --> ${this.secondsToTimestamp(subtitle.end)}`,
        `${subtitle.text}`,
        ''
      ].join('\n')
    )).join('\n');
  }
}

export default SrtFormatter;
