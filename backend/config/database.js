const mongoose=require('mongoose');
const URI='mongodb://127.0.0.1:27017/granja';

mongoose.connect(URI)
.then(db=> {
    console.log('BD connect');
    /*const connection = mongoose.connection;
    const collectionsCursor = connection.db.listCollections();

    collectionsCursor.forEach(collection => {
      console.log(collection.name);
    });*/
})
.catch(err => console.error(err));
module.exports=mongoose;
