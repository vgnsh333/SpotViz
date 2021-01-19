var express = require('express')
const fallback = require('express-history-api-fallback')
const bodyParser = require('body-parser');
const cors = require('cors');
var axios = require('axios')
var cookieParser = require('cookie-parser');
var path = require('path')
var serveStatic = require('serve-static')

const pub = path.resolve(__dirname, '../public')
app = express();
const root = path.resolve(__dirname, '../dist')
app.use(express.static(root))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config()
var mode = process.env.NODE_ENV ;

var port = mode == "development" ? 3000 : process.env.PORT;
var scopes = "user-read-private user-read-email";
// var spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENTID,
//     clientSecret: process.env.CLIENTSECRET,
//     redirectUri: process.env.REDIRECTURI
// });

var access_token = '';
var refresh_token = '';
app.get('/', (req, res) => {
    res.send('Hello World!')
    //console.log(pub);
}
)
app.get('/login', (req, res) => {
    var login_link = "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        process.env.CLIENTID +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(process.env.REDIRECTURI);
    data = {
        url: login_link
    }
    res.send(data)
})
app.post('/token*', (req, res) => {
    //console.log(req.query.code)
    var linkk = "https://accounts.spotify.com/api/token?grant_type=authorization_code&code=" +
        req.query.code +
        "&redirect_uri="+encodeURIComponent(process.env.REDIRECTURI) +
        "&client_secret="+ process.env.CLIENTSECRET +
        "&client_id="+ process.env.CLIENTID;
    //console.log(linkk);
    axios.post(linkk).then(async (data) => {
        try {
            await res.send(data.data);
      //      console.log(data.data.access_token)
            access_token = data.data.access_token;
        }
        catch (err) {
            console.log(err);
        }
    }).catch((err) => {
        console.log(err);
        var e = err;
    })
})
// app.get('/me', async (req, res) => {
//     console.log('access', access_token)
//     spotifyApi.setAccessToken(access_token);
//     try {
//         await spotifyApi.getMe()
//             .then(function (data) {
//                 console.log('Some information about the authenticated user', data.body);
//             }, function (err) {
//                 console.log('Something went wrong!', err);
//             });
//     }
//     catch (err) {

//     }
// })

app.use(fallback('index.html', { root }))
app.listen(port, () => console.log('Backend up and running on port: '+port))

/*

//post req(url,data,header)
//get req(url,header) data idk
axios.get('https://api.spotify.com/v1/me',
    {headers:{
        'Authorization': 'Bearer '+access_token
    }})
    .then(data=>{
        console.log('data from /me:',data)
        res.send(data.data)
    })
    .catch(error=>{
      console.log(error)
      res.send(error)
    })
*/
