import Database from "./database.service";

export default abstract class CoreService {
  public abstract db: Database;

  add(key: string, value: any) {
    this.db.add(key, value);
  }

  get<T = unknown>(key: string) {
    return this.db.get<T>(key);
  }
}
