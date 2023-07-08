const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    const shortId = shortid(8);
    if(!body.url){
        res.status(400).json({error : 'url is required' ,id:shortId});
    }
    
    await URL.create({
        shortId:shortId,
        visitHistory:[],
        redirectUrl:body.url
    });

    return res.status(201).json({id:shortId});
}
async function handleGetAnalytics(req,res){
    shortId = req.params.shortId;
    const entry = await URL.findOne({shortId}); 
    return res.json({totalclicks : entry.visitHistory.length , analytics: entry.visitHistory});
}
module.exports={handleGenerateNewShortUrl , handleGetAnalytics};