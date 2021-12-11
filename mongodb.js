/* 
no need to create database explicitly at mongodb using robo 3t
node will automatically create it
*/
const {MongoClient,ObjectID}=require('mongodb')

// const mongoClient=mongodb.MongoClient
// const objectID=mongodb.objectID

const connectionURL='mongodb://127.0.0.1:27017'
const dbname='task-manager'

// const id=new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{'useNewUrlParser':true},(error,client)=>{                           // connecting node to mongo server
    if(error)
        return console.log("something went wrong\n"+error)
    
    const db=client.db(dbname)                                                                       // database task-manager created 
 
    // insert op

    db.collection('users').insertOne({                                                               // collection users created
        name:'aleron',
        age:21
    },(error,result)=>{
        if(error)
         return console.log('something went wrong')

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([                                                          // collection tasks created
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
    

    // // delete op

    // db.collection('users').deleteOne(
    //     {
    //         age:{
    //             $gt:25
    //         }
    //     }
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').deleteMany(
    //     {
    //         status:false
    //     }
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // // update op

    // db.collection('users').updateOne(
    //     {_id: new ObjectID('61b33db9e3ff3392c033a155')},
    //     {
    //         $inc:{
    //             age:1
    //         },
            
    //         $currentDate:{lastModified:true}
            
    //     }).then((result)=>{                                                                         // instead of callback we r using promise
    //         console.log(result)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })

    // db.collection('tasks').updateMany(
    //     {
    //         status:false 
    //     },
    //     {
    //         $set:{
    //             status:true
    //         }
            
    //     }
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // // Read/Query op

    // db.collection('users').findOne({_id: new ObjectID('61b33db9e3ff3392c033a157')},(err,result)=>{   // find document by id
    //     if (err)
    //         return console.log('not found')
    //     console.log(result)
    // })

    // db.collection('users').find({age:22}).sort('name',1).toArray((error,document)=>{                               // find method returns cursor which is pointer to document 
    //     if(error)                                                                                   // to get documents we used cursor method 'toArray' check mongo doc cursor for ref
    //         return console.log(error)
    //     console.log(document)
    // })

    
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