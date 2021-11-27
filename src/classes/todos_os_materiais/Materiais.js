import React from 'react'

export default class Materiais extends React.Component {
    obterTodosOsMateriais() {
        const materiais = new Map()

        materiais.set('271157', 'Insulina, origem: humana, tipo: nph, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('442012', 'Insulina, tipo: nph, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('442011', 'Insulina, tipo: regular, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('271154', 'Insulina, origem: humana, tipo: regular, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('405998', 'Insulina, tipo: lispro, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('405965', 'Insulina, tipo: lispro associada à lispro protamina, concentração: 25% + 75% , 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('401325', 'Insulina, tipo: lispro associada à lispro protamina, concentração: 50% + 50%, 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('401324', 'Insulina, tipo: lispro associada à lispro protamina, concentração: 50% + 50%, 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: refil')
        materiais.set('276235', 'Insulina, origem: lispro associada à lispro protamina, dosagem: 25% + 75%, aplicação: injetável')
        materiais.set('276233', 'Insulina, origem: lispro, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('383688', 'Insulina, origem: asparte associada à asparte protamina, concentração: 30% + 70%, 100 ui,ml, forma farmaceutica: solução injetável')
        materiais.set('403359', 'Insulina, tipo: glulisina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: refil')
        materiais.set('403358', 'Insulina, tipo: glulisina, concentração: 100 ui,ml, forma farmaceutica: solução injetável')
        materiais.set('380017', 'Insulina, origem: glulisina, tipo: ação rápida, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('458670', 'Insulina, tipo: glargina associada à lixisenatida, concentração: 100 ui,ml + 33 mcg,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('452617', 'Insulina, tipo: glargina associada à lixisenatida, concentração: 100 ui,ml + 50 mcg,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('438153', 'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: refil')
        materiais.set('399010', 'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('273836', 'Insulina, origem: glargina, dosagem: 100ui,ml, aplicação: injetável')
        materiais.set('438433', 'Insulina, tipo: glargina, concentração: 300 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('452616', 'Insulina, tipo: degludeca associada à liraglutida, concentração: 100 u,ml + 3,6 mg,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('433218', 'Insulina, tipo: degludeca, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('337473', 'Insulina, origem: detemir, dosagem: 100u,ml, forma farmacêutica: solução injetável')
        materiais.set('337472', 'Insulina, origem: detemir, dosagem: 100u,ml, forma farmacêutica: solução injetável, característica adicional: com sistema de aplicação')
        materiais.set('342445', 'Insulina, Códigos2021 Humana Tipo: (N + R) Em Pré-Mistura Concentração: 70% + 30% , 100 Ui/Ml Forma Farmaceutica: Solução Injetável');
        materiais.set('333124', 'Origem: Humana Tipo: (N + R) Em Pré-Mistura Dosagem: 90% + 10% , 100 Ui/Ml  Forma Farmacêutica: Solução Injetável');
        materiais.set('342444', 'Insulina Origem: Humana Tipo: (N + R) Em Pré-Mistura Concentração: 80% + 20% , 100 Ui/Ml Forma Farmaceutica: Solução Injetável');
        materiais.set('468664', 'Insulina Tipo: Análoga De Ação Prolongada Concentração: 100 Ui/Ml Forma Farmaceutica: Solução Injetável Adicionais: C/ Sistema De Aplicação');
        materiais.set('473861', 'Insulina Tipo: Análoga De Ação Rápida Concentração: 100 Ui/Ml Forma Farmaceutica: Solução Injetável');
        materiais.set('440255', 'Insulina Tipo: Análoga De Ação Rápida Concentração: 100 Ui/Ml Forma Farmaceutica: Solução Injetável Adicionais: C/ Sistema De Aplicação');
        materiais.set('474529', 'Insulina Origem: Humana Tipo: Ação Rápida Concentração: 8 U/Dose + 12 U/Dose Forma Farmaceutica: Pó P/ Inalação Caracteristica Adicional: Com Aplicador Adicionais: C/ Refis Individuais');
        materiais.set('474526', 'Insulina Origem: Humana Tipo: Ação Rápida Concentração: 4 U/Dose + 8 U/Dose Forma Farmaceutica: Pó P/ Inalação Caracteristica Adicional: Com Aplicador Adicionais: C/ Refis Individuais');
        materiais.set('474525', 'Insulina Origem: Humana Tipo: Ação Rápida Concentração: 12 U/Dose Forma Farmaceutica: Pó P/ Inalação Caracteristica Adicional: Com Aplicador');
        materiais.set('474524', 'Insulina Origem: Humana Tipo: Ação Rápida Concentração: 8 U/Dose Forma Farmaceutica: Pó P/ Inalação Caracteristica Adicional: Com Aplicador');
        materiais.set('474523', 'Insulina Origem: Humana Tipo: Ação Rápida Concentração: 4 U/Dose Forma Farmaceutica: Pó P/ Inalação Caracteristica Adicional: Com Aplicador');
        materiais.set('474527', 'Insulina Origem: Humana Tipo: Ação Rápida Concentração: 4 U/Dose + 12 U/Dose Forma Farmaceutica: Pó P/ Inalação Caracteristica Adicional: Com Aplicador Adicionais: C/ Refis Individuais');
        materiais.set('296794', 'Insulina Origem: Aspart Tipo: Ação Rápida Dosagem: 100u/Ml Aplicação: Injetável');
        materiais.set('432782', 'Insulina Tipo: Degludeca Concentração: 100 Ui/Ml Forma Farmaceutica: Solução Injetável Caracteristica Adicional: Refil');
        materiais.set('481305', 'Insulina Tipo: Nph Concentração: 100 Ui/Ml Forma Farmaceutica: Solução Injetável Caracteristica Adicional: Refil');
        materiais.set('271159', 'Insulina Origem: Suína Purificada Tipo: Nph Dosagem: 100u/Ml Aplicação: Injetável');
        materiais.set('271158', 'Insulina Origem: Mista Purificada Tipo: Nph Dosagem: 100u/Ml Aplicação: Injetável');
        materiais.set('271156', 'Insulina Origem: Suína Tipo: Nph Dosagem: 100u/Ml Aplicação: Injetável');
        materiais.set('481306', 'Insulina Tipo: Regular Concentração: 100 Ui/Ml Forma Farmaceutica: Solução Injetável Caracteristica Adicional: Refil');
        materiais.set('282055', 'Insulina Origem: Humana Tipo: Regular  Dosagem: 100u/Ml Aplicação: Injetável Características Adicionais: Frasco 10,00 Ml');
        materiais.set('271155', 'Insulina Origem: Mista Purificada Tipo: Regular Dosagem: 100u/Ml Aplicação: Injetável');
        materiais.set('271153', 'Insulina Origem: Suína Purificada Tipo: Regular Dosagem: 100u/Ml Aplicação: Injetável');
        materiais.set('271152', 'Insulina Origem: Suína Tipo: Regular Dosagem: 100u/Ml Aplicação: Injetável');

        return materiais
    }
}