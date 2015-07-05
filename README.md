# Blogger Playground

This repository should help building nicer to maintain templates for Blogger.

## Usage

In `src/template.html` you define your general template. The code that is already defined in there is using [Handlebars](TODO) to import the styles and scripts. 

You may use Handlebars to simplify the needed code. It will automatically import the partials defined under `src/templates/partials/*.hbs`.

You can also use SCSS to create and use your scss files. In `src/scss/all.scss`, you can define styles that will be available to all pages, `src/scss/home.scss` will only be imported on your home page.

The JavaScript can be browserified and its entry point is `src/js/main.js`.
