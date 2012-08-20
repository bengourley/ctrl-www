var stylus = require('stylus')
  , nib = require('nib')
  , fs = require('fs')
  , jade = require('jade')

stylus(fs.readFileSync(__dirname + '/public/stylesheets/style.styl', 'utf8'))
  .set('filename', __dirname + '/public/stylesheets/style.styl')
  .use(nib())
  .render(function(err, css){
    if (err) throw err
    fs.writeFileSync(__dirname + '/public/stylesheets/style.css', css)
  })

var template = jade.compile(
  fs.readFileSync(__dirname + '/source/templates/pages/index.jade', 'utf8')
  , { filename: __dirname + '/source/templates/pages/index.jade'
    , pretty: true
    }
)

fs.writeFileSync(__dirname + '/index.html', template())