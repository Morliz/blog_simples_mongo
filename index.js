// import libraries
const express = require('express');
const path = require('path');
const edge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// using models
const Post = require('./database/models/Post');

const app = new express();

mongoose.connect('mongodb://localhost:27017/node-js-blog');

app.use(fileUpload());
app.use(express.static('public'));
app.use(edge);

app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const validateCreatePostMiddleware = (req, res, next) => {
    
    if ( !req.files.image || !req.body.author || !req.body.title || !req.body.content )
    {
        return res.redirect('/noticias/nova')
    }

    next()
}

app.use('/noticias/salvas', validateCreatePostMiddleware);

app.get('/', (requisicao, resposta) => {

    //resposta.sendFile(path.resolve(__dirname, 'pages/index.html'))
    resposta.render('index') //  loading /views/index.edge
})

app.get('/inicio', (requisicao, resposta) => {

    //resposta.sendFile(path.resolve(__dirname, 'pages/index.html'))
    resposta.render('inicio') //  loading /views/index.edge
})

// app.get('/noticias', (requisicao, resposta) => {

//     //resposta.sendFile(path.resolve(__dirname, 'pages/noticias.html'))
//     resposta.render('noticias') //  loading /views/noticias.edge
// })

app.get('/colaboradores', (requisicao, resposta) => {

    //resposta.sendFile(path.resolve(__dirname, 'pages/colaboradores.html'))
})

app.get('/contato', (requisicao, resposta) => {

    //resposta.sendFile(path.resolve(__dirname, 'pages/contato.html'))
    resposta.render('contato') //  loading /views/contato.edge
})

app.get('/noticias/nova', (requisicao, resposta) => {

    resposta.render('nova_noticia') //  loading /views/nova_noticia.edge
})

app.post('/noticias/salvas', (requisicao, resposta) => {

    //console.log(requisicao.files)
    const { image } = requisicao.files;
    // salva as fotos via upload no diretorio: public/noticias
    image.mv(path.resolve(__dirname, 'public/noticias', image.name), (erro) => {
        Post.create({

            ...requisicao.body,
            image: `/noticias/${image.name}`
            
        }, (erro, post) => {
            //console.log(requisicao.body) // show values send to form in body        
            resposta.redirect('/')    
        })
    })
    
})

app.get('/noticias', async (req, resp) => {

    const posts = await Post.find({})  

    //showing all posts saved in database
    console.log(posts)

    //  loading list posts in the /views/index.edge
    resp.render('noticias', {
        posts 
    })
})

app.get('/noticia/:id', async (req, resp) => {

    const post = await Post.findById(req.params.id) 
    //  loading list posts in the /views/index.edge
    resp.render('noticia', {
        post
    })
})

app.listen(3300, () => {
    console.log('NodeJS rodando na porta 3300')
});