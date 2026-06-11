export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel | call me &mdash;c.',
    meta_title: 'Codrin Pavel | call me &mdash;c.',
    meta_description: "Design-driven developer building fast, accessible websites for mission-driven organizations.",
    //meta_image: '/assets/img/social_image.jpg',  // place in src/assets/favicon
  }
};
