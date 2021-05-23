import CoreService from "./core.service";
import Database from "./database.service";

export default class PokemonService extends CoreService {
  public db = new Database("pokemon", "species");
}
