export default class LegoSet {
  constructor(
    public SetID: string,
    public Name: string,
    public Year: number,
    public ThemeID: number,
    public NumParts: number,
    public ImgUrl: string,
    public set_url: string,
    public last_modified_dt: string
  ) {}
}
