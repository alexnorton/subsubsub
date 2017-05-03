import Subtitle from './Subtitle';
import TtmlFormatter from './TtmlFormatter';
import SrtFormatter from './SrtFormatter';
import JsonFormatter from './JsonFormatter';

class SubtitleSet {
  subtitles: Subtitle[];

  static fromJSON(json: Array<{ start: number, end: number, text: string }>): SubtitleSet {
    const subtitles = json.map(subtitle => new Subtitle(subtitle.start, subtitle.end, subtitle.text));
    const subtitleSet = new SubtitleSet(json);
    return subtitleSet;
  }

  constructor(subtitles?: Subtitle[]) {
    this.subtitles = subtitles || [];
  }

  toJson() {
    return JsonFormatter.format(this);
  }

  toTtml(title: string, copyright: string) {
    return TtmlFormatter.format(this, title, copyright);
  }

  toSrt() {
    return SrtFormatter.format(this);
  }
}

export default SubtitleSet;
