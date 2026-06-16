import getWork from "./work.js";

export default function () {
  const work = getWork();
  const clients = [];

  work.forEach((project) => {
    let client = clients.find((client) => client.name === project.client);

    if (!client) {
      client = {
        name: project.client,
        long: project.long || null,
        count: 0,
        projects: [],
        inactive: project.inactive,
      };

      clients.push(client);
    }

    client.count += 1;
    client.projects.push(project);
  });

  clients.forEach((client) => {
    client.projects.sort((a, b) => b.year - a.year);

    client.latestYear = client.projects[0]?.year || null;
  });

  clients.sort((a, b) => {
    if (b.count !== a.count) {
      //return b.count - a.count;
    }

    return (b.latestYear || 0) - (a.latestYear || 0);
  });

  return clients;
}