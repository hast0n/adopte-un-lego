export default class LegoSet {
  constructor(
    public ID: string,
    public Name: string,
    public Year: number,
    public ThemeID: number,
    public NumParts: number,
    public ImgUrl: string,
    public SetUrl: string,
    public LastModified: string
  ) {}
}