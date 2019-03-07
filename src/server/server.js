var express = require('express'),
    mongoose = require('mongoose'),
    connections = mongoose.connection,
    bodyParser = require("body-parser"),
    app = express(),
    apiRouterBook = require('./book.js');
    apiRouterPlanet = require('./componnts/planet.js');
    mongoose.connect('mongodb://localhost:27017/gallery', {
            useNewUrlParser: true
        }) .then(() =>  console.log('connection successful'))
        .catch((err) => console.error(err)),

app.use(bodyParser.json({
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    /* Set the Http request header */
    res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use('/api/gallery', apiRouterBook);
app.use('/api/planet', apiRouterPlanet);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

// app.get('/api/gallery', function (req, res) {
//     var result=[];
//     connections.db.collection("gallery", function(err, collection){
//                 collection.find({}).toArray(function(err, data){
//                     data.forEach(el=>{
//                         result.push(el);
//                     })
//                     res.json({
//                         records: result
//                     });
//                 })});})


// app.listen(4000, () => console.log(`Express server running on port 4000`));
module.exports = app;
