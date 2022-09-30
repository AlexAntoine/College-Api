const mongoose = require('mongoose');

const collegeSchema = mongoose.Schema({

    division:{
        type: String
    },

    school:{
        type: String
    },

    athleticDirector:{
        name:String,
        email:String 
    },

    sports:[
        {
            
            name:{
                type:String
            },

            headCoach:{
                name:String,
                email:String
            },

            assistantCoaches:{
                type: [Array],
                name:String,
                email:String
            },
        }
        
    ],

    createdAt: {
        type: Date,
        default: Date.now
     }

});

module.exports = mongoose.model('Colleges', collegeSchema);

