import LegoSet from "./legoset.model";
import LegoPart from "./legopart.model";

const key = "804ce1e3431c0498af9ca6e60bb6e27d";
const rootEndpoint = `https://rebrickable.com/api/v3/lego`;

export interface Set {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

class LegoDbApi {
  searchLegoSetById(id: number): Promise<Array<LegoSet>> {
    return this.fetchFromApi(
      `${rootEndpoint}sets/${id}/?key=${key}`
    ).then((sets) => this.createLegoSets(sets));
  }

  searchLegoSetByThemeId(id: number): Promise<Array<LegoSet>> {
    return this.fetchFromApi(
      `${rootEndpoint}sets/?key=${key}&theme_id=${id}`
    ).then((sets) => this.createLegoSets(sets));
  }

  searchLegoSetByTerm(term: string): Promise<Array<LegoSet>> {
    return this.fetchFromApi(
      `${rootEndpoint}sets/?key=${key}&search=${term}`
    ).then((sets) => this.createLegoSets(sets));
  }

  searchAlternateBuildsById(sourceSetId: number): Promise<Array<LegoSet>> {
    return this.fetchFromApi(
      `${rootEndpoint}sets/${sourceSetId}/alternates/?key=${key}`
    ).then((sets) => this.createLegoSets(sets));
  }

  getThemePictureUrlById(id: number): string {
    return `https://rebrickable.com/static/img/themes/${id}-tile.png`
  }

  private fetchFromApi(query: string): Promise<Array<Set>> {
    return (
      fetch(query)
        // FIXME: JSON parse error when ingredient is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.drinks || [])
        .catch((error) => [])
    );
  }

  private createLegoSets(sets: Array<Set>): Array<LegoSet> {
    // Create cocktails
    return sets.map((set) => this.createLegoSet(set));
  }

  private createLegoSet(set: Set): LegoSet {
    return new LegoSet(
      set.SetID: string,
      set.Name: string,
      set.Year: number,
      set.ThemeID: number,
      set.NumParts: number,
      set.ImgUrl: string,
      set.set_url: string,
      set.last_modified_dt: string
    );
  }
}

export default new LegoDbApi();
