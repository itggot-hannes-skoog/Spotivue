/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
require('dotenv').config();
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
const history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var port = process.env.PORT
var hostname = 'localhost';

var client_id = process.env.CLIENT_ID // Your client id
var client_secret = process.env.CLIENT_SECRET // Your secret
var redirect_uri = 'http://localhost:8888/scallback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();
const staticFileMiddleware = express.static(__dirname + '/dist');

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true,
  rewrites: [
    { from: /\/login/, to: '/login'},
    { from: /\/scallback/, to: '/scallback'}
  ]
}))
  .use(cors())
  .use(cookieParser())
app.use(staticFileMiddleware)

app.get('/login', function (req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'playlist-modify-private playlist-modify-public user-modify-playback-state user-read-birthdate streaming user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/scallback', function (req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token,
          expires_in = body.expires_in;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:8888/scallback?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            expires_in: expires_in
          }));
      } else {
        res.redirect('http://localhost:8888/scallback?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});