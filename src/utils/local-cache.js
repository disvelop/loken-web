const CACHE_TIME_HOUR = 730;

export class LocalCache {
  static set(key, data, expiryTime = CACHE_TIME_HOUR) {
    if (!window.localStorage) { return; }

    const expiry = new Date();
    expiry.setTime(expiry.getTime() + (expiryTime * 60 * 60 * 1000));

    const object = { expiry, data };
    localStorage.setItem(`loken:${key}`, JSON.stringify(object));
  }
  
  static get(key) {
    if (!window.localStorage) { return null; }

    let object = localStorage.getItem(`loken:${key}`);
    if (!object) { return null; }

    object = JSON.parse(object);
    if ((new Date()) > object.expiry) {
      localStorage.removeItem(`loken:${key}`);
    }
    return object.data;
  }
}