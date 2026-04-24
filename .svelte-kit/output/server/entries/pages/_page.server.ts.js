import { l as listStashes } from "../../chunks/db.js";
async function load() {
  return listStashes();
}
export {
  load
};
