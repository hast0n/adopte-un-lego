import LegoSet from "./legoset.model";
import LegoPart from "./legopart.model";
import LegoMinifig from "./legominifig.model";
import LegoTheme from "./legotheme.model";
import PartCategory from "./partcategory.model";

const key = "fd9dac4a20bbe4cd0b747c92c2532917";
const rootEndpoint = `https://rebrickable.com/api/v3/lego`;

interface ISet {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
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
  part: {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_url: string;
    part_img_url: string;
  };
  color: {
    name: string;
  };
  quantity: number;
}

interface ITheme {
  id: number;
  parent_id: number;
  name: string;
}

interface IPartCategory {
  id: number;
  name: string;
  part_count: number;
}

class LegoDbApi {
  // ---- SETS ----
  // .recup un set en fonction de l'id du set
  getLegoSetById(id: string): Promise<LegoSet> {
    return this.fetchSetFromApi(
      `${rootEndpoint}/sets/${id}/?key=${key}`
    ).then((set) => this.createLegoSet(set));
  }
  // .recup des sets en fonction de l'id du theme
  searchLegoSetByThemeId(id: number): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}/sets/?key=${key}&theme_id=${id}`
    ).then((sets) => this.createLegoSets(sets));
  }
  // .recup des sets en fonction d'un ou plusieurs mots
  searchLegoSetByTerm(term: string): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}/sets/?key=${key}&search=${term}`
    ).then((sets) => this.createLegoSets(sets));
  }
  // .recup des sets alternatifs (à un set particulier) en fonction de l'id du set en question
  getAlternateBuildsById(sourceSetId: string): Promise<Array<LegoSet>> {
    return this.fetchSetsFromApi(
      `${rootEndpoint}/sets/${sourceSetId}/alternates/?key=${key}`
    ).then((sets) => this.createLegoSets(sets));
  }

  // ---- MINIFIGS ----
  // .recup des minifigs en fonction d'un ou plusieurs mot
  searchLegoMinifigByTerm(
    term: string,
    page: number = 1,
    size: number = 100
  ): Promise<Array<LegoMinifig>> {
    return this.fetchFigsFromApi(
      `${rootEndpoint}/minifigs/?key=${key}&search=${term}&page_size=${size}`
    ).then((figs) => this.createMinifigs(figs));
  }
  // .recup 1 minifig en fonction de son id
  getLegoMinifigById(id: string): Promise<LegoMinifig> {
    return this.fetchFigFromApi(
      `${rootEndpoint}/minifigs/${id}/?key=${key}`
    ).then((fig) => this.createMinifig(fig));
  }

  getAllLegoMinifigs(
    page: number = 1,
    size: number = 100
  ): Promise<Array<LegoMinifig>> {
    return this.fetchFigsFromApi(
      `${rootEndpoint}/minifigs/?key=${key}&page=${page}&page_size=${size}&ordering=name`
    ).then((figs) => this.createMinifigs(figs));
  }

  getMinifigsIdsBySetId(
    set_num: string
  ): Promise<{ set_num: string; quantity: number }[]> {
    let p = fetch(`${rootEndpoint}/sets/${set_num}/minifigs/?key=${key}`)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse["results"] || [])
      .catch((error) => []);

    return p.then(
      (results: { set_num: string; quantity: number }[]) => results
    );
  }

  // ---- PARTS ----
  getPartsBySetID(id: string, num: number = 100): Promise<Array<LegoPart>> {
    return this.fetchPartsFromApi(
      `${rootEndpoint}/sets/${id}/parts/?key=${key}&page_size=${num}`
    ).then((parts) => this.createLegoParts(parts));
  }

  getPartsCategories(): Promise<Array<PartCategory>> {
    return this.fetchPartsCategories(
      `${rootEndpoint}/part_categories/?key=${key}`
    ).then((categories) => this.createPartCategories(categories));
  }

  getPartByCategoryId(id: number): Promise<Array<LegoPart>> {
    return this.fetchPartsFromApi(
      `${rootEndpoint}/parts/?part_cat_id=${id}`
    ).then((parts) => this.createLegoParts(parts));
  }

  getPartsByMinifigId(set_num: string): Promise<Array<LegoPart>> {
    return this.fetchPartsFromApi(
      `${rootEndpoint}/minifigs/${set_num}/parts/?key=${key}`
    ).then((parts) => this.createLegoParts(parts));
  }

  // ---- THEME ----
  getAllThemes(): Promise<Array<LegoTheme>> {
    let p = fetch(`${rootEndpoint}/themes/?key=${key}&page_size=599`)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse["results"] || [])
      .catch((error) => []);

    return p.then((results) => this.createThemes(results));
  }

  getThemeByID(id: number): Promise<LegoTheme> {
    let p = fetch(`${rootEndpoint}/themes/${id}/?key=${key}`)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse || [])
      .catch((error) => []);

    return p.then((response) => this.createTheme(response));
  }

  getThemePictureUrlById(id: number): string {
    return `https://rebrickable.com/static/img/themes/${id}-tile.png`;
  }

  getThemeLogoUrlById(id: number): string {
    return `https://rebrickable.com/static/img/themes/${id}-logo.png`;
  }

  // ---- FETCH ----
  private fetchSetsFromApi(query: string): Promise<Array<ISet>> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse["results"] || [])
      .catch((error) => []);
  }

  private fetchSetFromApi(query: string): Promise<ISet> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse || [])
      .catch((error) => []);
  }

  private fetchPartsFromApi(query: string): Promise<Array<IPart>> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse["results"] || [])
      .catch((error) => []);
  }

  private fetchPartFromApi(query: string): Promise<IPart> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse || [])
      .catch((error) => []);
  }

  private fetchFigsFromApi(query: string): Promise<Array<IFig>> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse["results"] || [])
      .catch((error) => []);
  }

  private fetchFigFromApi(query: string): Promise<IFig> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse || [])
      .catch((error) => []);
  }

  private fetchPartsCategories(query: string): Promise<Array<IPartCategory>> {
    return fetch(query)
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse["results"] || [])
      .catch((error) => []);
  }

  // ---- Format data types ----
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
      set.set_img_url,
      set.set_url,
      set.last_modified_dt
    );
  }

  private createMinifigs(figs: Array<IFig>): Array<LegoMinifig> {
    return figs.map((fig) => this.createMinifig(fig));
  }

  private createMinifig(fig: IFig): LegoMinifig {
    return new LegoMinifig(
      fig.set_num,
      fig.name,
      fig.num_parts,
      fig.set_img_url,
      fig.set_url,
      fig.last_modified_dt,
      undefined
    );
  }

  private createLegoParts(parts: Array<IPart>): Array<LegoPart> {
    return parts.map((part) => this.createLegoPart(part));
  }

  private createLegoPart(part: IPart): LegoPart {
    return new LegoPart(
      part.part.part_num,
      part.part.name,
      part.part.part_cat_id,
      part.part.part_url,
      part.part.part_img_url,
      part.quantity,
      part.color.name
    );
  }

  private createThemes(themes: Array<ITheme>): Array<LegoTheme> {
    return themes.map((theme) => this.createTheme(theme));
  }

  private createTheme(theme: ITheme): LegoTheme {
    return new LegoTheme(theme.id, theme.name, theme.parent_id);
  }

  private createPartCategory(partCategory: IPartCategory): PartCategory {
    return new PartCategory(
      partCategory.id,
      partCategory.name,
      partCategory.part_count
    );
  }

  private createPartCategories(
    categories: Array<IPartCategory>
  ): Array<PartCategory> {
    return categories.map((category) => this.createPartCategory(category));
  }
}

export default new LegoDbApi();
