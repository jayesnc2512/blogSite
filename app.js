//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash=require("lodash");
const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(process.env.URI);
// const itemsSchema=new mongoose.Schema({
//   date:Date,
  // title:String,
  // body: String
// })

const item = mongoose.model('post', 
{ 
  date:Date,
  title:String,
  body: String,
});

const start = mongoose.model('default', 
{ 
  title:String,
  body: String
});



// item.insertMany([
//   { title: 'homeStartingContent',
//     body:'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.'
//   },
//   { title: 'aboutContent',
//     body:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
//   },
//   { title: 'contactContent', 
//     body:"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
//   }]).then(function(){
//     console.log("inserted");
//   });


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[];

app.get('/',function(req,res){
  start.findOne({title:'homeStartingContent'}).then(function(Element){
    item.find().then(function(post){
      res.render('home',{homeStart:Element.body,
                          posts:post});
    })
  })
});

app.get("/about",function(req,res){
  start.findOne({title:'aboutContent'}).then(function(Element){
    res.render('about',{about:Element.body});
  })
});

app.get("/contact",function(req,res){
  start.findOne({title:'contactContent'}).then(function(Element){
    res.render('contact',{contact:Element.body});
  })
});

app.get("/compose",function(req,res){
  res.render('compose');
});

app.post("/compose",function(req,res){
   const post=new item({title:req.body.postTitle,
            date:req.body.postDate,
            body:req.body.postBody});
    post.save();
  // console.log(post['title']);
    // posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  const id=req.params.postId;
  item.findOne({_id:id}).then(function(post){
    res.render('post',{arr:post});
  });

});
 







app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
