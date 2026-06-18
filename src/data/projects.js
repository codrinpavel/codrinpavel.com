import work from "./work.js";

export default function () {
  return work().filter(
    (project) => project.tags?.includes("featured")
  );
}