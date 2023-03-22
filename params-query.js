const express = require ('express')
const app = express()
const {products} = require('./data')

app.get('/',(req,res)=>{
    res.send('<h1>Home page</h1><a href="/api/products">products</a>')
    //res.json(products)
})
app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image} =product;
        return {id,name,image}
    })
    res.json(newProducts)
})
app.get('/api/products/:productID',(req,res)=>{
    // console.log(req);
    // console.log(req.params);
    const {productID} =req.params
    const singleProduct = products.find((product)=>product.id===Number(productID))
    if(!singleProduct){
        return res.status(404).send('doesnt exist')
    }
    console.log(req.params);
    res.json(singleProduct)
})
app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params);
    res.send('fetching reviews')
})
//     app.get('/api/products/1',(req,res)=>{
//     const singleProduct = products.find((product)=>product.id===1)
//     res.json(singleProduct)
// })

app.get('/api/v1/query',(req,res)=>{
    //console.log(req.query);
    //console.log(req.params);
    //res.send('hello worlds')
    const {search,limit} = req.query
    let sortedProducts = [...products]
    if(search){
        sortedProducts=sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts= sortedProducts.slice(0,Number(limit))
    }
    if (sortedProducts.length<1){
        //res.status(200).send('no result matched')
        return res.status(200).send({success:true,data:[]})
    }
    return res.status(200).send(sortedProducts)
})

app.listen(5000, ()=>{
    console.log('server listening at port 5000');
})