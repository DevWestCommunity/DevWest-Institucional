import "./libs/feather.min.js";
import { documentLoad } from "./helpers/documentEffects.js";
import { createComponent } from "./helpers/components.js";
import { getCollaborator } from "./domain/services/collaborator.service.js";
import { modalCookieConsent } from "./../components/modal-cookie/modal-cookie.js";

await createComponent("navbar", []);

await createComponent("footer", [{ date: new Date().getFullYear() }]);

const teams = await getCollaborator();

await createComponent("team-card", teams.slice(0, 4));

await createComponent("modal-cookie");

feather.replace();

documentLoad();

modalCookieConsent();
