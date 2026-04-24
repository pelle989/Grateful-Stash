import { g as getStash } from "../../../../../chunks/db.js";
import { json } from "@sveltejs/kit";
const GET = async ({ params }) => {
  if (!params.id) {
    return json({ message: "Stash id is required." }, { status: 400 });
  }
  const stash = await getStash(params.id);
  if (!stash) {
    return json({ message: "Stash not found." }, { status: 404 });
  }
  return json({ stash });
};
export {
  GET
};
