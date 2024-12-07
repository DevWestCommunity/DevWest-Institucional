import { createComponent } from "./core/components.js";
import { getColaborator } from "./services/collaborator.service.js";

const collaborator = await getColaborator();
createComponent("card-collaborator", collaborator);

const dateYear = new Date().getFullYear();
createComponent("footer", [{ date: dateYear }]);
