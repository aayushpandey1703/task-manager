const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient

const connectionURL='mongodb://127.0.0.1:27017'
const dbname='task-manager'

console.log('attempting connection..')
mongoClient.connect(connectionURL,{'useNewUrlParser':true},(error,client)=>{
    if(error)
        return console.log('something went wrong')
    
    console.log('connection successfull!')
    const db=client.db(dbname)

    db.collection('users').insertOne({
        name:'aleron',
        age:21
    })
    
})