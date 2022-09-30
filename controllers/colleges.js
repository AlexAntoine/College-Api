const colleges = require('../models/colleges');
const asyncHandler = require('../middleware/async');

exports. getHomePage = (req, res)=>{

    res.send('WELCOME TO COLLEGES API');
};

exports.getAllColleges = asyncHandler(async(req, res, next)=>{
    let query;

    const reqQuery = {...req.query};

    const removeField = ['select', 'sort'];

    removeField.forEach(field => {
        delete reqQuery[field]
    });

    // console.log('colleges line 20: ',reqQuery);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    
    query = colleges.find(JSON.parse(queryStr));

    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        //Add created at field on model
        query = query.sort('-createdAt')
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 2;
    const startIndex = (page -1) * limit;
    const endIndex  = page * limit;
    const total = await colleges.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const college = await query

    //Pagination Result
    const pagination = {};

    if(endIndex < total)
    {
        pagination.next = {
            page:page+1,
            limit
        }
    }

    if(startIndex > 0){
        pagination.previous = {
            page: page -1,
            limit
        }
    }

    // console.log('colleges.js line 12: ', college);

    res.status(200).json({count: college.length, pagination, college})
});