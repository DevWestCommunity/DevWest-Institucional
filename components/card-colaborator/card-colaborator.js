export async function cardColaboratorComponent() {
  //Template => Componete HTML
  let template = "";
  fetch("components/card-colaborator/card-coladorator.html")
    .then((res) => res.text())
    .then((data) => {
      template = data;
    });

  //Elememto de saida
  const element = document.querySelector("#card-coladorator");

  //Montar de colaboradores
  const colaborators = await getColaborator();
  for (const colaborator of colaborators) {
    let copytTemplate = template;
    copytTemplate = copytTemplate
      .replace("{{link}}", colaborator.link)
      .replace("{{name}}", colaborator.name)
      .replace("{{avatar}}", colaborator.avatar);
    element.innerHTML += copytTemplate;
  }
}

async function getColaborator() {
  const colaborator = {};
  let result;
  await fetch("mocks/colaborators.json")
    .then((res) => res.json())
    .then((data) => {
      result = data;
    });
  return result;
}
