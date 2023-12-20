const express = require('express')
const app =express();
const port = 8000;
const mongoose = require('mongoose'); // Import Mongoose

// set ejs as view engine
app.set('view engine','ejs');

// set views directory to the 'views folder
app.set('views',__dirname + '/views');
app.use(express.urlencoded({ extended: true }));
// serve static file from public
app.use(express.static(__dirname +'/public'));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/issuetracker",{useNewUrlParser: true,
useUnifiedTopology: true}).then(()=>{
    console.log("databse connection succesfull")
}

).catch(()=>{
    console.log("error while connection to datbse")
});
// Login Schema
const loginSchema = new mongoose.Schema({
  
})



// Project Creat Schema
const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    projectAuthor : String,
    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  });
// Creat issue Schema
const issuesSchema = new mongoose.Schema({
    issueTitle: String,
    issueDescription: String,
    issueLabel : String,
    issueAuthor : String,
  });
  // Create a Mongoose model for issues
const Issue = mongoose.model('issues', issuesSchema);
app.post('/issue', async (req, res) => {
  try{
  const issueTitle = req.body.title;  //only for understanding
  const issueDescription = req.body.description;
  const issueLabel = req.body.labels;
  const issueAuthor = req.body.author;
  console.log(issueTitle);
  console.log(issueDescription);
  console.log(issueLabel);
  console.log(issueAuthor);

  const issues2 = new Issue({
    issueTitle: req.body.title,  // we can add direct variable name here i.e.taskName
    issueDescription: req.body.description,
    issueLabel: req.body.labels,
    issueAuthor : req.body.author,
    });
    
   
      await issues2.save();
      console.log('issues saves to the database.');
      
      res.redirect("/details")
    } catch(err){
      console.error('Error saving issues:',err)
      res.redirect('home');
    }
    
});

  // Create a Mongoose model for project
const Project = mongoose.model('project', projectSchema);

app.get('/home', async (req, res) => {
    const data = await Project.find({})
    
    // console.log(data)
    res.render('home',{data});
    
  });
app.get('/details', async (req, res) => {
    const data = await Project.find({});
    // const bug = await Issue.find({});
    
    res.render('details', { data});
    // res.render('details',{bug}) 

})


app.post('/creat', async (req, res) => {
    try{
    const projName = req.body.proName;  //only for understanding
    const projDescription = req.body.proDesc;
    const projAuthor = req.body.proAuth
    console.log(projName)
    console.log(projDescription)
    console.log(projAuthor)
    // const taskDate = req.body.Date
  
    const issues = new Project({
    projectName: req.body.proName,  // we can add direct variable name here i.e.taskName
    projectDescription: req.body.proDesc,
    projectAuthor : req.body.proAuth,
    });
    
   
      await issues.save();
      console.log('project saves to the database.');
      
      res.redirect("/creat")
    } catch(err){
      console.error('Error saving issues:',err)
      res.redirect('home');
    }
    
});
app.get('/delete/:index', async (req, res) => {
    const index = req.params.index;
    await Issue.deleteOne({_id:index})
    const page = req.query.source
  if (page ==='home'){

  
    res.redirect('/home');}
    else{
      res.redirect('/details')
    }
  });


// /define route
app.get('',(req, res) => {
    res.render('login')
})
app.get('/home', (req, res) => {
    
      res.render('home');
});
app.post('/login', (req, res) => {
    const username = req.body.email
    const password = req.body.password
    // Redirect to the home page upon pressing the login button
    res.redirect('/home');
});
app.get('/creat', (req, res) => {
    res.render('creat');
});
app.post('/home',(req,res) => {
    const create = req.body.crbtn
    res.redirect('creat');
});
app.get('/details/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  // projectId = data[i]._id

});  
app.post('/creat',(req,res) =>{
    const create2 = req.body.crbtn2
    res.redirect('home');
});
app.post('/details',(req,res) =>{
  const create3 = req.body.crbtn3
  res.redirect('/issue');
});
app.get('/issue', (req, res) => {
    res.render('issue');
  });
app.post('/details', (req, res) => {
  const creat4 = req.body.crbt4
    res.render('/issue');
  });


// start the server
app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}` );
})