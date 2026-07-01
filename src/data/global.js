export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel / Independent Frontend Developer & Consultant',
    meta_title: 'Codrin Pavel / Independent Frontend Developer & Consultant',
    meta_description: "Independent frontend developer with 15+ years building award-winning websites, ESG reports, media platforms, and enterprise experiences for agencies, nonprofits, and Fortune 500 companies.",
    meta_image: '/assets/img/social_image.png',  // place in src/assets/favicon
  }
};
