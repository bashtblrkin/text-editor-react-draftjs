import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './Accordion/accordion';
import WrapAccordion from './WrapAccordion/WrapAccordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Preview.scss';
import { useEditorApi } from '../TextEditor/context';

const Preview = () => {

    const {flowerObject} = useEditorApi()

    return (
        <div style={{padding: '0px 20px'}}>
        {flowerObject.map((obj, i) => {
                return <WrapAccordion key={i}>
                    <>
                        <h4>{obj.country}</h4>

                        {/* Методы отбора образцов */}
                        {obj['Методы_отбора_образцов'] &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    style={{ backgroundColor: '#73C120', color: 'white' }}
                                >
                                    <b>Методы отбора образцов</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <b>{obj['Методы_отбора_образцов'].Наименование}</b>
                                    {obj['Методы_отбора_образцов'].Методы && obj['Методы_отбора_образцов'].Методы.map((mtd, idx) =>
                                        <p key={idx}>{mtd}</p>)}
                                </AccordionDetails>
                            </Accordion>}

                        {/* Требования к экспорту */}
                        {(obj['Требования к экспорту']?.Регионы ||
                                obj['Требования к экспорту']?.Регионы_зп ||
                                obj['Требования к экспорту']?.Контрагенты ||
                                obj['Требования к экспорту']?.Контрагенты_зп
                            ) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Требования к экспорту</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(obj['Требования к экспорту']?.Регионы?.Регионы_экспорта ||
                                            obj['Требования к экспорту']?.Регионы_зп?.Регионы_экспорта_зп
                                        ) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Регионы</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Требования к экспорту']?.Регионы?.Регионы_экспорта &&
                                                    obj['Требования к экспорту']?.Регионы?.Регионы_экспорта?.map((item, idx) => <p key={idx}>{item}</p>)}
                                                {obj['Требования к экспорту']?.Регионы_зп?.Регионы_экспорта_зп &&
                                                    obj['Требования к экспорту']?.Регионы_зп?.Регионы_экспорта_зп?.map((item, idx) => <p key={idx} style={{ color: 'red' }}>{item}</p>)}
                                            </AccordionDetails>
                                        </Accordion>}
                                    {(obj['Требования к экспорту']?.Контрагенты?.Контрагенты_экспорта ||
                                            obj['Требования к экспорту']?.Контрагенты_зп?.Контрагенты_экспорта_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Контрагенты</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Требования к экспорту']?.Контрагенты?.Контрагенты_экспорта &&
                                                    obj['Требования к экспорту']?.Контрагенты?.Контрагенты_экспорта.map((item, idx) => {
                                                        return <Accordion style={{
                                                            borderRadius: '0px',
                                                            boxShadow: 'none'
                                                        }} key={idx}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b>{item['Наименование']}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {item.Раскрыть['ИНН'] && <p>ИНН: {item.Раскрыть['ИНН']}</p>}
                                                                {item.Раскрыть['Уникальный код'] && <p>Уникальный код: {item.Раскрыть['Уникальный код']}</p>}
                                                                {item.Раскрыть['Адрес производства'] && <p>Адрес производства: {item.Раскрыть['Адрес производства']}</p>}
                                                                {item.Раскрыть['Юридический адрес'] && <p>Юридический адрес: {item.Раскрыть['Юридический адрес']}</p>}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })}
                                                {obj['Требования к экспорту']?.Контрагенты_зп?.Контрагенты_экспорта_зп &&
                                                    obj['Требования к экспорту']?.Контрагенты_зп?.Контрагенты_экспорта_зп.map((item, idx) => {
                                                        return <Accordion style={{
                                                            borderRadius: '0px',
                                                            boxShadow: 'none',
                                                            color: 'red'
                                                        }} key={idx}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b style={{ color: 'red' }}>{item['Наименование']}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {item.Раскрыть['ИНН'] && <p style={{ color: 'red' }}>ИНН: {item.Раскрыть['ИНН']}</p>}
                                                                {item.Раскрыть['Уникальный код'] && <p style={{ color: 'red' }}>Уникальный код: {item.Раскрыть['Уникальный код']}</p>}
                                                                {item.Раскрыть['Адрес производства'] && <p style={{ color: 'red' }}>Адрес производства: {item.Раскрыть['Адрес производства']}</p>}
                                                                {item.Раскрыть['Юридический адрес'] && <p style={{ color: 'red' }}>Юридический адрес: {item.Раскрыть['Юридический адрес']}</p>}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }

                                </AccordionDetails>
                            </Accordion>
                        }


                        {/* Требования к реэкспорту */}
                        {(obj['Требования к реэкспорту']?.Регионы ||
                                obj['Требования к реэкспорту']?.Регионы_зп ||
                                obj['Требования к реэкспорту']?.Контрагенты ||
                                obj['Требования к реэкспорту']?.Контрагенты_зп ||
                                obj['Требования к реэкспорту']?.Страны ||
                                obj['Требования к реэкспорту']?.Страны_зп
                            ) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Требования к реэкспорту</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(obj['Требования к реэкспорту']?.Регионы?.Регионы_реэкспорта ||
                                            obj['Требования к реэкспорту']?.Регионы_зп?.Регионы_реэкспорта_зп
                                        ) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Регионы</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Требования к реэкспорту']?.Регионы?.Регионы_реэкспорта &&
                                                    obj['Требования к реэкспорту']?.Регионы?.Регионы_реэкспорта?.map((item, idx) => <p key={idx}>{item}</p>)}
                                                {obj['Требования к реэкспорту']?.Регионы_зп?.Регионы_реэкспорта_зп &&
                                                    obj['Требования к реэкспорту']?.Регионы_зп?.Регионы_реэкспорта_зп?.map((item, idx) => <p key={idx} style={{ color: 'red' }}>{item}</p>)}
                                            </AccordionDetails>
                                        </Accordion>}
                                    {(obj['Требования к реэкспорту']?.Контрагенты?.Контрагенты_реэкспорта ||
                                            obj['Требования к реэкспорту']?.Контрагенты_зп?.Контрагенты_реэкспорта_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Контрагенты</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Требования к реэкспорту']?.Контрагенты?.Контрагенты_реэкспорта &&
                                                    obj['Требования к реэкспорту']?.Контрагенты?.Контрагенты_реэкспорта.map((item, idx) => {
                                                        return <Accordion style={{
                                                            borderRadius: '0px',
                                                            boxShadow: 'none'
                                                        }} key={idx}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b>{item['Наименование']}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {item.Раскрыть['ИНН'] && <p>ИНН: {item.Раскрыть['ИНН']}</p>}
                                                                {item.Раскрыть['Уникальный код'] && <p>Уникальный код: {item.Раскрыть['Уникальный код']}</p>}
                                                                {item.Раскрыть['Адрес производства'] && <p>Адрес производства: {item.Раскрыть['Адрес производства']}</p>}
                                                                {item.Раскрыть['Юридический адрес'] && <p>Юридический адрес: {item.Раскрыть['Юридический адрес']}</p>}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })}
                                                {obj['Требования к реэкспорту']?.Контрагенты_зп?.Контрагенты_реэкспорта_зп &&
                                                    obj['Требования к реэкспорту']?.Контрагенты_зп?.Контрагенты_реэкспорта_зп.map((item, idx) => {
                                                        return <Accordion style={{
                                                            borderRadius: '0px',
                                                            boxShadow: 'none',
                                                            color: 'red'
                                                        }} key={idx}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b style={{ color: 'red' }}>{item['Наименование']}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {item.Раскрыть['ИНН'] && <p style={{ color: 'red' }}>ИНН: {item.Раскрыть['ИНН']}</p>}
                                                                {item.Раскрыть['Уникальный код'] && <p style={{ color: 'red' }}>Уникальный код: {item.Раскрыть['Уникальный код']}</p>}
                                                                {item.Раскрыть['Адрес производства'] && <p style={{ color: 'red' }}>Адрес производства: {item.Раскрыть['Адрес производства']}</p>}
                                                                {item.Раскрыть['Юридический адрес'] && <p style={{ color: 'red' }}>Юридический адрес: {item.Раскрыть['Юридический адрес']}</p>}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    {(obj['Требования к реэкспорту']?.Страны?.Страны_реэкспорта ||
                                            obj['Требования к реэкспорту']?.Страны_зп?.Страны_реэкспорта_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Страны</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Требования к реэкспорту']?.Страны?.Страны_реэкспорта &&
                                                    obj['Требования к реэкспорту']?.Страны?.Страны_реэкспорта.map((cntr, idx) => <p key={idx}>{cntr}</p>)}
                                                {obj['Требования к реэкспорту']?.Страны_зп?.Страны_реэкспорта_зп &&
                                                    obj['Требования к реэкспорту']?.Страны_зп?.Страны_реэкспорта_зп.map((cntr, idx) => <p style={{ color: 'red' }} key={idx}>{cntr}</p>)}
                                            </AccordionDetails>
                                        </Accordion>

                                    }

                                </AccordionDetails>
                            </Accordion>
                        }


                        {/* Сопроводительные документы */}
                        {(obj['Сопроводительные документы']?.Основной_сопроводительный_документ ||
                                obj['Сопроводительные документы']?.Сопутствующий_сопроводительный_документ ||
                                obj['Сопроводительные документы']?.Прочий_сопроводительный_документ ||
                                obj['Сопроводительные документы зп']?.Основной_сопроводительный_документ_зп ||
                                obj['Сопроводительные документы зп']?.Сопутствующий_сопроводительный_документ_зп ||
                                obj['Сопроводительные документы зп']?.Прочий_сопроводительный_документ_зп) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Сопроводительные документы</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(obj['Сопроводительные документы']?.Основной_сопроводительный_документ ||
                                            obj['Сопроводительные документы зп']?.Основной_сопроводительный_документ_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Основной документ</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Сопроводительные документы']?.Основной_сопроводительный_документ &&
                                                    obj['Сопроводительные документы']?.Основной_сопроводительный_документ.map((doc, idx) => {
                                                        return <div key={idx}>
                                                            <p>{doc.Тип}</p>
                                                            <p>{doc['Период действия']}</p>
                                                        </div>
                                                    })}
                                                {obj['Сопроводительные документы зп']?.Основной_сопроводительный_документ_зп &&
                                                    obj['Сопроводительные документы зп']?.Основной_сопроводительный_документ_зп.map((doc, idx) => {
                                                        return <div key={idx}>
                                                            <p style={{ color: 'red' }}>{doc.Тип}</p>
                                                            <p style={{ color: 'red' }}>{doc['Период действия']}</p>
                                                        </div>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    {(obj['Сопроводительные документы']?.Сопутствующий_сопроводительный_документ ||
                                            obj['Сопроводительные документы зп']?.Сопутствующий_сопроводительный_документ_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Сопутствующий документ</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Сопроводительные документы']?.Сопутствующий_сопроводительный_документ &&
                                                    obj['Сопроводительные документы']?.Сопутствующий_сопроводительный_документ.map((doc, idx) => {
                                                        return <div key={idx}>
                                                            <p>{doc.Тип}</p>
                                                            <p>{doc['Период действия']}</p>
                                                        </div>
                                                    })}
                                                {obj['Сопроводительные документы зп']?.Сопутствующий_сопроводительный_документ_зп &&
                                                    obj['Сопроводительные документы зп']?.Сопутствующий_сопроводительный_документ_зп.map((doc, idx) => {
                                                        return <div key={idx}>
                                                            <p style={{ color: 'red' }}>{doc.Тип}</p>
                                                            <p style={{ color: 'red' }}>{doc['Период действия']}</p>
                                                        </div>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    {(obj['Сопроводительные документы']?.Прочий_сопроводительный_документ ||
                                            obj['Сопроводительные документы зп']?.Прочий_сопроводительный_документ_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Прочие документы</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Сопроводительные документы']?.Прочий_сопроводительный_документ &&
                                                    obj['Сопроводительные документы']?.Прочий_сопроводительный_документ.map((doc, idx) => {
                                                        return <div key={idx}>
                                                            <p>{doc.Тип}</p>
                                                        </div>
                                                    })}
                                                {obj['Сопроводительные документы зп']?.Прочий_сопроводительный_документ_зп &&
                                                    obj['Сопроводительные документы зп']?.Прочий_сопроводительный_документ_зп.map((doc, idx) => {
                                                        return <div key={idx}>
                                                            <p style={{ color: 'red' }}>{doc.Тип}</p>
                                                        </div>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        }


                        {/* Подкарантинная продукция*/}
                        {(obj['Подкарантинная продукция']?.Продукт?.['Наименование RUS'] ||
                                obj['Подкарантинная продукция']?.Продукт?.['Наименование LAT'] ||
                                obj['Подкарантинная продукция']?.['ТН ВЭД']?.ТНВЭД ||
                                obj['Подкарантинная продукция']?.['Карантинные_объекты']?.Карантинные_объекты ||
                                obj['Подкарантинная продукция']?.['Карантинные_объекты_зп']?.Карантинные_объекты_зп ||
                                obj['Подкарантинная продукция']?.['КФЗ']?.КФЗ ||
                                obj['Подкарантинная продукция']?.['Подкарантинные_объекты_зп']?.Подкарантинные_объекты_зп ||
                                obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH ||
                                obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH_R) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Подкарантинная продукция</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {obj['Подкарантинная продукция']?.Продукт?.['Наименование RUS'] &&
                                        obj['Подкарантинная продукция']?.Продукт?.DOC &&
                                        <Accordion style={{
                                            borderRadius: '0px',
                                            boxShadow: 'none'
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>{`${obj['Подкарантинная продукция']?.Продукт?.['Наименование RUS']}(${obj['Подкарантинная продукция']?.Продукт?.['Наименование LAT']}) - Разрешить`}</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Подкарантинная продукция']?.Продукт?.DOC.Разрешить && obj['Подкарантинная продукция']?.Продукт?.DOC.Разрешить.map((dc, idx) => {
                                                    return <div key={idx}>
                                                        <p style={{ display: 'inline' }}>(</p>
                                                        {dc.Документы &&
                                                            dc['Документы'].map((nd, idx) => <p style={{ display: 'inline' }} key={idx}>{idx === 0 ? '' : '; '}{nd}</p>)
                                                        }
                                                        <p style={{ display: 'inline' }}>)</p>
                                                    </div>
                                                })}
                                                <p>{obj['Подкарантинная продукция']?.Продукт?.DOC.Род ? `Род: ${obj['Подкарантинная продукция']?.Продукт?.DOC.Род}` : ``}</p>
                                                <p>{obj['Подкарантинная продукция']?.Продукт?.DOC.Группа ? `Группа: ${obj['Подкарантинная продукция']?.Продукт?.DOC.Группа}` : ``}</p>
                                                <p>{obj['Подкарантинная продукция']?.Продукт?.DOC.Масса_среднего_образца ? `Масса среднего образца: ${obj['Подкарантинная продукция']?.Продукт?.DOC.Масса_среднего_образца}` : ``}</p>
                                                {obj['Подкарантинная продукция']?.Продукт?.DOC.Разрешить && obj['Подкарантинная продукция']?.Продукт?.DOC.Разрешить.map((dc, idx) => {
                                                    return <div key={idx}>
                                                        {dc.Примечания && dc.Примечания.map((pr, idx) => {
                                                            if (pr != null) {
                                                                return <p key={idx}>Примечание: {pr}</p>
                                                            } else {
                                                                return ''
                                                            }
                                                        })}
                                                    </div>
                                                })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    {obj['Подкарантинная продукция']?.Продукт?.['Наименование RUS'] &&
                                        obj['Подкарантинная продукция']?.Продукт?.DOC_R &&
                                        <Accordion style={{
                                            borderRadius: '0px',
                                            boxShadow: 'none',
                                            color: 'red'
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>{`${obj['Подкарантинная продукция']?.Продукт?.['Наименование RUS']}(${obj['Подкарантинная продукция']?.Продукт?.['Наименование LAT']}) - Запретить`}</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Подкарантинная продукция']?.Продукт?.DOC_R.Запретить && obj['Подкарантинная продукция']?.Продукт?.DOC_R.Запретить.map((dc, idx) => {
                                                    return <div key={idx}>
                                                        <p style={{ display: 'inline', color: 'red' }}>(</p>
                                                        {dc.Документы &&
                                                            dc['Документы'].map((nd, idx) => <p style={{ display: 'inline', color: 'red' }} key={idx}>{nd}; </p>)
                                                        }
                                                        <p style={{ display: 'inline' }}>)</p>
                                                    </div>
                                                })}
                                                <p style={{ display: 'inline', color: 'red' }}>{obj['Подкарантинная продукция']?.Продукт?.DOC_R.Род ? `Род: ${obj['Подкарантинная продукция']?.Продукт?.DOC_R.Род}` : ``}</p>
                                                <p style={{ display: 'inline', color: 'red' }}>{obj['Подкарантинная продукция']?.Продукт?.DOC_R.Группа ? `Группа: ${obj['Подкарантинная продукция']?.Продукт?.DOC_R.Группа}` : ``}</p>
                                                <p style={{ display: 'inline', color: 'red' }}>{obj['Подкарантинная продукция']?.Продукт?.DOC_R.Масса_среднего_образца ? `Масса среднего образца: ${obj['Подкарантинная продукция']?.Продукт?.DOC_R.Масса_среднего_образца}` : ``}</p>
                                                {obj['Подкарантинная продукция']?.Продукт?.DOC_R.Запретить && obj['Подкарантинная продукция']?.Продукт?.DOC_R.Запретить.map((dc, idx) => {
                                                    return <div key={idx}>
                                                        {dc.Примечания && dc.Примечания.map((pr, idx) => {
                                                            if (pr != null) {
                                                                return <p key={idx} style={{ color: 'red' }}>Примечание: {pr}</p>
                                                            } else {
                                                                return ''
                                                            }
                                                        })}
                                                    </div>
                                                })}
                                            </AccordionDetails>
                                        </Accordion>}
                                    {(obj['Подкарантинная продукция']?.['ТН ВЭД']?.ТНВЭД ||
                                            obj['Подкарантинная продукция']?.['ТНВ ЭД_зп']?.ТНВЭД_зп) &&
                                        (<Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>ТН ВЭД</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Подкарантинная продукция']?.['ТН ВЭД']?.['ТНВЭД'] && obj['Подкарантинная продукция']?.['ТН ВЭД']?.['ТНВЭД'].map((tnved, idx) => {
                                                    return <p key={idx}>{tnved}</p>
                                                })}
                                                {obj['Подкарантинная продукция']?.['ТНВ ЭД_зп']?.ТНВЭД_зп && obj['Подкарантинная продукция']?.['ТНВ ЭД_зп']?.ТНВЭД_зп.map((tnved, idx) => {
                                                    return <p key={idx} style={{ color: 'red' }}>{tnved}</p>
                                                })}
                                            </AccordionDetails>
                                        </Accordion>)
                                    }
                                    {(obj['Подкарантинная продукция']?.['Карантинные_объекты']?.Карантинные_объекты ||
                                            obj['Подкарантинная продукция']?.['Карантинные_объекты_зп']?.Карантинные_объекты_зп
                                        ) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Карантинные объекты</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Подкарантинная продукция']?.['Карантинные_объекты']?.Карантинные_объекты &&
                                                    obj['Подкарантинная продукция']?.['Карантинные_объекты']?.Карантинные_объекты.map((obj, idx) => {
                                                        return <p key={idx}>{obj}</p>
                                                    })}
                                                {obj['Подкарантинная продукция']?.['Карантинные_объекты_зп']?.Карантинные_объекты_зп &&
                                                    obj['Подкарантинная продукция']?.['Карантинные_объекты_зп']?.Карантинные_объекты_зп.map((obj, idx) => {
                                                        return <p key={idx} style={{ color: 'red' }}>{obj}</p>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    {(obj['Подкарантинная продукция']?.['КФЗ']?.КФЗ ||
                                            obj['Подкарантинная продукция']?.['Подкарантинные_объекты_зп']?.Подкарантинные_объекты_зп) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Карантинные фитосанитарные зоны</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Подкарантинная продукция']?.['КФЗ']?.КФЗ &&
                                                    obj['Подкарантинная продукция']?.['КФЗ']?.КФЗ.map((obj, idx) => {
                                                        return <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b>{obj.Регион}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {obj.КФЗ && obj.КФЗ.map((kfz, idx) => <div style={{marginBottom: '10px'}}>
                                                                    {kfz.Район && <p>Район: {kfz.Район}</p>}
                                                                    {kfz.Площадь && <p>Площадь: {kfz.Площадь}</p>}
                                                                    {kfz.Кол_во_установленных_КФЗ && <p>Количество установленных КФЗ: {kfz.Кол_во_установленных_КФЗ}</p>}
                                                                </div>)}
                                                                {obj.КФЗ_зп && obj.КФЗ_зп.map((kfz, idx) => <div style={{marginBottom: '10px'}}>
                                                                    {kfz.Район && <p style={{color: 'red'}}>Район: {kfz.Район}</p>}
                                                                    {kfz.Площадь && <p style={{color: 'red'}}>Площадь: {kfz.Площадь}</p>}
                                                                    {kfz.Кол_во_установленных_КФЗ && <p style={{color: 'red'}}>Количество установленных КФЗ: {kfz.Кол_во_установленных_КФЗ}</p>}
                                                                </div>)}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })}
                                                {obj['Подкарантинная продукция']?.['Подкарантинные_объекты_зп']?.Подкарантинные_объекты_зп &&
                                                    obj['Подкарантинная продукция']?.['Подкарантинные_объекты_зп']?.Подкарантинные_объекты_зп.map((obj, idx) => {
                                                        return <p key={idx}>{obj}</p>
                                                    })}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    {(obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH ||
                                            obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH_R) &&
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <b>Требования к ПП</b>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH?.Типы_прочих_объектов &&
                                                    obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH?.Типы_прочих_объектов.map((othArr, idx) => {
                                                        return <Accordion key={idx}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b>{othArr.Тип}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {othArr.Данные.map((dan, idx) => {
                                                                    let data = ''
                                                                    dan.Данные.forEach(_data => { if (_data != null) data += _data })
                                                                    const str = dan.Наименование + (dan['Единица_измерения'] ? '(' + dan['Единица_измерения'] + ')' : '') + (data ? ' - ' + data : '')
                                                                    return <p key={idx}>{str}</p>
                                                                })}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })
                                                }
                                                {obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH_R?.Типы_прочих_объектов_зп &&
                                                    obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH_R?.Типы_прочих_объектов_зп.map((othArr, idx) => {
                                                        return <Accordion key={idx}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <b style={{ color: 'red' }}>{othArr.Тип}</b>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {othArr.Данные.map((dan, idx) => {
                                                                    let data = ''
                                                                    dan.Данные.forEach(_data => { if (_data != null) data += _data })
                                                                    const str = dan.Наименование + (dan['Единица_измерения'] ? '(' + dan['Единица_измерения'] + ')' : '') + (data ? ' - ' + data : '')
                                                                    return <p key={idx} style={{ color: 'red' }}>{str}</p>
                                                                })}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    })

                                                }
                                                {/* {obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH?.Типы_прочих_объектов &&
                                                    obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH?.Типы_прочих_объектов.map((oth, idx) => {
                                                        let data = ''
                                                        oth.Данные.forEach(_data => { if (_data != null) data += _data })
                                                        const str = oth.Наименование + (oth['Единица_измерения'] ? '(' + oth['Единица_измерения'] + ')' : '') + (data ? ' - ' + data : '')
                                                        return <p key={idx}>{str}</p>
                                                    })}
                                                {obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH_R?.Типы_прочих_объектов_зп &&
                                                    obj['Подкарантинная продукция']?.['Требования к подкарантинной продукции']?.OTH_R?.Типы_прочих_объектов_зп.map((oth, idx) => {
                                                        let data = ''
                                                        oth.Данные.forEach(_data => { if (_data != null) data += _data })
                                                        const str = oth.Наименование + (oth['Единица_измерения'] ? '(' + oth['Единица_измерения'] + ')' : '') + (data ? ' - ' + data : '')
                                                        return <p key={idx} style={{ color: 'red' }}>{str}</p>
                                                    })} */}
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        }

                        {/* Места ввоза */}
                        {(obj['Места ввоза'] ||
                                obj['Места ввоза_зп']) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Места ввоза</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {obj['Места ввоза']?.['Места_ввоза'] && obj['Места ввоза']?.['Места_ввоза'].map((place, idx) => {
                                        return <p key={idx}>{`${place['Место_ввоза']}` + (place.с ? `(c ${place.с}` : '') + (place.по ? ` по ${place.по})` : '')}</p>
                                    })}
                                    {obj['Места ввоза_зп']?.['Места_ввоза_зп'] && obj['Места ввоза_зп']?.['Места_ввоза_зп'].map((place, idx) => {
                                        return <p key={idx} style={{ color: 'red' }}>{`${place['Место_ввоза']}` + (place.с ? `(c ${place.с}` : '') + (place.по ? ` по ${place.по})` : '')}</p>
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        }


                        {/* Упаковка */}
                        {(obj.Упаковка?.Упаковка ||
                                obj.Упаковка_зп?.Упаковка_зп) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Упаковка</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {obj.Упаковка?.Упаковка && obj.Упаковка?.Упаковка.map((pack, idx) =>
                                        <div key={idx}>
                                            {pack.Упаковка && (
                                                <>
                                                    <b>Упаковка</b>
                                                    <p>{pack.Упаковка}</p>
                                                </>
                                            )}
                                            {pack.Обработка_упаковки && (
                                                <>
                                                    <b>Обработка упаковки</b>
                                                    <p>{pack.Обработка_упаковки}</p>
                                                </>
                                            )}
                                            {pack.Маркировка_упаковки && (
                                                <>
                                                    <b>Маркировка упаковки</b>
                                                    <p>{pack.Маркировка_упаковки}</p>
                                                </>)}
                                        </div>
                                    )}
                                    {obj.Упаковка_зп?.Упаковка_зп && obj.Упаковка_зп?.Упаковка_зп.map((pack, idx) =>
                                        <div key={idx}>
                                            {pack.Упаковка && (
                                                <>
                                                    <b style={{ color: 'red' }}>Упаковка</b>
                                                    <p style={{ color: 'red' }}>{pack.Упаковка}</p>
                                                </>
                                            )}
                                            {pack.Обработка_упаковки && (
                                                <>
                                                    <b style={{ color: 'red' }}>Обработка упаковки</b>
                                                    <p style={{ color: 'red' }}>{pack.Обработка_упаковки}</p>
                                                </>
                                            )}
                                            {pack.Маркировка_упаковки && (
                                                <>
                                                    <b style={{ color: 'red' }}>Маркировка упаковки</b>
                                                    <p style={{ color: 'red' }}>{pack.Маркировка_упаковки}</p>
                                                </>)}
                                        </div>)}
                                </AccordionDetails>
                            </Accordion>
                        }

                        {/* Транзит */}
                        {(obj.Транзит?.Условия_транзита ||
                                obj.Транизт_зп?.Условия_транзита_зп) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Условия транзита</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {obj.Транзит?.Условия_транзита &&
                                        obj.Транзит?.Условия_транзита.map((tc, idx) =>
                                            <p key={idx}>{tc}</p>)}
                                    {obj.Транизт_зп?.Условия_транзита_зп &&
                                        obj.Транизт_зп?.Условия_транзита_зп.map((tc, idx) =>
                                            <p key={idx} style={{ color: 'red' }}>{tc}</p>)}
                                </AccordionDetails>
                            </Accordion>
                        }

                        {/* Транспортировка */}
                        {(obj.Транспортировка?.Условия_транспортировки ||
                                obj.Транспортировка_зп?.Условия_транспортировки_зп) &&
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <b>Условия транспортировки</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {obj.Транспортировка?.Условия_транспортировки &&
                                        obj.Транспортировка?.Условия_транспортировки.map((tr, idx) =>
                                            <div key={idx}>
                                                {tr.Условия && (
                                                    <p>{tr.Условия}</p>
                                                )}
                                                {tr.Допускается_экспорт_ФСКС && tr.Допускается_экспорт_ФСКС === 'Да' && (
                                                    <p style={{ display: 'inline' }}>Допускается экспорт ФС/КС</p>
                                                )}
                                                {tr.Примечание && (
                                                    <p style={{ display: 'inline' }}>({tr.Примечание})</p>
                                                )}
                                            </div>
                                        )}
                                    {obj.Транспортировка_зп?.Условия_транспортировки_зп &&
                                        obj.Транспортировка_зп?.Условия_транспортировки_зп.map((tr, idx) =>
                                            <div key={idx}>
                                                {tr.Условия && (
                                                    <p style={{ color: 'red' }}>{tr.Условия}</p>
                                                )}
                                                {tr.Допускается_экспорт_ФСКС && tr.Допускается_экспорт_ФСКС === 'Да' && (
                                                    <p style={{ display: 'inline', color: 'red' }}>Допускается экспорт ФС/КС</p>
                                                )}
                                                {tr.Примечание && (
                                                    <p style={{ display: 'inline', color: 'red' }}>({tr.Примечание})</p>
                                                )}
                                            </div>
                                        )}

                                </AccordionDetails>
                            </Accordion>}
                    </>
                </WrapAccordion>
            })}
        </div>
    );
};

export default Preview;