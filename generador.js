import { closeConnection, connect } from "./db.js"

const generarReporte = (query, collection) => {
    return new Promise((resolve,reject) => {
        const client = connect()
        const db = client.db("stupendo")
        db.collection(collection)
            .aggregate(query)
            .toArray()
            .then(resolve)
            .catch(error => reject(error))
            .finally(() => closeConnection(client))
    
            
        })
    }
        
export default generarReporte;