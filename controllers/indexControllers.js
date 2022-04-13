'use strict'

async function indexRoot(req,res){
    console.log(req.session)
    if(req.session.count){
        req.session.count++;
    }
    else req.session.count = 1;
    if(!req.user) res.render('index', {title:'Session Example', count : req.session.count, displayName:undefined });
    else res.render('index', {title:'Session Example', count : req.session.count, displayName : req.user.displayName });
}

module.exports ={
    indexRoot,
}