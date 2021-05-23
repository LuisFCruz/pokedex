import CoreService from "./core.service";
import Database from "./database.service";

export default class EvolutionService extends CoreService {
  public db = new Database("pokemon", "evolutions");
}
