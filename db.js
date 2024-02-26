import { MongoClient } from "mongodb"

const connect = () =>  new MongoClient(process.env.MONGO_CONNECTION_URI)


const closeConnection = (db) => db.close().then(() => console.log("Conexion cerrada"))


export {connect,closeConnection};
