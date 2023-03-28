import { Player } from "../models/Player";
import {onLobbyExpired} from "../helpers/discord.helpers";

export const playersMock: Player[] = [
  {
    name: "Vonki",
    team: "blue",
    discordId: 1,
    role: "TOP",
    ready: false,
  },
  {
    name: "Batin",
    team: "blue",
    discordId: 2,
    role: "JG",
    ready: false,
  },
  {
    name: "Chief",
    team: "blue",
    discordId: 3,
    role: "MID",
    ready: false,
  },
  {
    name: "Rayffen",
    team: "blue",
    discordId: 4,
    role: "BOT",
    ready: false,
  },
  {
    name: "Lyonz",
    team: "blue",
    discordId: 5,
    role: "SUPP",
    ready: false,
  },
  {
    name: "Lukenzo",
    team: "red",
    discordId: 6,
    role: "TOP",
    ready: false,
  },
  {
    name: "AxlBg",
    team: "red",
    discordId: 7,
    role: "JG",
    ready: false,
  },
  {
    name: "Joelito",
    team: "red",
    discordId: 8,
    role: "MID",
    ready: false,
  },
  {
    name: "KZ",
    team: "red",
    discordId: 9,
    role: "BOT",
    ready: false,
  },
  {
    name: "Tomate",
    team: "red",
    discordId: 10,
    role: "SUPP",
    ready: false,
  },
];

type CacheEntry<T> = { createdAt: Date, value: T};
type CacheDeleteCallback<TKey, TValue> = (key: TKey, value: TValue) => void;
class Cache<TKey extends unknown, TValue extends unknown> {
  private cache = new Map<TKey, CacheEntry<TValue>>();
  /** Time to live in minutes */
  private ttl: number;
  private deleteCallback: CacheDeleteCallback<TKey, TValue>;

  constructor(ttl: number, onDeleteCallback: CacheDeleteCallback<TKey, TValue>) {
    this.ttl = ttl;
    this.deleteCallback = onDeleteCallback;
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
        this.deleteCallback(key, entry.value);
      }
    });

    setTimeout(() => {
      this.clearEntries();
    }, 1000 * 60 * 10 )
  }
}

export const lobbiesCache = new Cache<string, Player[]>(1, onLobbyExpired);
