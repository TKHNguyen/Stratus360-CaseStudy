
var express = require('express');
var app = express();
const axios = require('axios');

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {
  let id = 1;
  let last_record = await axios.get('http://xkcd.com/info.0.json');
  let last_num = parseInt(last_record.data['num']);
  if(id < 1){
    id = 1;
  }
  else if(id > last_num){
    id = last_num;
  }
  let ran = parseInt(getRandom(1, last_num));
  var links = 
    { nextl: '/'+(id+1), 
      randoml: "/"+ran, 
      previousl: "/"+(id-1),
      lastl: "/"+last_num,
  };
  let url = 'http://xkcd.com/'+id+'/info.0.json';
  let data = await axios.get(url);
  //console.log(data.data);

  res.render('pages/index', {
    data: data.data,
    links : links
  });
});


function getRandom(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}
app.get('/:id', async (req, res) => {
  // let data = await getData();
  let id = parseInt(req.params.id);
  let last_record = await axios.get('http://xkcd.com/info.0.json');
  let last_num = parseInt(last_record.data['num']);
  if(id < 1){
    id = 1;
  }
  else if(id > last_num){
    id = last_num;
  }
  let ran = parseInt(getRandom(1, last_num));
  var links = 
    { nextl: '/'+(id+1), 
      randoml: "/"+ran, 
      previousl: "/"+(id-1),
      lastl: "/"+last_num,
  };
  let url = 'http://xkcd.com/'+id+'/info.0.json';
  let data = await axios.get(url);
  //console.log(data.data);

  res.render('pages/index', {
    data: data.data,
    links : links
  });
  //res.send(data.data)
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// app.listen(3000);
// console.log('Server is listening on port 3000');