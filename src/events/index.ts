import {ready} from "./ready";
import {interactionCreate} from "./interactionCreate";
import {messageReactionAdd} from "./messageReactionAdd";

export const events: any = [ready, interactionCreate, messageReactionAdd];
