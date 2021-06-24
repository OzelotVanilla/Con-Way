import { event_bus } from "../../js/event/eventbus"
import { tickbeginevent } from "../../js/event/tickbeginevent"
import { initialize } from "../../js/event/tickevent"



$(function ()
{
    initialize();
    event_bus.post(new tickbeginevent(new Date().getTime()))
})