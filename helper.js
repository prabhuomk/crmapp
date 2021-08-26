





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


