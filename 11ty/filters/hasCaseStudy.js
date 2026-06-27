export default function (collection, client) {
  const page = collection.find(page => page.data?.title === client);
  return page?.data?.order;
}