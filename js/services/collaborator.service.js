import { get } from "./../infra/collaborator.repository.js";

export async function getColaborator() {
  const colaborator = await get();
  return colaborator;
}
