# ctrl-www

This repo is the source and build for the ctrl website and documentation.
The static pages are written in Jade and styled with Stylus, and rendered to
plain HTML and CSS so they can be hosted on Github pages.

## Development
To run the build script every time a file is changed (so you can see your
changes while in development), first install nodemon:

```
npm install -g nodemon
```

Then in the project route do:

```
nodemon --delay 0
```

*Note the delay parameter – nodemon uses a 1 second delay by default. This is
sometimes useful, but slightly annoying for us. Setting it to zero means that
the script is run as soon as a change is detected.*

Running this script also starts a connect server (routes are defined in
`config.json`) so that you can preview your changes locally.