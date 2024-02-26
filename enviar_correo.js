import nodemailer from 'nodemailer';
import destinatarios from "./destinatarios.json" assert {type: "json"}

function sendEmail() {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ricardo.landinez@estupendo.com.co',
            pass: 'ghpngkoozndidhmh'
        }
    });

    const mailOptions = {
        from: 'ricardo.landinez@estupendo.com.co',
        to: destinatarios.join(","), // Cambia el correo de destino
        cc: '', 
        //bcc: 'soporte.stupendo@estupendo.com.co',
        subject: 'Alarma empresas sin acuse',
        html: `
        Buen día estimado equipo de Estupendo,<br><br>
        Reciban un cordial saludo. Este mensaje automático tiene como propósito reportar, de manera diaria, los documentos sin acuse  para las empresas asociadas a mi monitoreo, detalladas a continuación:<br><br>
        - CLARIOS ANDINA SAS  NIT 900388600<br>
        - CLARIOS DEL PACIFICO SAS  NIT 817000727<br>
        - TRANSQUIM S.A.S NIT 900440999<br>
        - SBS SEGUROS COLOMBIA S.A. NIT 860037707<br>
        - C I MILPA S A  NIT 860513970<br><br>
        Es relevante mencionar que si alguna de estas empresas no aparece reflejada en el reporte, se debe a que el número de documentos es igual a 0, lo que indica que no presentan documentos sin acuse durante ese período de reporte.<br><br>
        <strong>Por favor, NO responder a este mensaje, ya que se ha generado automáticamente</strong>.<br><br>
        Saludos cordiales.
    `,
        attachments: [
            {
                filename: 'Reporte_documentos_recepcionados_sin_acuse.xlsx',
                path: './Reporte_documentos_recepcionados_sin_acuse.xlsx'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
}




export default sendEmail
