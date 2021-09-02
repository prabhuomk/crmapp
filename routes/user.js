import {  insertUser,getUser,putLead,putProduct, getLeadData, getProductData,deleteLeadData} from "../helper.js";

import {createConnection} from "../index.js";
import express  from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {auth} from "../middleware/auth.js"


const router=express.Router();




router
.route("/signup")
.post(async (request,response)=>{
    const { username,firstname,lastname,password }= request.body;
    
   

    const client=await createConnection();
    const hashedPassword=await genPassword(password);

    const pass=await insertUser(client,{username:username,firstname:firstname,lastname:lastname,password:hashedPassword})
    console.log(hashedPassword,pass );
    response.send(pass);
    
});

router
.route("/login")
.post(async (request,response)=>{
    const { username,password }= request.body;
    const client=await createConnection();
    const user=await getUser(client,{username:username});
    if(!user){
        response.send({message:"user not exist ,please sign up"})
    }else{
    console.log(user);
    const inDbStoredPassword=user.password;
    const isMatch= await bcrypt.compare(password,inDbStoredPassword);
    if(isMatch){
        const token=jwt.sign({id:user._id},process.env.KEY)
    
        response.send({message:"successfully login",token:token,username:username});
    }
    else{
        response.send({message:"invalid login"});

    } 
} 
    
});

router.route("/lead").post(async(request,response)=>{
    const {client,mobile_no,email,date,budget,requests}=request.body;
    const clients =await createConnection();
    const lead = await putLead(clients,{client:client,mobile_no:mobile_no,email:email,date:date,budget:budget,requests:requests});
    response.send(lead);
});

router.route("/leadtable").get(async (request,response)=>{
    const client = await createConnection();
    const lead = await getLeadData(client,{});
    response.send(lead);
});

router.route("/:_id").delete(async(request,response)=>{
    const _id=request.params._id;
    const client = await createConnection();
    const deletelead = await deleteLeadData(client,_id);
    response.send(deletelead);
})

router.route("/product").post(auth,async(request,response)=>{
const {product_name,description,price}=request.body;
const client = await createConnection();
const product=await putProduct(client,{product_name:product_name,description:description,price:price});
response.send(product);
});

router.route("/productlist").get(async (request,response)=>{
    const client = await createConnection();
    const product=await  getProductData(client,{});
    response.send(product);
})




async function genPassword(password){
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}




export const userRouter=router;
