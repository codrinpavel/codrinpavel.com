export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel',
    meta_title: 'Codrin Pavel',
    meta_description: "Independent, design-driven frontend developer with 15+ years of experience, working remotely from an island in Spain.",
    //meta_image: '/assets/img/social_image.jpg',  // place in src/assets/favicon
  }
};
