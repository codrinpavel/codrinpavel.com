import getWork from "./work.js";

const CATEGORIES = [
  {
    title: "Corporate Reporting",
    test: (project) => project.tags?.includes("report"),
  },
  {
    title: "Publishing & Media",
    test: (project) => project.tags?.includes("media"),
  },
  {
    title: "Websites & Digital Platforms",
    test: (project) => !project.tags?.includes("independent"),
  },
  {
    title: "Independent Work",
    test: (project) => project.tags?.includes("independent"),
  },
];

export default function () {
  const work = getWork();

  const archive = CATEGORIES.map((category) => ({
    title: category.title,
    count: 0,
    clients: [],
  }));

  work.forEach((project) => {
    const categoryIndex = CATEGORIES.findIndex((category) =>
      category.test(project)
    );

    const category = archive[categoryIndex];
    category.count += 1;

    let client = category.clients.find(
      (client) => client.name === project.client
    );

    if (!client) {
      client = {
        name: project.client,
        long: project.long || null,
        projects: [],
        inactive: project.inactive,
      };

      category.clients.push(client);
    }

    client.projects.push(project);
  });

  archive.forEach((category) => {
    category.clients.forEach((client) => {
      client.projects.sort((a, b) => b.year - a.year);
    });

    category.clients.sort((a, b) => {
      return b.projects[0].year - a.projects[0].year;
    });
  });

  return archive;
}