const express =require('express');
const repoContext = require('./repository/repository-wrapper');
const {validateSongs}=require('./middleware/songs-validation');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, function(){
    console.log("Server started. Listening on port 5000.");
});

app.get('/api/songs',(req,res)=>{
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
});

app.get('/api/songs/:id', (req,res)=>{
    const id = req.params.id;
    const songs = repoContext.songs.findSongById(id);
    return res.send(songs);
})

app.post('/api/songs', [validateSongs],(req,res)=>{
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.send(addedSong);
});

app.put('/api/songs/:id', [validateSongs],(req,res)=>{
    const id=req.params.id;
    const SongPropertiesToUpdate =req.body;
    const updatedSong =repoContext.songs.updateSong(id,SongPropertiesToUpdate);
    return res.send(updatedSong);
});

app.delete('/api/songs/:id', (req,res)=>{
    const id=req.params.id;
    const updatedDataSet= repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});
