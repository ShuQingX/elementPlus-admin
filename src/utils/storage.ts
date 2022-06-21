const DEFAULT_EXPIRE_TIME = 60 * 60 * 24 * 7;

class createStoreage {
  private prefix: string;
  private storage: Storage;

  constructor(storage: Storage, prefix: string) {
    this.storage = storage;
    this.prefix = prefix;
  }

  getKey(key: string): string {
    return `${this.prefix}${key}`.toUpperCase();
  }

  /** @description 获取值 */
  get(key: string, def = '') {
    const strData = this.storage.getItem(this.getKey(key));
    if (strData) {
      try {
        const { value, expire } = JSON.parse(strData);
        if (expire !== null && expire >= Date.now()) {
          return value;
        }
        this.remove(key);
      } catch (e: any) {
        throw new Error(e);
      }
    } else {
      return def;
    }
  }

  /** @description 设置值 */
  set(key: string, value: any, expire: number | null = DEFAULT_EXPIRE_TIME): void {
    const data = JSON.stringify({
      value,
      expire: expire !== null ? Date.now() + expire * 1000 : null
    });
    this.storage.setItem(this.getKey(key), data);
  }

  /** @description 删除值 */
  remove(key: string): void {
    this.storage.removeItem(this.getKey(key));
  }

  /** @description 清空值 */
  clear(): void {
    this.storage.clear();
  }
}

// 默认使用 localStorage
export default new createStoreage(localStorage, '');
