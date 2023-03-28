import mongoose from 'mongoose';
const { Schema } = mongoose;

const playerSchema = new Schema({
    name:String,
    elo: Number,
    games: Number,
    wins: Number,
    loses: Number,
    discordId: { type: String, unique : true},
});

export const Player = mongoose.model('Player', playerSchema);
