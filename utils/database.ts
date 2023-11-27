import monggoose from 'mongoose'

let isConnected = false;

export const connectToDb = async () => {
    monggoose.set('strictQuery', true)
    if (isConnected) {
        console.log('Mongo DB already connected')
        return
    }

    try {
        await monggoose.connect(process.env.MONGODB_URI ?? '', {
            dbName:process.env.MONGODB_DBNAME
        })

        isConnected = true;
        console.log("MONGO DB CONNECTED")
        
    } catch (err) {
        console.log('MONGO DB ERROR',err)
    }
}