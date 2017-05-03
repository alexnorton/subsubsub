import SubtitleSet from './SubtitleSet';

class JsonFormatter {
  static format(subtitleSet: SubtitleSet): Array<{ start: number, end: number, text: string }> {
    return subtitleSet.subtitles.map(subtitle => ({
      start: subtitle.start,
      end: subtitle.end,
      text: subtitle.text,
    }));
  }
}

export default JsonFormatter;
