import dotenv from "dotenv";
import generarReporte from "./generador.js";
import { generarSinAcuse } from "./callbacks.js";
import sendEmail from "./enviar_correo.js";
import { exit } from "process";
//import { ObjectId } from 'mongodb';


dotenv.config()

var startOfDay = new Date();
startOfDay.setDate(startOfDay.getDate() - 25);
var currentMoment = new Date();

const recepcionSinAcuse = [
    {
        $match: {
            // receptor_id: {
            //     $in: [
            //         "5dbc8b9571b6a1449071d053",
            //         "5d9fa224b85ff304d14e481d",
            //         "5e57ea80f6e0166a9e7084e6",
            //         "5de7d9d4c138067f12478700",
            //         "5d780d6900679c1ffc549f8e"]
            // },
            formaPago: "2",
            tipo_documento: "01",
            estado: { $ne: 5 },
            "historial_wf.accion": {
                $nin: ["evento031", "evento030", "evento032", "evento033"]
            },
            created_at: {
                $gte: startOfDay,
                $lte: currentMoment
            }
        }
    },
    {
        $addFields: {
            emisorObjectId: { $toObjectId: "$receptor_id" }
        }
    },
    {
        $group: {
            _id: "$emisorObjectId",
            totalDocumentos_sinAcuse: { $sum: 1 },
            documentos: { $push: "$$ROOT" }
        }
    },
    {
        $sort: {
            totalDocumentos_sinAcuse: -1
        }
    },
    {
        $lookup: {
            from: "clientes",
            localField: "_id",
            foreignField: "_id",
            as: "clienteInfo"
        }
    },

    {
        $project: {
            razon_social: { $arrayElemAt: ["$clienteInfo.nombre_identificacion", 0] },
            nit: { $arrayElemAt: ["$clienteInfo.identificacion", 0] },
            totalDocumentos_rechazado: "$totalDocumentos_sinAcuse",
            documentos: "$documentos.numeral"
        }
    }




]


generarReporte(recepcionSinAcuse, "documentos_rec").then(data => {
    if (data.length > 0) {
        generarSinAcuse(data)
        sendEmail()
        return
    }
    console.log("No hay nada")
})

//ISODate("2024-02-14T00:00:00-05:00")
// 5dbc8b9571b6a1449071d053 CLARIOS ANDINA SAS
// 5d9fa224b85ff304d14e481d CLARIOS DEL PACIFICO SAS
// 5e57ea80f6e0166a9e7084e6 TRANSQUIM S.A.S
// 5de7d9d4c138067f12478700 C I MILPA S A
// 5d780d6900679c1ffc549f8e SBS SEGUROS COLOMBIA S.A.