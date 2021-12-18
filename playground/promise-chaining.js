require('../src/db/mongoose')
const user=require('../src/models/users')
const task=require('../src/models/task')

// 61b9e24da23c6aace9cb5b7c (use promise chaining)

// user.findByIdAndUpdate('61b9e24da23c6aace9cb5b7c',{
//         name:'Aayush'
// }).then((result)=>{
//     console.log(result)
//     return user.countDocuments({name:'aleron'})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

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

// async-await

// const findAndUpdate=async (id)=>{
//     const user1=await user.findById(id)
//     const count=await user.countDocuments()
//     return count
// }

// findAndUpdate('61b9e24da23c6aace9cb5b7c').then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

// challenge (async-await)

task.findByIdAndDelete('61bdc9e7d041d5672df40f20').then(async (result)=>{
    console.log(result)
    const count=await task.countDocuments({status:false})
    console.log(count)
}).catch((e)=>{
    console.log(e)
})