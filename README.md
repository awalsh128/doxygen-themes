# doxygen-themes

[![License: Apache2](https://shields.io/badge/license-apache2-blue.svg)](https://github.com/awalsh128/fluentcpp/blob/master/LICENSE)

Some sample Doxygen themes using Bootstrap 5 with different approaches to CSS use. Not all of the HTML is Bootstrap though, just the header and footer with Bootstrap like coloring applied to the body elements.

---

[Click here for the demo landing page.](https://www.awalsh128.com/doxygen-themes/).

---

## Documentation

This project is a demonstration of possible approaches to theming Doxygen generated websites. Frameworks other than Bootstrap can be used, this is just an example of what is possible.

* Applied directly.
* Root variables applied.
* Simple color palette propagated.

## Pre-requisites

* CMake - Build the project and create the website.
* Doxygen - Create the website documentation.

## Components

All components use CDN links to keep project file overhead low.

* Bootstrap - Styles the header and footer. Also provides the primary colors for the Doxygen classes.
* Font Awesome - Header icons.
* jQuery - Required by Bootstrap and used for the custom palette picker.

## Layout

```txt
.
├── CMakeLists.txt - CMake build file to copy all the files and run Doxygen.
├── example_src - Boilerplate source code to generate documentation from.
├── shared
│   ├── Doxyfile.in - Doxygen input file used for all themes.
│   ├── logo.png - Header logo.
│   ├── logo_name_orig.png - Header logo name.
│   ├── logo_name_orig.xcf - Header logo name Gimp file.
│   └── style.css - Shared stylesheet used by everything.
└── themes
    ├── custom_palette
    │   ├── doxygen.css - Stylesheet for page.
    │   ├── footer.html - Bootstrap theme footer 
    │   ├── header.html - Bootstrap theme header.
    │   ├── palette.js - Loads palettes dynamically based on URL query.
    │   ├── palette_google.css - Google theme colors.
    │   ├── palette_neonpink.css - Neon pink theme colors.
    │   └── palette_twitter.css - Twitter theme colors.
    ├── index.html - Landing page for the themes.
    ├── primary_dark - Bootstrap primary colors dark theme page.
    ├── primary_light - Bootstrap primary colors light theme page.
    └── style.css - Landing page stylesheet for themes.
```

## Sample CSS

Below is the CSS used for the Neon Pink theme.

```css
:root {
  --color-body: #bda9a9;
  --color-hyperlink: #ffffff;
  --color-title-background: #8a1253;
  --color-title-text: #ffffff;
  --color-footer-header-background: #c51350;
  --color-footer-header-text: #ffffff;
  --color-section-header-background: #e8751a;
  --color-section-header-text: #ffffff;
  --color-section-subheader-background: #fda403;
  --color-section-subheader-text: #ffffff;
  --color-section-text: #ffffff;
  --color-section-background: #bd9a9a;
}
```

Notice how there is a lot of ``#ffffff`` in there. This could probably be further simplified.

### Future Ideas

There are a lot of CSS features [that can be found](https://developer.mozilla.org/en-US/docs/Web/CSS). Some ways to simplify the palette even more.

* [Filter Functions](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function) - Allows for different affects and interesting functions like [brightness](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness()).
* [HSL Scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()) - Makes darkening and lightening easier.
* [Arithmetic](https://developer.mozilla.org/en-US/docs/Web/CSS/calc()) - Useful for modifying color values.
