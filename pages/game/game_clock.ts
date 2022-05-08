import { system_clock } from "js/util/gameclock/pre-definedClock";
import { AdjustableClock } from "js/util/gameclock/AdjustableClock";

export var game_clock: AdjustableClock = new AdjustableClock(system_clock, 1);