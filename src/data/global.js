export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel | Independent Developer',
    meta_title: 'Codrin Pavel | Independent Developer',
    meta_description: "I partner with client teams to build polished user interfaces that are fast, reliable, and easy to use.",
    //meta_image: '/assets/img/social_image.jpg',  // place in src/assets/favicon
  }
};
