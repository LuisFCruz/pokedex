export default class Database {
  private db?: IDBDatabase;
  private updateComplete = new Promise(() => {});

  constructor(private database: string, private storeName: string) {
    this.init();
  }

  private init() {
    this.updateComplete = new Promise((res, rej) => {
      const request = indexedDB.open(this.database);
      request.onsuccess = () => {
        this.db = request.result;
        res(null);
      };

      request.onupgradeneeded = () => {
        this.createStore(request.result);
      };

      request.onerror = () => {
        rej(null);
      };
    });
  }

  private createStore = (db: IDBDatabase) => {
    ["species", "evolutions"].forEach((name) => {
      db.createObjectStore(name, {
        autoIncrement: false,
      });
    });
  };

  public async get<T = unknown>(key: string): Promise<T> {
    await this.updateComplete;
    return new Promise((res, rej) => {
      const transaction = this.db?.transaction([this.storeName], "readonly");
      const store = transaction?.objectStore(this.storeName);
      const request = store?.get(key);

      if (!request) {
        rej();
        return;
      }

      request.onerror = () => {
        rej(request.error);
      };
      request.onsuccess = () => {
        res(request.result);
      };
    });
  }

  public async add<T = unknown>(key: string, data: T) {
    await this.updateComplete;
    const transaction = this.db?.transaction([this.storeName], "readwrite");

    const store = transaction?.objectStore(this.storeName);
    store?.add(data, key);
  }
}
