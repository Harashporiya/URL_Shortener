const mongoose = require("mongoose")
async function connectToMonogDB(url){
    return mongoose.connect(url)
}

module.exports = {
    connectToMonogDB,
}