const express=require('express');
require('./db/config');
const user=require('./db/user');
const cors=require('cors');
const Product=require('./db/product');
const app=express();

app.use(express.json());
app.use(cors());

app.get('/',async(req,resp)=>{
    let result=await user.find();
    resp.send(result);
})

app.post('/signup',async(req,resp)=>{
    let User=await new user(req.body);
    let result=await User.save();
    result=result.toObject();
    delete result.password;
    resp.send(result);
})

app.post('/login',async(req,resp)=>{
    if(req.body.email && req.body.password){
        let User=await user.findOne(req.body).select("-password");
        if(User) resp.send(User);
        else resp.send({result: 'No User Found'});
    }else{
        resp.send({result: 'No User Found'});
    }
})

app.get('/profile/:id',async(req,resp)=>{
    let User=await user.findOne({_id:req.params.id}).select("-password");
    if(User) resp.send(User);
    else resp.send({result: 'No User Found'});
})

app.post('/add-product',async(req,resp)=>{
    let product=new Product(req.body);
    let result=await product.save();
    resp.send(result);
})

app.get('/products',async(req,resp)=>{
    let products=await Product.find();
    if(products.length>0) resp.send(products);
    else resp.send({result: 'No Products found'});
})

app.delete('/products/:id',async(req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get('/products/:id',async(req,resp)=>{
    const result=await Product.findOne({_id:req.params.id});
    if(result){resp.send(result)}
    else {resp.send({result:"No Record Found"})}
})

app.put('/products/:id',async(req,resp)=>{
    const result=await Product.updateOne(
        {_id:req.params.id},
        {$set: req.body}
        )
    resp.send(result);
})

app.get('/search/:key',async(req,resp)=>{
    let result=await Product.find({
        "$or": [
            {name: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
            {company: {$regex: req.params.key}}
        ]
    });
    resp.send(result);
})

app.listen(5000);
