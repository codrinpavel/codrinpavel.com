import work from "./work.js";

/**
  {
    GDUSA: [
      {
        organization: "GDUSA",
        title: "Digital Design Awards",
        year: 2024,
        client: "Brilliant Earth",
        project: "2024 Mission Report"
      },
    ],
  }
*/

export default function () {
  const grouped = work()
    .filter((item) => item.awards)
    .flatMap((item) =>
      item.awards.map((award) => ({
        ...award,
        client: item.client,
        project: item.project,
        projectUrl: item.url,
      }))
    )
    .sort((a, b) => b.year - a.year)
    .reduce((groups, award) => {
      const org = award.organization;

      groups[org] ??= [];
      groups[org].push(award);

      return groups;
    }, {});

  return Object.entries(grouped).map(([organization, awards]) => ({
    organization,
    awards,
  }));
}