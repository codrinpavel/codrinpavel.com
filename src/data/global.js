export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel',
    meta_title: 'Codrin Pavel',
    meta_description: "Independent frontend partner to agencies, publishers, nonprofits, and enterprise teams, delivering user interfaces for over 15 years.",
    //meta_image: '/assets/img/social_image.jpg',  // place in src/assets/favicon
  }
};
