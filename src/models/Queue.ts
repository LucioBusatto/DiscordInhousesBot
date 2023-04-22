import { PLAYERS_PER_ROLE, ROLES } from "../const";
import { Match } from "./Match";
import { playersMock } from "../mock";
import { filteredArray } from "../helpers/helpers";
import { lobbiesCache, matchesCache } from "../services/cache";
import { Player } from "./Player";
import play from "../commands/play";

export class Queue {
  players: Map<string, Player>;

  constructor() {
    this.players = new Map();
    this.mockQueue();
  }

  /**
   * @return bool value whether the player was added or not
   * */
  addPlayer(player: Player, role) {
    if (this.isPlayerBusy(player)) {
      return false;
    }

    const playerForQueue = {
      id: player.id,
      name: player.name,
      id_discord: player.id_discord,
      elo: player.elo,
      role: role,
      ready: false,
    };

    this.players.set(player.id, playerForQueue);
    // createMatchIfPossible();
    if (this.canCreateMatch()) {
      const matchPlayers = this.createMatchPlayersArray();
      new Match(matchPlayers);
      this.deletePlayers(matchPlayers);
    }

    return true;
  }

  removePlayer(player: any) {
    return this.players.delete(player.id);
  }

  canCreateMatch(): boolean {
    let canCreate = true;

    ROLES.forEach((role) => {
      const playersByRole = this.getPlayers().filter(
        (player) => player.role == role
      );
      if (playersByRole.length < PLAYERS_PER_ROLE) {
        canCreate = false;
      }
    });

    return canCreate;
  }

  createMatchPlayersArray(): any[] {
    const matchPlayers: any[] = [];
    for (const role of ROLES) {
      const playersWithRole = this.getPlayers().filter(
        (player) => player.role == role
      );
      matchPlayers.push(...playersWithRole.slice(0, PLAYERS_PER_ROLE));
    }

    return matchPlayers;
  }

  deletePlayers(players) {
    players.forEach((p) => this.players.delete(p.id));
  }

  getPlayers() {
    return [...this.players.values()];
  }

  private mockQueue() {
    playersMock.forEach((p) => this.players.set(p.id, p));
  }

  private isPlayerBusy(player) {
    const isInQueue = this.players.has(player.id);

    return (
      isInQueue || this.playerIsInMatch(player) || this.playerIsInLobby(player)
    );
  }

  private playerIsInLobby(player: Player) {
    return lobbiesCache.getValues().some((m) => {
      return m.some((p) => p.id_discord === player.id_discord);
    });
  }

  private playerIsInMatch(player: Player) {
    return matchesCache.getValues().some((m) => {
      return m.some((p) => p.id_discord === player.id_discord);
    });
  }
}
