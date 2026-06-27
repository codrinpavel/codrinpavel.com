export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel / Independent Frontend Developer & Consultant',
    meta_title: 'Codrin Pavel / Independent Frontend Developer & Consultant',
    meta_description: "For more than 15 years, I’ve been an independent frontend partner to agencies, publishers, nonprofits, and enterprise teams, turning creative concepts and complex content into accessible, high-performance websites, reports, and media platforms.",
    //meta_image: '/assets/img/social_image.jpg',  // place in src/assets/favicon
  }
};
