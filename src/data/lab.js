export default function () {
  return [
    {
      title: "Unnamed",
      period: "2026&mdash;Work in Progress",
      overview: "Currently building a white-label website auditing platform for web agencies to generate professional, client-ready web performance reports.",
    },
    {
      title: "Purpose UI",
      period: "2023&mdash;2025",
      thumb: "lab/purposeUI.jpg",
      extra: {
        "Collaborators": "Ideas On Purpose"
      },
      overview: "PurposeUI is an opinionated internal design system developed in collaboration with Ideas On Purpose. It establishes a consistent approach to responsive design through fluid design tokens, a configurable grid system, automatic color shade generation, theme support, reusable components, and utility classes. Typography, spacing, sizing, radii, and shadows all derive from a shared token system, allowing designers to focus on mobile and desktop layouts while the system seamlessly scales every viewport in between, significantly reducing the effort required to design and build responsive websites.",
      features: [
        "Fluid design token engine",
        "Responsive grid and layout system",
        "Theme engine powered by CSS vars",
        "Automatic color shade generation",
        "Generated utility class library",
        "Composable component primitives",
        "Comprehensive documentation website"
      ],
      meta: {
        "Links": [
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://purpose.iop.dev/">PurposeUI</a>'
        ],
        "Stack": [
          "SCSS",
          "Fluid Design Tokens",
          "Eleventy",
          "Nunjucks",
          "PostCSS",
          "PurgeCSS",
        ]
      }
    },
    {
      title: "CSSans Pro",
      period: "2019",
      thumb: "lab/cssans.pro.jpg",
      extra: {
        "Design": "Andronache Izabela"
      },
      overview: "CSSans Pro &mdash; The Colourful CSS Font &mdash; is an experimental typeface where every letter is constructed entirely with HTML and CSS, by using classes, pseudo-elements, gradients, border-radius, transforms, and CSS custom properties. The project gained attention within the web development community for showcasing advanced CSS techniques, earned recognition from design organizations, and inspired more experiments in CSS-based faux typography.",
      features: [
        "Uppercase & lowercase letters",
        "Numbers & punctuation",
        "Themeable colors using CSS variables",
        "Complete documentation",
        "MIT license (open source)",
      ],
      meta: {
        "Links": [
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codrinpavel.github.io/CSSans.Pro/">CSSans.Pro</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://github.com/codrinpavel/CSSans.Pro#readme">View on GitHub</a>',
        ],
        "Recognition": [
          '<a href="https://www.csswinner.com/details/cssans-pro/13320" target="_blank" rel="noopener noreferrer" data-title="Star of The Day">CSS Winner</a>',
          '<a href="https://www.bestcss.in/user/detail/CSSansPro-8419" target="_blank" rel="noopener noreferrer" data-title="Site of The Day">Best CSS</a>'
        ],
        "Mentions": [
          '<a href="https://css-tricks.com/colorful-typographic-experiments/" target="_blank" rel="noopener noreferrer" class="link">CSS-Tricks.com</a>',
          '<a href="https://x.com/smashingmag/status/1090992178216734720" target="_blank" rel="noopener noreferrer" class="link">SmashingMagazine</a>',
          '<a href="https://www.bypeople.com/cssans-pro-colorful-css-font/" target="_blank" rel="noopener noreferrer" class="link">ByPeople</a>',
          '<a href="https://armory.visualsoldiers.com/cssans-pro/" target="_blank" rel="noopener noreferrer" class="link">VisualSoldiers</a>',
          '<a href="https://codepen.io/spark/114#:~:text=CSSans%20Pro" target="_blank" rel="noopener noreferrer" class="link">CodePen Spark</a>',
        ]
      }
    },
    {
      title: "YoutubeOnRepeat.com",
      period: "2010&mdash;2018",
      figure: '<iframe width="560" height="315" data-src="https://www.youtube.com/embed/AEh-zzVRcQo?si=wOamPAFQH_4iT10e" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      caption: 'My favorite piece of community content. I don\'t know them, but I think they enjoyed my "it was supposed to be a weekend project."',
      overview: "YouTubeOnRepeat.com was my longest-running personal project and one of the early websites dedicated to looping YouTube videos, 6 years before YouTube introduced looping as a feature. Built on the YouTube API, it began as a PHP application, evolved into a jQuery-powered frontend, and ultimately became a Vue.js SPA. Users could save playlists and favorite videos without creating an account by leveraging the browser's then-new localStorage API, eliminating the need for a backend account system. At its peak, the site reached over 1 million monthly users with an average session duration of 45 minutes.",
      features: [
        "Loop YouTube videos indefinitely",
        "Loop specific segments of a video",
        "Save playlists and favorite videos",
        "Export and back up user data",
        "No account needed",
        "Video search (via YT API)",
        "Ad-supported monetization",
      ],
      meta: {
        "Status": [
          'Acquired (2018)',
        ],
        "Technologies": [
          'PHP',
          'Vue.js',
          'jQuery',
          'YouTube Data API',
          'Browser localStorage',
        ],
      }
    },
    {
      title: "CSS Pixel Art Generator",
      period: "2014",
      thumb: "lab/pixelart.jpg",
      overview: "An exploration of the creative limits of CSS, this project allowed users to draw pixel art, animate it frame by frame, and export production-ready CSS box-shadow animations, transparent PNG and GIF files. It became the foundation for many of my later pixelart CodePen experiments.",
      features: [
        "Frame-by-frame animation timeline",
        "CSS box-shadow generation",
        "Import images and convert to pixel art",
        "Export to CSS, GIF, PNG, and HTML",
        "One-click CodePen export",
        "Color palette with automatic shades",
        "LocalStorage project persistence"
      ],
      meta: {
        "Links": [
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/collection/DoqeaX">Pixelart Showcase</a>',
        ],
        "Technologies": [
          "JavaScript",
          "jQuery",
          "HTML5 Canvas",
          "CSS box-shadow",
          "GIF.js",
          "localStorage"
        ]
      }
    },
    {
      title: "CodePen Experiments",
      period: "2014&mdash;Present",
      thumb: "lab/codepen.jpg",
      overview: "CodePen has been my creative playground for more than a decade. It's where I experiment with things that don't belong in client projects—CSS-only art, conceptual animations, browser experiments, tiny games, pixel art made with a million box-shadows. Some of the work has been featured by the Microsoft Dev Blogs, CSS-Tricks, Smashing Magazine, and other front-end publications. My most popular pen has over 400,000 views and is still being referenced more than 12 years later.",
      features: [
        "CSS pixelart and illustrations",
        "Animation and motion experiments",
        "Tiny games and interactive toys",
        "Browser API explorations",
        "Creative UI concepts",
        "Visual effects and typography",
        "Beautifully useless ideas"
      ],
      meta: {
        "Showcase": [
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/full/bNWbvW">Flip Memory Game</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/full/XWaGER">Flat Preloader</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/full/Rwoorm">CSS Coordinates</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/full/Vwvqbw">Pulsing (he)art</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/full/nbZvad">Darth Vader</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/full/LYpxWB">Hellboy</a>',
          '<a target="_blank" rel="noopener noreferrer" class="link" href="https://codepen.io/zerospree/pens/popular">Explore More Pens</a>',
        ],
        "Mentions": [
          '<a href="https://css-tricks.com/books/greatest-css-tricks/full/#:~:text=Codrin%20Pavel" target="_blank" rel="noopener noreferrer" class="link">The Greatest CSS Tricks Vol. I</a>',
          '<a href="https://www.cssdesignawards.com/articles/design-dev-feed-6/194/#:~:text=Codrin%20Pavel" target="_blank" rel="noopener noreferrer" class="link">CSS Design Awards</a>',
        ]
      }
    },
  ]
}