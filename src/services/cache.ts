import { Player } from "../models/Player";
import {onLobbyExpired} from "../helpers/discord.helpers";

type CacheEntry<T> = { createdAt: Date, value: T};
type CacheDeleteCallback<TKey, TValue> = (key: TKey, value: TValue) => void;
class Cache<TKey extends unknown, TValue extends unknown> {
  private cache = new Map<TKey, CacheEntry<TValue>>();
  /** Time to live in minutes */
  private ttl: number;
  private deleteCallback?: CacheDeleteCallback<TKey, TValue>;

  constructor(ttl: number, onDeleteCallback?: CacheDeleteCallback<TKey, TValue>) {
    this.ttl = ttl;
    if(onDeleteCallback){
      this.deleteCallback = onDeleteCallback;
    }
    this.clearEntries();
  }

  public get(entry: TKey) {
    return this.cache.get(entry)?.value;
  }

  public set<T extends unknown>(entry: TKey, value: TValue) {
    const decoratedValue = {
      value,
      createdAt: new Date()
    }
    this.cache.set(entry, decoratedValue);
  }

  public has(entry: TKey) {
    return this.cache.has(entry);
  }

  private clearEntries() {
    const now = new Date();

    this.cache.forEach((entry, key) => {
      const hasExpired = now.getTime() - entry.createdAt.getTime() > this.ttl * 60 * 1000;
      if (hasExpired) {
        this.cache.delete(key);
        if(this.deleteCallback){
          this.deleteCallback(key, entry.value);
        }
      }
    });

    setTimeout(() => {
      this.clearEntries();
    }, 1000 * 60 * 10 )
  }
}

export const lobbiesCache = new Cache<string, Player[]>(1, onLobbyExpired);
export const matchCache = new Cache<string, Player[]>(1);

