require('../src/db/mongoose')
const user=require('../src/models/users')
const task=require('../src/models/task')

// 61b9e24da23c6aace9cb5b7c (use promise chaining)

user.findByIdAndUpdate('61b9e24da23c6aace9cb5b7c',{
        name:'Aayush'
}).then((result)=>{
    console.log(result)
    return user.countDocuments({name:'aleron'})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

// user.countDocuments({age:0}).then((result)=>{
//     console.log(result)
//     return user.updateMany({
//         age:0,
//     },
//        {
//             age:30
//         }
//     ).then((result)=>{
//         console.log(result)
//     }).catch((e)=>{
//         console.log(e)
//     })
// })


// challenge

// task.findByIdAndDelete('61bc75c739909502330f206a').then((result)=>{
//     console.log(result)
//     return task.countDocuments({status:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })
