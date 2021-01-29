const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

type Books = {
    id: string,
    url : string, 
    name: string
}



type AppSyncEvent = {
    info: {
        fieldName: string
    }
    arguments: {
        // title: string,
        bookId: string,
        book: Books
    }
}


async function addBookMark(book: Books) {
    let params = {
        TableName: process.env.BOOK_MARKS_TABLE,
        Item: book
    }

    try {
        await docClient.put(params).promise();
        return book

    }
    catch (e) {
        console.info("error in dynamo db ", e)
        return null

    }
}

async function deleteBookMark(bookId: string) {
    const params = {
        TableName: process.env.BOOK_MARKS_TABLE,
        Key: {
            id: bookId
        }
    }
    try {
        await docClient.delete(params).promise()
        return bookId
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

type Params = {
    TableName: string | undefined,
    Key: string | {},
    ExpressionAttributeValues: any,
    ExpressionAttributeNames: any,
    UpdateExpression: string,
    ReturnValues: string
}

async function updateBookMark(book: any) {
    let params: Params = {
        TableName: process.env.BOOK_MARKS_TABLE,
        Key: {
            id: book.id
        },
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {},
        UpdateExpression: "",
        ReturnValues: "UPDATED_NEW"
    };
    let prefix = "set ";
    let attributes = Object.keys(book);
    for (let i = 0; i < attributes.length; i++) {
        let attribute = attributes[i];
        if (attribute !== "id") {
            params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
            params["ExpressionAttributeValues"][":" + attribute] = book[attribute];
            params["ExpressionAttributeNames"]["#" + attribute] = attribute;
            prefix = ", ";
        }
    }

    try {
        await docClient.update(params).promise()
        return book
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}


async function getBooks() {

    let params = {
        TableName: process.env.BOOK_MARKS_TABLE
    }

    try {
        const data = await docClient.scan(params).promise()
        return data.Items
    }
    catch (error) {
        console.log("erorr during fetch data ", error);

    }

}


exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {

        case 'addBookMark':
            return await addBookMark(event.arguments.book)
        case 'getBooks':
            return await getBooks()
        case 'deleteBookMark':
            return await deleteBookMark(event.arguments.bookId)
        case 'updateBookMark':
            return await updateBookMark(event.arguments.book)
        default:
            return null

    }
}