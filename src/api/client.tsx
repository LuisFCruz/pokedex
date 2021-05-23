import axios from 'axios';

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5000,
});

const toCamel = (key: string): string =>
  key.replace(/[_-](\w)/g, (match, g) => g.toUpperCase());

const keysToCamel = function (o: any): any {
  if (o && typeof o === "object" && !Array.isArray(o)) {
    return Object.entries(o).reduce(
      (aggr: { [key: string]: unknown }, item) => {
        const [key, value] = item;

        aggr[toCamel(key)] = keysToCamel(value);
        return aggr;
      },
      {}
    );
  }
  if (Array.isArray(o)) {
    return o.map(keysToCamel);
  }

  return o;
};

client.interceptors.response.use(
  (response) => {
    response.data = keysToCamel(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;