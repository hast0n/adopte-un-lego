export default class LegoPart {
  constructor(
    public ID: string,
    public Name: string,
    public CategoryID: number,
    public PartUrl: string,
    public ImgUrl: string,
    public quantity: number
  ) {}
}
