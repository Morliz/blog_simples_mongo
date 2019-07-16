
const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost:27017/node-js-blog');

//--> Crud Operations:
//----------------------------------------------------------
// 1- Create
// Post.create({
//     title: "My first title blog",
//     description: "Your description is here...",
//     author: "Johnny Bravo",
//     content: "Content define here"
// }, (error, post) => {
    
//     console.log(error, post);

// })

//----------------------------------------------------------
// 2- Read
Post.find({}, (error, posts) => {

    console.log(error, posts)
})

//----------------------------------------------------------
// 3- Read and Update
Post.findByIdAndUpdate("5d03deead029d13f84786c76", {

    title: "My first title blog"

}, (error, post) => {

    console.log(error, post)
})


//----------------------------------------------------------
// 4- Delete
// Post.findByIdAndDelete("5d03deead029d13f84786c76", (error) => {

//     console.log(error)

// })