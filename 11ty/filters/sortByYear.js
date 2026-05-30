export default function sortByYear(items = []) {
  return items
    .filter(item => item?.year != null)
    .toSorted((a, b) => b.year - a.year);
}