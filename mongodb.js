const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient

const connectionURL='mongodb://127.0.0.1:27017'
const dbname='task-manager'

mongoClient.connect(connectionURL,{'useNewUrlParser':true},(error,client)=>{
    if(error)
        return console.log("something went wrong\n"+error)
    
    console.log('connection successfull!')
    const db=client.db(dbname)                                      // database task-manager created

    db.collection('users').insertOne({                              // collection users created
        name:'aleron',
        age:21
    },(error,result)=>{
        if(error)
         return console.log('something went wrong')

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([                            // collection tasks created
        {
            description:'create connection',
            status:true
        },
        {
            description:'create database',
            status:true
        },
        {
            description:'insert 3 documents',
            status:false
        }
    ],(error,result)=>{
        if(error)
            return console.log('collection task failed')
        console.log(result.ops+'\ndocument inserted')

    })

    // db.collection('users').insertMany([
    //     {
    //         name:'aayush',
    //         age:22
    //     },
    //     {
    //         name:'yoyo',
    //         age:34
    //     }
    // ],(error,result)=>{
    //     if (error)
    //         return console.log('no doc inserted')
    //     console.log(result.ops)

    // })
    
})