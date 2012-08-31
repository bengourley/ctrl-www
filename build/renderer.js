module.exports = render

var jade = require('jade')
  , stylus = require('stylus')
  , nib = require('nib')
  , fs = require('fs')
  , colors = require('colors')
  , connect = require('connect')
  , fs = require('fs')
  , async = require('async')
  , mkdirp = require('mkdirp')
  , ncp = require('ncp').ncp
  , dir = process.env.PWD
  , config = require(dir + '/config')

// var timings = []
//   , start = new Date()
// function bench(note) {
//   timings.push(note + ' ' + (new Date() - start))
// }

/**
 * Render the static assets
 */
function render(cb) {

  /**
   * Loop over stylesheets and render them
   * to the preview and to the ouput dirs
   */
  function stylesheets(cb) {

    async.forEach(config.stylesheets, function (ss, callback) {
      // bench('pre stylus')
      fs.readFile(dir + '/public/stylesheets/' + ss + '.styl', 'utf8', function (err, data) {
        if (err) return callback(err)
        stylus(data)
          .set('filename', dir + '/public/stylesheets/' + ss + '.styl')
          .use(nib())
          .render(function(err, css) {
            if (err) return callback(err)
              fs.writeFile(dir + '/public/stylesheets/' + ss + '.css', css, function (err) {
                if (!err) {
                  console.log(('  Rendered ' + ss + '.styl → ' + ss + '.css').blue)
                }
                // bench('post stylus')
                callback(err)
              }
            )
          })

      })
    }, cb)

  }



  /**
   * Loop over pages and render them
   * to the preview dir
   */
  function pages(cb) {

    async.forEach(config.pages, function (p, callback) {
      // bench('pre page')
      var readLoc = dir + '/source/templates/pages/' + p.template + '.jade'
        , writeLoc = dir + '/' + p.template + '.html'

      fs.readFile(readLoc, 'utf8', function (err, data) {
        if (err) return callback(err)
        var template = jade.compile(data,
          { filename: readLoc
          , pretty: true
          })

        fs.writeFile(writeLoc, template(p.data), function (err) {
          if (!err) {
            console.log(('  Rendered ' + p.template + '.jade → ' + p.template + '.html').blue)
          }
          // bench('post page')
          callback(err)
        })

      })

    }, cb)

  }

  console.log()

  async.parallel
    ([ stylesheets
     , pages
     ]
    , function (err) {
      if (err) throw err
      console.log('\n  Render complete'.green)
      console.log()
      // bench('done')
      // console.log(timings.join('\n'))
      cb()
    })

}

// Render if this
// file is run directly
if (!module.parent) {
  render()
}