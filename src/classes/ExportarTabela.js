import React from 'react'

export default class ExportacaoEmXls extends React.Component {
    exportarTabelaDeComprasEmXls(nomeDoArquivo, elementTable, botaoExportarId) {
        var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
        tab_text += '<head><meta charset="UTF-8" /><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
        tab_text += '<x:Name>Test Sheet</x:Name>'
        tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
        tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'
        tab_text += "<table border='1px'>"
        tab_text += elementTable.outerHTML
        tab_text += '</table></body></html>'

        var data_type = 'data:application/vnd.ms-excel'
        const botaoExportarXls = document.getElementById(botaoExportarId)
        botaoExportarXls.setAttribute('href', data_type + ', ' + encodeURIComponent(tab_text))
        botaoExportarXls.setAttribute('download', `${nomeDoArquivo}.xls`)
    }
}