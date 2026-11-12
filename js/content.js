/* ==========================================================================
   EDIT ME — every word, link and artwork on the site lives in this file.
   Anything marked PLACEHOLDER is fake text waiting to be replaced.
   (Images are web-sized copies made by tools/optimize.py from the /Portfolio folder.)
   ========================================================================== */

const SITE = {
  // Browser tab title
  pageTitle: "Amal Jawad — Concept Art, Illustration, 3D & Design",

  // Her brand (logo files live in images/logo/)
  brand: "Malooinks",

  // Top-left logo text (the Malooinks logo mark sits next to it) / nav
  logo: "Amal Jawad",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Displays", href: "#displays" },
    { label: "Thesis", href: "#thesis" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Concept Artist · Illustrator · 3D & Graphic Designer",  // PLACEHOLDER
    nameLine1: "Amal",
    nameLine2: "Jawad",
    tagline: "Concept art, illustration, 3D and graphic design — building worlds, characters and visuals.", // PLACEHOLDER
    cta: "View the work",
    scrollHint: "Scroll",
  },

  // Opening animation: her name gets sketched in pencil (the name comes from nameLine1 / nameLine2 above)
  loader: {
    enabled: true,                                      // set to false to skip it while editing
    label: "Loading portfolio",
    pencil: "#2b2a28",                                  // line colour of the sketch
  },

  // Draggable strip under the hero (what she does). Keep the names matching the work categories below.
  marquee: ["Concept Art", "Illustration", "Character Design", "3D Art", "Graphic Design"],

  work: {
    eyebrow: "Selected Work",
    title: "Recent projects",                           // PLACEHOLDER
    intro: "Click any piece to see it larger — videos play in the viewer. Filter by category below.", // PLACEHOLDER
    allLabel: "All",
    categoryOrder: ["Concept Art", "Illustration", "Character Design", "3D Art", "Graphic Design"],   // order of the filter buttons
    pageSize: 12,                                       // pieces shown before "Show more"
    moreLabel: "Show more",
  },

  /* ----------------------------------------------------------------------
     ARTWORKS — one line per piece. Category = the folder it came from.
       title / medium / year / size / description   → shown in the grid + viewer
       image  = big version, thumb = small version   (made by tools/optimize.py)
       type: "video" pieces also have  video: "images/work/.../file.mp4"
       featured: true                                → also floats in the 3D carousel at the top
     Add, remove, rename or reorder freely. Leave year/size empty ("") to hide them.
     ---------------------------------------------------------------------- */
  artworks: [
    { title: "Concept Art 01", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/0d81ce20-32f6-4e2f-801a-52f88fa1f4bb.webp", thumb: "images/work/concept-art/0d81ce20-32f6-4e2f-801a-52f88fa1f4bb-t.webp", w: 2000, h: 1414, featured: true },
    { title: "Bargaining", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/bargaining.webp", thumb: "images/work/illustration/bargaining-t.webp", w: 1390, h: 2000, featured: true },
    { title: "Narrative Character — Logan", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/narrative-logan.webp", thumb: "images/work/character-design/narrative-logan-t.webp", w: 1414, h: 2000, featured: true },
    { title: "Environment Render 02", category: "3D Art", type: "image", medium: "3D render", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/2-3.webp", thumb: "images/work/3d-art/2-3-t.webp", w: 1283, h: 783, featured: true },
    { title: "Takhti — Ad 01", category: "Graphic Design", type: "image", medium: "Graphic design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/graphic-design/upscaled1artboard-1-1.webp", thumb: "images/work/graphic-design/upscaled1artboard-1-1-t.webp", w: 1414, h: 2000, featured: true },
    { title: "IGS Artwork 02", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/igs-artwork-2.webp", thumb: "images/work/concept-art/igs-artwork-2-t.webp", w: 1414, h: 2000, featured: true },
    { title: "Out of Darkness", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/goofy-blurr-shadow2.webp", thumb: "images/work/illustration/goofy-blurr-shadow2-t.webp", w: 2000, h: 2000, featured: true },
    { title: "Character Design 01", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/356c2546-d3cc-4a87-9a0f-129eb52e7164.webp", thumb: "images/work/character-design/356c2546-d3cc-4a87-9a0f-129eb52e7164-t.webp", w: 1083, h: 2000 },
    { title: "Anger — Final Display", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/anger-final-display-poster.webp", thumb: "images/work/3d-art/anger-final-display-poster.webp", w: 675, h: 1200, video: "images/work/3d-art/anger-final-display.mp4" },
    { title: "Takhti — Ad 02", category: "Graphic Design", type: "image", medium: "Graphic design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/graphic-design/upscaled1artboard-1-2.webp", thumb: "images/work/graphic-design/upscaled1artboard-1-2-t.webp", w: 1414, h: 2000 },
    { title: "Concept Art 02", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/1afec9c5-4f36-4acc-b884-73e25734898a.webp", thumb: "images/work/concept-art/1afec9c5-4f36-4acc-b884-73e25734898a-t.webp", w: 2000, h: 1414 },
    { title: "Kayla", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/kayla.webp", thumb: "images/work/illustration/kayla-t.webp", w: 1390, h: 2000, featured: true },
    { title: "Character Design 02", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/7e6bbf0b-1d87-4d88-8f66-41ea20fa1f3b.webp", thumb: "images/work/character-design/7e6bbf0b-1d87-4d88-8f66-41ea20fa1f3b-t.webp", w: 1000, h: 2000 },
    { title: "Beyond Pixel — Final Animation", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/beyond-pixel-final-animation-poster.webp", thumb: "images/work/3d-art/beyond-pixel-final-animation-poster.webp", w: 900, h: 506, video: "images/work/3d-art/beyond-pixel-final-animation.mp4" },
    { title: "Takhti — Ad 03", category: "Graphic Design", type: "image", medium: "Graphic design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/graphic-design/upscaled1artboard-1-3.webp", thumb: "images/work/graphic-design/upscaled1artboard-1-3-t.webp", w: 1414, h: 2000 },
    { title: "Concept Art 03", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/eb8d81b6-48fb-4505-8c82-694bc866e9aa.webp", thumb: "images/work/concept-art/eb8d81b6-48fb-4505-8c82-694bc866e9aa-t.webp", w: 2000, h: 1414 },
    { title: "Hareafter", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/untitled-artwork-18.webp", thumb: "images/work/illustration/untitled-artwork-18-t.webp", w: 1415, h: 2000, featured: true },
    { title: "Character Design 03", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/9c4d0265-02cc-4774-96ce-9da12c52b666.webp", thumb: "images/work/character-design/9c4d0265-02cc-4774-96ce-9da12c52b666-t.webp", w: 1390, h: 2000 },
    { title: "Denial — Final Display", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/denial-final-display-poster.webp", thumb: "images/work/3d-art/denial-final-display-poster.webp", w: 675, h: 1200, video: "images/work/3d-art/denial-final-display.mp4" },
    { title: "Urdu Poster Design", category: "Graphic Design", type: "image", medium: "Graphic design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/graphic-design/whatsapp-image-2026-08-10-at-10-46-17-pm.webp", thumb: "images/work/graphic-design/whatsapp-image-2026-08-10-at-10-46-17-pm-t.webp", w: 1200, h: 1600 },
    { title: "Environment Design 01", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/envo-design1.webp", thumb: "images/work/concept-art/envo-design1-t.webp", w: 2000, h: 1414 },
    { title: "Acceptance", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/acceptance.webp", thumb: "images/work/illustration/acceptance-t.webp", w: 1920, h: 1080 },
    { title: "Character Design 04", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/a8427fcc-a1e6-4557-a122-7c324d70c659.webp", thumb: "images/work/character-design/a8427fcc-a1e6-4557-a122-7c324d70c659-t.webp", w: 1390, h: 2000 },
    { title: "Ophion — Final Display", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/ophion-final-display-poster.webp", thumb: "images/work/3d-art/ophion-final-display-poster.webp", w: 675, h: 1200, video: "images/work/3d-art/ophion-final-display.mp4" },
    { title: "IGS Artwork 03", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/igs-artwork-3.webp", thumb: "images/work/concept-art/igs-artwork-3-t.webp", w: 2000, h: 1414 },
    { title: "Anger", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/anger.webp", thumb: "images/work/illustration/anger-t.webp", w: 1390, h: 2000 },
    { title: "Character Design 05", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/b190cdb5-db78-4338-b4b8-24c26e5e504c.webp", thumb: "images/work/character-design/b190cdb5-db78-4338-b4b8-24c26e5e504c-t.webp", w: 1390, h: 2000 },
    { title: "Unreal Engine Test", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/testing2-unreal-editor-2026-06-09-14-19-26-poster.webp", thumb: "images/work/3d-art/testing2-unreal-editor-2026-06-09-14-19-26-poster.webp", w: 900, h: 432, video: "images/work/3d-art/testing2-unreal-editor-2026-06-09-14-19-26.mp4" },
    { title: "Quality Forged Blades", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/img-1320.webp", thumb: "images/work/concept-art/img-1320-t.webp", w: 1415, h: 2000 },
    { title: "Forest Path (Assignment 2)", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/assignment2-v1-final.webp", thumb: "images/work/illustration/assignment2-v1-final-t.webp", w: 2000, h: 1414 },
    { title: "Character Design 06", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/c271fee4-1793-4f5d-8ebc-7dfb25a803c2.webp", thumb: "images/work/character-design/c271fee4-1793-4f5d-8ebc-7dfb25a803c2-t.webp", w: 1390, h: 2000 },
    { title: "The Girl — Final Display", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/the-girl-final-display-poster.webp", thumb: "images/work/3d-art/the-girl-final-display-poster.webp", w: 675, h: 1200, video: "images/work/3d-art/the-girl-final-display.mp4" },
    { title: "Clockwork Figures", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/img-1321.webp", thumb: "images/work/concept-art/img-1321-t.webp", w: 1689, h: 1640 },
    { title: "Denial", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/denial-new.webp", thumb: "images/work/illustration/denial-new-t.webp", w: 1390, h: 2000 },
    { title: "Narrative Character 02", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/narrative-work-2.webp", thumb: "images/work/character-design/narrative-work-2-t.webp", w: 1414, h: 2000 },
    { title: "Ugly Rabbit — Final Display", category: "3D Art", type: "video", medium: "3D animation", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/ugly-rabbit-final-display-poster.webp", thumb: "images/work/3d-art/ugly-rabbit-final-display-poster.webp", w: 675, h: 1200, video: "images/work/3d-art/ugly-rabbit-final-display.mp4" },
    { title: "Scene 1 Concept", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/scene1-concept.webp", thumb: "images/work/concept-art/scene1-concept-t.webp", w: 1487, h: 858 },
    { title: "Depression", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/depression.webp", thumb: "images/work/illustration/depression-t.webp", w: 1390, h: 2000 },
    { title: "Snek", category: "Character Design", type: "image", medium: "Character design", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/character-design/snek.webp", thumb: "images/work/character-design/snek-t.webp", w: 2000, h: 2000 },
    { title: "Environment Render 01", category: "3D Art", type: "image", medium: "3D render", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/1-3.webp", thumb: "images/work/3d-art/1-3-t.webp", w: 1697, h: 869 },
    { title: "Scene 12 Concept", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/scene12-concept.webp", thumb: "images/work/concept-art/scene12-concept-t.webp", w: 1477, h: 851 },
    { title: "Illustration 16", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/illustration16.webp", thumb: "images/work/illustration/illustration16-t.webp", w: 949, h: 2000 },
    { title: "Environment Render 03", category: "3D Art", type: "image", medium: "3D render", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/7.webp", thumb: "images/work/3d-art/7-t.webp", w: 1260, h: 680 },
    { title: "Spatial Paintover 04", category: "Concept Art", type: "image", medium: "Digital painting", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/concept-art/spatial-paintover-4.webp", thumb: "images/work/concept-art/spatial-paintover-4-t.webp", w: 2000, h: 1027 },
    { title: "Illustration 18", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/illustration18.webp", thumb: "images/work/illustration/illustration18-t.webp", w: 953, h: 2000 },
    { title: "Hall Lighting Study", category: "3D Art", type: "image", medium: "3D render", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/crazyyyy.webp", thumb: "images/work/3d-art/crazyyyy-t.webp", w: 1423, h: 853 },
    { title: "Illustration 19", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/illustration19.webp", thumb: "images/work/illustration/illustration19-t.webp", w: 949, h: 2000 },
    { title: "King Chess Piece Model", category: "3D Art", type: "image", medium: "3D render", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/king-chess-piece-modeliing-wowww.webp", thumb: "images/work/3d-art/king-chess-piece-modeliing-wowww-t.webp", w: 1920, h: 1080 },
    { title: "Illustration 20", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/illustration20.webp", thumb: "images/work/illustration/illustration20-t.webp", w: 949, h: 2000 },
    { title: "Spatial Paintover 03", category: "3D Art", type: "image", medium: "3D render", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/3d-art/spatial-paintover-3.webp", thumb: "images/work/3d-art/spatial-paintover-3-t.webp", w: 1697, h: 869 },
    { title: "Illustration 01", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/img-0731.webp", thumb: "images/work/illustration/img-0731-t.webp", w: 2000, h: 1837 },
    { title: "Illustration 02", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/img-1225.webp", thumb: "images/work/illustration/img-1225-t.webp", w: 1390, h: 2000 },
    { title: "Illustration 03", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/img-1226.webp", thumb: "images/work/illustration/img-1226-t.webp", w: 1390, h: 2000 },
    { title: "Poster Illustration", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/poster-illustration-final.webp", thumb: "images/work/illustration/poster-illustration-final-t.webp", w: 1413, h: 2000 },
    { title: "CG Art Project 01", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/project-cg-art1.webp", thumb: "images/work/illustration/project-cg-art1-t.webp", w: 2000, h: 1414 },
    { title: "CG Art Project 02", category: "Illustration", type: "image", medium: "Digital illustration", year: "", size: "", description: "PLACEHOLDER — add a note about this piece.", image: "images/work/illustration/project-cg-art2.webp", thumb: "images/work/illustration/project-cg-art2-t.webp", w: 2000, h: 1414 },
  ],

  about: {
    eyebrow: "About",
    title: "Hello, I'm Amal.",                           // PLACEHOLDER
    // Each string is one paragraph
    paragraphs: [
      "PLACEHOLDER — Write a short paragraph about who she is, where she studied or trained, and her work in concept art, illustration, 3D and graphic design.",
      "PLACEHOLDER — A second paragraph about her process, inspirations, the tools she uses, or what drives the work.",
    ],
    portrait: "images/about/amal.webp",                   // her animated portrait (made from Portfolio/amal.gif) — "" = placeholder
    portraitCaption: "Amal Jawad",                              // PLACEHOLDER
    facts: [                                              // small stat row
      { value: "00", label: "Years creating" },          // PLACEHOLDER
      { value: "00", label: "Clients" },                 // PLACEHOLDER
      { value: "00", label: "Projects completed" },      // PLACEHOLDER
    ],
  },

  /* ----------------------------------------------------------------------
     DISPLAYS — client / commercial projects. Each row opens a 2D slideshow
     with notes. Created in collaboration with BigBang Studios Pvt Limited (she worked
     there at the time) — change collab.name if the spelling should differ.
     ---------------------------------------------------------------------- */
  displays: {
    eyebrow: "Commercial Displays",
    title: "Client work",
    intro: "Branding, illustration and social campaigns for restaurant and food brands. Click a project to flip through it with notes.", // PLACEHOLDER
    collab: {
      label: "In collaboration with",
      name: "BigBang Studios Pvt Limited",
      note: "Created while Amal was working at BigBang Studios.",
    },
    projects: [
      {
        title: "Pepe Nero",
        year: "2026",
        role: "PLACEHOLDER — her role (e.g. illustration, branding, social)",
        summary: "PLACEHOLDER — one or two sentences about this project and the brief.",
        slides: [
          { title: "Pepe Nero — 01", image: "images/displays/pepe-nero/img-1131.webp", thumb: "images/displays/pepe-nero/img-1131-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 02", image: "images/displays/pepe-nero/img-1228.webp", thumb: "images/displays/pepe-nero/img-1228-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 03", image: "images/displays/pepe-nero/img-1229.webp", thumb: "images/displays/pepe-nero/img-1229-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 04", image: "images/displays/pepe-nero/img-1230.webp", thumb: "images/displays/pepe-nero/img-1230-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 05", image: "images/displays/pepe-nero/img-1231.webp", thumb: "images/displays/pepe-nero/img-1231-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 06", image: "images/displays/pepe-nero/img-1232.webp", thumb: "images/displays/pepe-nero/img-1232-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 07", image: "images/displays/pepe-nero/img-1233.webp", thumb: "images/displays/pepe-nero/img-1233-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 08", image: "images/displays/pepe-nero/img-1235.webp", thumb: "images/displays/pepe-nero/img-1235-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Pepe Nero — 09", image: "images/displays/pepe-nero/img-1236.webp", thumb: "images/displays/pepe-nero/img-1236-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
        ],
      },
      {
        title: "Red Rooster",
        year: "2026",
        role: "PLACEHOLDER — her role (e.g. illustration, branding, social)",
        summary: "PLACEHOLDER — one or two sentences about this project and the brief.",
        slides: [
          { title: "Red Rooster — 01", image: "images/displays/red-rooster/de1c26.webp", thumb: "images/displays/red-rooster/de1c26-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Red Rooster — 02", image: "images/displays/red-rooster/box-designs-13.webp", thumb: "images/displays/red-rooster/box-designs-13-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Red Rooster — 03", image: "images/displays/red-rooster/posts-rr-1.webp", thumb: "images/displays/red-rooster/posts-rr-1-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Red Rooster — 04", image: "images/displays/red-rooster/posts-rr-2.webp", thumb: "images/displays/red-rooster/posts-rr-2-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Red Rooster — 05", image: "images/displays/red-rooster/posts-rr-3.webp", thumb: "images/displays/red-rooster/posts-rr-3-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Red Rooster — 06", image: "images/displays/red-rooster/posts-rr-4.webp", thumb: "images/displays/red-rooster/posts-rr-4-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Red Rooster — 07", image: "images/displays/red-rooster/posts-rr-5.webp", thumb: "images/displays/red-rooster/posts-rr-5-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
        ],
      },
      {
        title: "Neapo",
        year: "2026",
        role: "PLACEHOLDER — her role (e.g. illustration, branding, social)",
        summary: "PLACEHOLDER — one or two sentences about this project and the brief.",
        slides: [
          { title: "Neapo — 01", image: "images/displays/neapo/img-1119.webp", thumb: "images/displays/neapo/img-1119-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Neapo — 02", image: "images/displays/neapo/img-1323.webp", thumb: "images/displays/neapo/img-1323-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
          { title: "Neapo — 03", image: "images/displays/neapo/img-1324.webp", thumb: "images/displays/neapo/img-1324-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
        ],
      },
      {
        title: "Jooti Shooti",
        year: "2026",
        role: "PLACEHOLDER — her role (e.g. illustration, branding, social)",
        summary: "PLACEHOLDER — one or two sentences about this project and the brief.",
        slides: [
          { title: "Jooti Shooti — 01", image: "images/displays/jooti-shooti/1-1.webp", thumb: "images/displays/jooti-shooti/1-1-t.webp", note: "PLACEHOLDER — a note about this slide (what it is, the brief, your role)." },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------------
     THESIS — Amal's final-year undergraduate thesis project (2026): Hareafter.
     Same idea as Displays: each part is a row that opens a slideshow with notes.
     Slides with a `video:` play the video. `cover` is the picture shown beside the
     heading (leave "" to hide it).
     ---------------------------------------------------------------------- */
  thesis: {
    eyebrow: "Final Year Thesis · 2026",
    title: "Hareafter",
    intro: "PLACEHOLDER — a short description of the Hareafter project: the story, the world, and what you set out to make.",
    credit: {
      label: "Undergraduate thesis project",
      name: "2026",
      note: "PLACEHOLDER — university, programme or supervisor.",
    },
    cover: "images/work/illustration/untitled-artwork-18.webp",
    projects: [
      {
        tag: "01",
        title: "Worldbuilding Concept Art",
        role: "PLACEHOLDER — what this part of the thesis covers",
        summary: "PLACEHOLDER — one or two sentences about this part of the Hareafter thesis.",
        slides: [
          { title: "Denial", image: "images/thesis/worldbuilding-concept-art/denial-new.webp", thumb: "images/thesis/worldbuilding-concept-art/denial-new-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Anger", image: "images/thesis/worldbuilding-concept-art/anger.webp", thumb: "images/thesis/worldbuilding-concept-art/anger-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Bargaining", image: "images/work/illustration/bargaining.webp", thumb: "images/work/illustration/bargaining-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Depression", image: "images/thesis/worldbuilding-concept-art/depression.webp", thumb: "images/thesis/worldbuilding-concept-art/depression-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Acceptance", image: "images/work/illustration/acceptance.webp", thumb: "images/work/illustration/acceptance-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Acceptance (v2)", image: "images/thesis/worldbuilding-concept-art/acceptance-v2.webp", thumb: "images/thesis/worldbuilding-concept-art/acceptance-v2-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
        ],
      },
      {
        tag: "02",
        title: "Character Design",
        role: "PLACEHOLDER — what this part of the thesis covers",
        summary: "PLACEHOLDER — one or two sentences about this part of the Hareafter thesis.",
        slides: [
          { title: "Character Design 01", image: "images/work/character-design/356c2546-d3cc-4a87-9a0f-129eb52e7164.webp", thumb: "images/work/character-design/356c2546-d3cc-4a87-9a0f-129eb52e7164-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Character Design 02", image: "images/work/character-design/7e6bbf0b-1d87-4d88-8f66-41ea20fa1f3b.webp", thumb: "images/work/character-design/7e6bbf0b-1d87-4d88-8f66-41ea20fa1f3b-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Character Design 03", image: "images/work/character-design/9c4d0265-02cc-4774-96ce-9da12c52b666.webp", thumb: "images/work/character-design/9c4d0265-02cc-4774-96ce-9da12c52b666-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Character Design 04", image: "images/work/character-design/a8427fcc-a1e6-4557-a122-7c324d70c659.webp", thumb: "images/work/character-design/a8427fcc-a1e6-4557-a122-7c324d70c659-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Character Design 05", image: "images/work/character-design/b190cdb5-db78-4338-b4b8-24c26e5e504c.webp", thumb: "images/work/character-design/b190cdb5-db78-4338-b4b8-24c26e5e504c-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Character Design 06", image: "images/work/character-design/c271fee4-1793-4f5d-8ebc-7dfb25a803c2.webp", thumb: "images/work/character-design/c271fee4-1793-4f5d-8ebc-7dfb25a803c2-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Snek", image: "images/work/character-design/snek.webp", thumb: "images/work/character-design/snek-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
        ],
      },
      {
        tag: "03",
        title: "3D Works",
        role: "PLACEHOLDER — what this part of the thesis covers",
        summary: "PLACEHOLDER — one or two sentences about this part of the Hareafter thesis.",
        slides: [
          { title: "Denial — Final Display", video: "images/work/3d-art/denial-final-display.mp4", image: "images/work/3d-art/denial-final-display-poster.webp", thumb: "images/work/3d-art/denial-final-display-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Anger — Final Display", video: "images/work/3d-art/anger-final-display.mp4", image: "images/work/3d-art/anger-final-display-poster.webp", thumb: "images/work/3d-art/anger-final-display-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Depression — Final Display", video: "images/thesis/3d-works/depression-final-display.mp4", image: "images/thesis/3d-works/depression-final-display-poster.webp", thumb: "images/thesis/3d-works/depression-final-display-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Ophion — Final Display", video: "images/work/3d-art/ophion-final-display.mp4", image: "images/work/3d-art/ophion-final-display-poster.webp", thumb: "images/work/3d-art/ophion-final-display-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "The Girl — Final Display", video: "images/work/3d-art/the-girl-final-display.mp4", image: "images/work/3d-art/the-girl-final-display-poster.webp", thumb: "images/work/3d-art/the-girl-final-display-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Ugly Rabbit — Final Display", video: "images/work/3d-art/ugly-rabbit-final-display.mp4", image: "images/work/3d-art/ugly-rabbit-final-display-poster.webp", thumb: "images/work/3d-art/ugly-rabbit-final-display-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Unreal Engine Test", video: "images/work/3d-art/testing2-unreal-editor-2026-06-09-14-19-26.mp4", image: "images/work/3d-art/testing2-unreal-editor-2026-06-09-14-19-26-poster.webp", thumb: "images/work/3d-art/testing2-unreal-editor-2026-06-09-14-19-26-poster.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
        ],
      },
      {
        tag: "04",
        title: "UI & HUD Design",
        role: "PLACEHOLDER — what this part of the thesis covers",
        summary: "PLACEHOLDER — one or two sentences about this part of the Hareafter thesis.",
        slides: [
          { title: "Abilities", image: "images/thesis/ui-hud/abilities.webp", thumb: "images/thesis/ui-hud/abilities-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Health Bar", image: "images/thesis/ui-hud/health-bar.webp", thumb: "images/thesis/ui-hud/health-bar-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
          { title: "Dialogue Box", image: "images/thesis/ui-hud/dialogue-box.webp", thumb: "images/thesis/ui-hud/dialogue-box-t.webp", note: "PLACEHOLDER — a note about this piece (what it is, how it fits the story)." },
        ],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's make something together.",               // PLACEHOLDER
    text: "Commissions, collaborations, freelance work or just saying hi — I'd love to hear from you.", // PLACEHOLDER
    email: "malooinks@gmail.com",                             // PLACEHOLDER
    socials: [                                              // PLACEHOLDER links
      { label: "Instagram", href: "https://www.instagram.com/malooinks" },
      { label: "Behance",   href: "https://behance.net/" },
      { label: "ArtStation", href: "https://artstation.com/" },
    ],
  },

  footer: "© " + new Date().getFullYear() + " Amal Jawad · Malooinks. All rights reserved.",
};

/* ==========================================================================
   LOOK & FEEL for the 3D hero (colours are normal CSS hex colours)
   ========================================================================== */
const THEME_3D = {
  frameColor: "#1d1a17",   // picture frames in the hero carousel
  matColor: "#f7f2e8",     // paper border inside the frame
  frameHeight: 3.0,        // bigger = frames fill more of the screen
  gap: 0.9,                // space between frames around the ring
  spin: 0.12,              // auto-rotation speed (0 = stop; negative = other way)
};
