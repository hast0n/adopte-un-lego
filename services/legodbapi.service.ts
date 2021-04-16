import LegoSet from "./legoset.model";
import LegoPart from "./legopart.model";
import Minifig from "./legominifig.model";

const key = "804ce1e3431c0498af9ca6e60bb6e27d";
const rootEndpoint = `https://rebrickable.com/api/v3/lego`;

interface ISet {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  img_url: string;
  set_url: string;
  last_modified_dt: string;
}

interface IFig {
  set_num: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

interface IPart {
  part_num: string;
  name: string;
  part_cat_id: number;
  year_from: number;
  year_to: number;
  part_url: string;
  part_img_url: string;
  prints: any;
  molds: any;
  alternates: any;
  external_ids: any;
  print_of: string;
}

class LegoDbApi {
  // ---- SETS ----
  // .recup un set en fonction de l'id du set
  searchLegoSetById(id: number): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}sets/${id}/?key=${key}`
    ).then((sets) => this.createLegoSets(sets));
  }
  // .recup des sets en fonction de l'id du theme
  searchLegoSetByThemeId(id: number): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}sets/?key=${key}&theme_id=${id}`
    ).then((sets) => this.createLegoSets(sets));
  }
  // .recup des sets en fonction d'un ou plusieurs mot
  searchLegoSetByTerm(term: string): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}sets/?key=${key}&search=${term}`
    ).then((sets) => this.createLegoSets(sets));
  }
  // .recup des sets alternatifs (à un set particulier) en fonction de l'id du set en question
  searchAlternateBuildsById(sourceSetId: number): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}sets/${sourceSetId}/alternates/?key=${key}`
    ).then((sets) => this.createLegoSets(sets));
  }

  // ---- MINIFIGS ----
  // .recup des minifigs en fonction d'un ou plusieurs mot
  searchMinifigByTerm(term: string): Promise<Array<Minifig>> {
    return this.fetchFigsFromApi(
      `${rootEndpoint}minifigs/?key=${key}&search=${term}`
    ).then((figs) => this.createMinifigs(figs));
  }
  // .recup un minifig en fonction de l'id du set
  searchMinifigById(id: number): Promise<Array<Minifig>> {
    return this.fetchFigsFromApi(
      `${rootEndpoint}minifigs/${id}/?key=${key}`
    ).then((figs) => this.createMinifigs(figs));
  }

  // ---- MISC ----
  getThemePictureUrlById(id: number): string {
    return `https://rebrickable.com/static/img/themes/${id}-tile.png`;
  }

  fetchSetsFromApi(query: string): Promise<Array<ISet>> {
    return (
      fetch(query)
        // FIXME: JSON parse error when ingredient is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => [])
    );
  }

  private fetchPartsFromApi(query: string): Promise<Array<IPart>> {
    return (
      fetch(query)
        // FIXME: JSON parse error when ingredient is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => [])
    );
  }

  private fetchFigsFromApi(query: string): Promise<Array<IFig>> {
    return (
      fetch(query)
        // FIXME: JSON parse error when ingredient is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => [])
    );
  }

  private createLegoSets(sets: Array<ISet>): Array<LegoSet> {
    return sets.map((set) => this.createLegoSet(set));
  }

  private createLegoSet(set: ISet): LegoSet {
    return new LegoSet(
      set.set_num,
      set.name,
      set.year,
      set.theme_id,
      set.num_parts,
      set.img_url,
      set.set_url,
      set.last_modified_dt
    );
  }

  private createMinifigs(figs: Array<IFig>): Array<Minifig> {
    return figs.map((fig) => this.createMinifig(fig));
  }

  private createMinifig(fig: IFig): Minifig {
    return new Minifig(
      fig.set_num,
      fig.name,
      fig.num_parts,
      fig.set_img_url,
      fig.set_url,
      fig.last_modified_dt
    );
  }

  private createLegoParts(parts: Array<IPart>): Array<LegoPart> {
    return parts.map((part) => this.createLegoPart(part));
  }

  private createLegoPart(part: IPart): LegoPart {
    return new LegoPart(
      part.part_num,
      part.name,
      part.part_cat_id,
      part.year_from,
      part.year_to,
      part.part_url,
      part.part_img_url
    );
  }
}

export default new LegoDbApi();
