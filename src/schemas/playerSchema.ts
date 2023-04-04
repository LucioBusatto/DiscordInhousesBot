import mongoose from 'mongoose';
import {Player} from "../models/Player";
const { Schema } = mongoose;

const playerSchema = new Schema<Player>({
    name:String,
    elo: Number,
    games: Number,
    wins: Number,
    loses: Number,
    discordId: { type: String, unique : true},
});

export const PlayerModel = mongoose.model('Player', playerSchema);
