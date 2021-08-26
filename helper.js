





export async function insertUser(client, user) {
    const result = await client.db("crm").collection("user").insertOne(user);
    console.log("successfully pass inserted", result);
    return result;
}

export async function getUsers(client, filter) {
    const result = await client.db("crm").collection("user").find(filter).toArray();
    console.log("successfully found the user", result);
    return result;
}


export async function getUser(client, filter) {
    const result = await client.db("crm").collection("user").findOne(filter);
    console.log("successfully matched", result);
    return result;
}

export async function updatePollById(client, id,newPoll) {
    const result = await client.db("crm").collection("user").updateOne({ id: id },{$set:newPoll});
    console.log("successfully updated", result);
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

export async function putProduct(client,product){
    const product = await client.db("crm").collection("products").insertOne(product);
    console.log("successfully products is inserted",product);
    return product;
}

export async function getProductData(client,filter){
    const product = await client.db("crm").collection("products").find(filter).toArray();
    console.log("successfully all products are obtanied",product);
    return product;
}


