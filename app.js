var path = require('path');
var express = require('express');
var api = require('marvel-api');
var _ = require('underscore');
var data = require('./charactersJSON.json');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000,function()
{
  console.log('Application is running on port 3000 ctrl+c to exit');

})

var marvel = api.createClient({
  publicKey: 'Sign up for this key at https://developer.marvel.com/',
  privateKey: 'Sign up for this key at https://developer.marvel.com/'

});

var tmp = _.sortBy(data,function(x){return x.name});
var sorted = _.each(tmp,function(x){

  x.realName = x.name;
  var matches= x.name.match(/(\w+)/g);
  x.name = matches.join('');
  return x;

})
var selected = []

for (var i = 0; i < sorted.length; i++) {
  if(sorted[i].description !=""){
    selected.push(sorted[i]);
  }
}
//var sorted = _.where(sorted)

app.get('/',function(req,res){
  res.render('home',{data:selected});
});

app.get('/hero/:id?', function(req,res){
  //scrape http://marvel.com/characters for image and bio

  var fid = parseInt(req.params.id);
  var data = _.where(sorted, {id: fid});
  // console.log(data[0].urls[0].url);

  res.render('character',{character:data});

});
