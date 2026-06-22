export default function (collection, client) {
  const page = collection.find(page => page.data?.client === client);
  return page?.data?.order;
}