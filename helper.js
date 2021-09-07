import mongodb from "mongodb";





export async function insertUser(client, user) {
    const result = await client.db("crm").collection("user").insertOne(user);
    console.log("successfully pass inserted", result);
    return result;
}


export async function getUser(client, filter) {
    const result = await client.db("crm").collection("user").findOne(filter);
    console.log("successfully matched", result);
    return result;
}



export async function putLead(client,lead){
    const result = await client.db("crm").collection("leads").insertOne(lead);
    console.log("successfully lead is inserted",result);
    return result;
}

export async function getLeadData(client,filter){
    const lead = await client.db("crm").collection("leads").find(filter).toArray();
    console.log("successfully all leads obtained", lead);
    return lead;
}

export async function getOneLeadData(client,_id){
    const onelead = await client.db("crm").collection("leads").findOne({_id:new mongodb.ObjectId(_id)});
    console.log("successfully all leads obtained", onelead);
    return onelead;
}

export async function updateLeaddata(client, _id,newLead) {
    const result = await client.db("crm").collection("leads").updateOne({ _id:new mongodb.ObjectId(_id) },{$set:newLead});
    console.log("successfully updated", result);
    return result;
}

export async function deleteLeadData(client,_id){
    const deletelead= await client.db("crm").collection("leads").deleteOne({_id:new mongodb.ObjectId(_id)});
    console.log("successfully lead is deleted",deletelead);
    return deletelead;
}

export async function putProduct(client,products){
    const product = await client.db("crm").collection("products").insertOne(products);
    console.log("successfully products is inserted",product);
    return product;
}

export async function getProductData(client,filter){
    const product = await client.db("crm").collection("products").find(filter).toArray();
    console.log("successfully all products are obtanied",product);
    return product;
}


