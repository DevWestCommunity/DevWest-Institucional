export function footerComponent() {
  const element = document.querySelector("footer");

  fetch("components/footer-component/footer-component.html")
    .then((response) => response.text())
    .then((data) => {
      const dateYear = new Date().getFullYear();
      data = data.replace("{{date}}", dateYear);

      const dom = new DOMParser();

      const template = dom
        .parseFromString(data, "text/html")
        .querySelector("template");

      const newElement = template.content.cloneNode(template);

      element.appendChild(newElement);

      const style = dom
        .parseFromString(data, "text/html")
        .querySelector("style");

      element.appendChild(style);
    });
}

