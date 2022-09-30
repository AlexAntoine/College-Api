const mongoose = require('mongoose');
const colors = require('colors');
const college = require('./models/colleges')
const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/collegesDb');
const colleges = JSON.parse(fs.readFileSync(`${__dirname}/_data/colleges.json`, 'utf-8'));

const importData = async()=>{
    
    try {
        
        await college.create(colleges);
        console.log('Data imported....'.green.inverse);

        process.exit(1);
    } catch (error) {
        
        console.log('something went wrong: ', error)
    }
}

const deleteData = async()=>{
    
   try {
       
    await college.deleteMany();

    console.log('Data Destroyed...'.red.inverse);

    process.exit(1);

   } catch (error) {
       
    console.log('Something went wrong: ', error)
   }
}

if(process.argv[2] == '-i'){
    importData()
}else if(process.argv[2] == '-d'){
    deleteData();
}