export type Player = {
  name: string;
  elo: number;
  team?: string;
  games?: number;
  wins?: number;
  loses?: number;
  id?: string;
  id_discord: string;
  role: string;
  ready: boolean;
};
