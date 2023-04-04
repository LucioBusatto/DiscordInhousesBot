export type Player = {
    name: string;
    elo: number;
    team?: string;
    games?: number;
    wins?: number;
    loses?: number;
    discordId: string;
    role: string;
    ready: boolean;
}