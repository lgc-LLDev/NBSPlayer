import { DATA_HISTORY_PATH, DATA_PLAYLIST_PATH } from './const';

export interface PlaylistData {
  name: string;
  files: string[];
}

export type HistoryData = string;

export class TipError extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'TipError';
  }
}

const dataManagerCache = new Map<string, DataManager<any>>();

export class DataManager<T = any> {
  protected _dataCache?: T;

  protected constructor(
    public readonly filePath: string,
    public readonly defaultContent?: T
  ) {}

  public static get<T = any, RT extends DataManager = DataManager<T>>(
    filePath: string,
    defaultContent?: T
  ): RT {
    if (!dataManagerCache.has(filePath)) {
      const m = new this(filePath, defaultContent);
      dataManagerCache.set(filePath, m);
      return m as any;
    }
    return dataManagerCache.get(filePath) as any;
  }

  public async read(forceFlush = false): Promise<T> {
    if (this._dataCache && !forceFlush) return this._dataCache;

    const res = file.readFrom(this.filePath);
    if (res) {
      this._dataCache = JSON.parse(res);
      return JSON.parse(res);
    }

    if (!this.defaultContent)
      throw new Error(`Read ${this.filePath} failed and no default provided`);
    await this.write(this.defaultContent);

    this._dataCache = this.defaultContent;
    return this.defaultContent;
  }

  public async write(content: T): Promise<void> {
    const res = file.writeTo(this.filePath, JSON.stringify(content));
    if (!res) throw new Error(`Failed to write to ${this.filePath}`);
    this._dataCache = content;
  }

  public operate(callback: (content: T) => Promise<T>): Promise<void> {
    return this.read()
      .then(callback)
      .then((content) => this.write(content));
  }
}

export class ListDataManager<T = any> extends DataManager<T[]> {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected async beforeAdd(x: T[], data: T[], index: number): Promise<void> {}

  public async add(x: T | T[], index = -1) {
    await this.operate(async (data) => {
      const ls = Array.isArray(x) ? x : [x];
      await this.beforeAdd?.(ls, data, index);
      if (index === -1) data.push(...ls);
      else data.splice(index, 0, ...ls);
      return data;
    });
  }

  public async remove(index: number) {
    await this.operate(async (data) => {
      data.splice(index, 1);
      return data;
    });
  }

  public async replace(index: number, newData: T) {
    await this.operate(async (data) => {
      data[index] = newData;
      return data;
    });
  }

  public async changeIndex(from: number, to: number) {
    await this.operate(async (data) => {
      const [entry] = data.splice(from, 1);
      data.splice(to, 0, entry);
      return data;
    });
  }
}

export class PlaylistDataManager extends ListDataManager<PlaylistData> {
  public static getFromXuid(xuid: string): PlaylistDataManager {
    return super.get(`${DATA_PLAYLIST_PATH}/${xuid}.json`, []);
  }

  // eslint-disable-next-line class-methods-use-this
  protected override async beforeAdd(
    x: PlaylistData[],
    data: PlaylistData[]
  ): Promise<void> {
    const duplicated = x.find((xx) => data.some((dx) => dx.name === xx.name));
    if (duplicated) throw new TipError(`歌单名称 ${duplicated} 已存在`);
  }

  public async change(index: number, newData: Partial<PlaylistData>) {
    await this.operate(async (data) => {
      const entry = data[index];
      const existedNames = data
        .map((x) => x.name)
        .filter((x) => x !== entry.name);
      if (newData.name && existedNames.includes(newData.name))
        throw new TipError(`歌单名称 ${newData.name} 已存在`);
      Object.assign(entry, newData);
      return data;
    });
  }

  public async getByName(name: string): Promise<[PlaylistData, number]> {
    const data = await this.read();
    const index = data.findIndex((x) => x.name === name);
    if (index === -1) throw new TipError(`歌单 ${name} 不存在`);
    return [data[index], index];
  }
}

export class HistoryDataManager extends ListDataManager<HistoryData> {
  public static getFromXuid(xuid: string): HistoryDataManager {
    return super.get(`${DATA_HISTORY_PATH}/${xuid}.json`, []);
  }

  public async insertFirst(x: HistoryData) {
    await this.operate(async (data) => {
      const index = data.indexOf(x);
      if (index !== -1) data.splice(index, 1);
      data.unshift(x);
      return data;
    });
  }
}
