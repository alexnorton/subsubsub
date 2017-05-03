class Subtitle {
  start: number;
  end: number;
  text: string;

  constructor(start: number, end: number, text: string) {
    this.start = start;
    this.end = end;
    this.text = text;
  }
}

export default Subtitle;
