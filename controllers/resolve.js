exports.resolver = async (req, res)=>{
    console.log(req.params.strpath);
    res.end();
}