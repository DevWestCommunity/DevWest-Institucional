import { get } from "./../../infra/collaborator.repository.js";

export async function getCollaborator() {
  const colaborator = await get();
  return colaborator;
}
