export default class LegoPart {
  thumbnail: string;

  constructor(
    public id: number,
    public name: string,
    public image: string,
    public instructions: string
  ) {
    this.thumbnail = image + "/preview";
  }
}
