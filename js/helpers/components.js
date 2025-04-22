export async function createComponent(name, datas) {
  const element = document.querySelector(name);
  const localTemplate = `components/${name}/${name}.html`;

  const context = await getTemplateContext(localTemplate);

  const listElements = mountElements(context, datas);

  for (const newElement of listElements) {
    if (element) {
      element.appendChild(newElement);
    }
  }

  const styleElement = mountStyle(context);
  if (styleElement) {
    element.appendChild(styleElement);
  }
}

async function getTemplateContext(localTemplate) {
  const context = await fetch(localTemplate)
    .then((res) => res.text())
    .catch((err) => {
      console.error("Erro >>> ", err);
    })
    .finally(() => {
      console.log("leitura contexto terminada!");
    });
  return context;
}

function mountElements(context, datas) {
  const dom = new DOMParser();
  let listElements = [];
  let template = dom
    .parseFromString(context, "text/html")
    .querySelector("template");
  listElements.push(template.content.cloneNode(template));

  if (datas && datas.length > 0) {
    listElements = [];
    for (const data of datas) {
      const keys = Object.keys(data);
      let tempContext = context;
      for (const key of keys) {
        tempContext = tempContext.replace(`{{${key}}}`, data[key]);
      }
      template = dom
        .parseFromString(tempContext, "text/html")
        .querySelector("template");
      listElements.push(template.content.cloneNode(template));
    }
  }

  return listElements;
}

function mountStyle(context) {
  const dom = new DOMParser();
  const style = dom
    .parseFromString(context, "text/html")
    .querySelector("style");
  return style;
}
