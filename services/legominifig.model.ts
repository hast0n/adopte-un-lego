export default class LegoMinifig {
  constructor(
    public ID: string,
    public Name: string,
    public NumParts: Number,
    public ImgUrl: string,
    public FigUrl: string,
    public LastModified: string,
    public quantity: number
  ) {}
}
