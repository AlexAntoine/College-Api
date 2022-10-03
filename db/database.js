const mongoose = require('mongoose');

exports.localDb = ()=>{
    
    return mongoose.connect('mongodb://127.0.0.1:27017/collegesDb');
}

exports.productionDb = ()=>{
    
}