import { sprintf } from 'sprintf-js';
import { create } from 'xmlbuilder';

import SubtitleSet from './SubtitleSet';

class TtmlFormatter {
  static secondsToTimestamp(totalSeconds: number): string {
    const hours = totalSeconds / 3600;
    const minutes = (totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;
    return sprintf('%02u:%02u:%05.2f', hours, minutes, seconds);
  }

  static format(subtitleSet: SubtitleSet, title: string, copyright: string): string {
    const ttml = create('tt', {
      encoding: 'utf-8',
    }).att({
      xmlns: 'http://www.w3.org/2006/10/ttaf1',
      'xmlns:ttp': 'http://www.w3.org/2006/10/ttaf1#parameter',
      'ttp:timeBase': 'media',
      'xmlns:tts': 'http://www.w3.org/2006/10/ttaf1#style',
      'xml:lang': 'en',
      'xmlns:ttm': 'http://www.w3.org/2006/10/ttaf1#metadata',
    });

    const head = ttml.ele('head');

    const metadata = head.ele('metadata');
    metadata.ele('ttm:title').text(title || '');
    metadata.ele('ttm:copyright').text(copyright || '');

    const styling = head.ele('styling');

    styling.ele('style', {
      id: 's0',
      'tts:backgroundColor': 'black',
      'tts:fontStyle': 'normal',
      'tts:fontSize': '16',
      'tts:fontFamily': 'sansSerif',
      'tts:color': 'white',
    });

    const body = ttml.ele('body', {
      'tts:textAlign': 'center',
      style: 's0',
    }).ele('div');

    subtitleSet.subtitles.forEach((subtitle, index) => {
      body.ele('p', {
        id: `p${index + 1}`,
        style: 's0',
        begin: this.secondsToTimestamp(subtitle.start),
        end: this.secondsToTimestamp(subtitle.end),
      }).text(
        subtitle.text
      );
    });

    return ttml.end({ pretty: true });
  }
}

export default TtmlFormatter;
