import ExcelJS from "exceljs";



const generarSinAcuse = (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');


    worksheet.addRow(['Razón Social', 'NIT', 'Total Documentos Sin Acuse', 'Documentos']);

    data = data.map(document => {
        return {
            razon_social: document.razon_social,
            nit: document.nit,
            totalDocumentos_recepcionados: document.totalDocumentos_rechazado || 0,
            documentos: document.documentos.join("||") || 0
        }
    }).forEach(item => {
        worksheet.addRow([item.razon_social, item.nit, item.totalDocumentos_recepcionados, item.documentos]);
    });

    const filename = 'Reporte_documentos_recepcionados_sin_acuse.xlsx';
    workbook.xlsx.writeFile(filename)
        .then(() => {
            console.log(`Reporte generado exitosamente en ${filename}`);
        })
        .catch(error => {
            console.error('Error al generar el reporte:', error);
        });

}

export {generarSinAcuse}