export async function get() {
  let result = await fetch("mocks/colaborators.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return result;
}
