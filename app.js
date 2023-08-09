const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

const homeStartingContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam mollitia ea vel error consequuntur eos minus eum, quae nemo quidem cumque quasi sapiente nesciunt deleniti odio commodi enim quos soluta accusantium dicta? Sapiente eum expedita, officiis perferendis aliquam praesentium fugit vitae laudantium, id error blanditiis mollitia vel eligendi! Natus, beatae?'
const aboutContent = 'Hello my name is Akash Yadav, I am from Pune Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, voluptatibus? Architecto minima, consequuntur ipsum veniam magnam quis. Et, magnam nisi.'
const contactContent = '+9086XXXXXX   +8723XXXXXX    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita modi placeat laborum explicabo dolores minima inventore voluptate sit voluptatum fuga.'


let posts = []        // arrays that stores all the tasks


const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('/public'))


app.get('/', (req, res) => {

    res.render('home', {
        homeContent: homeStartingContent,
        posts: posts
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        aboutMe: aboutContent
    })
})

app.get('/contacts', (req, res) => {
    res.render('contacts', {
        contactContent: contactContent
    })
})


app.get('/compose', (req, res) => {

    res.render('compose', {})
})
app.post('/compose', (req, res) => {

    var data = {
        postTitle: req.body.postTitle,
        postText: req.body.postText
    }
    posts.push(data)
    // console.log(posts)
    res.redirect('/')
})

app.get('/posts/:postName', (req, res) => {
    let requestedTitle = _.lowerCase(req.params.postName)
    posts.forEach((post) => {
        let storedTitle = _.lowerCase(post.postTitle)

        if (storedTitle === requestedTitle) {
            // console.log(post.postTitle)
            res.render('post',{
                title:post.postTitle,
                content:post.postText
            })
        }
    })
})


app.listen(3000, (res) => {
    console.log('Server is running on port 3000')
})