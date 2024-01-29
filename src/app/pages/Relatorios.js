'use client'
import { useEffect, useState, useSyncExternalStore } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Relatorios = () => {
    const [periodStart, setPeriodStart] = useState('');
    const [periodEnd, setPeriodEnd] = useState('');

    const handleExport = () => {
        const deliveriesForExport = deliveries.map(delivery => ({
          'Nome do Item': delivery.itemName,
          'Nome do cliente': delivery.userName,
          'Endereço de entrega': delivery.address,
          'Data de entrega': delivery.deliveryDate,
          'Notas da entrega': delivery.notes
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(deliveriesForExport);
    
        const workbook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workbook, worksheet, "Deliveries");
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(data, 'Entregas.xlsx');
      };
    
      const handleExportByPeriod = async (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        const allDeliveries = await getDeliveries();
    
        const filteredDeliveries = allDeliveries.filter(delivery => {
          const deliveryDate = new Date(delivery.deliveryDate);
          return deliveryDate >= startDate && deliveryDate <= endDate;
        });
    
        const deliveriesForExport = filteredDeliveries.map(delivery => ({
          'Nome do Item': delivery.itemName,
          'Nome do cliente': delivery.userName,
          'Endereço de entrega': delivery.address,
          'Data de entrega': delivery.deliveryDate,
          'Notas da entrega': delivery.notes
        }));
        {(() => {
          switch(screen) {
            case "gerenciadordealugueis": return <Gerenciadordealugueis />;
            case "relatorios": return <Relatorios />;
            default: return null;
          }
        })()}
        const worksheet = XLSX.utils.json_to_sheet(deliveriesForExport);
    
        const workbook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workbook, worksheet, "Deliveries");
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(data, 'Relatorio.xlsx');
      };
      return (
        
    <div className='flex flex-row'>
      <div className='h-[900px] w-[2px] mr-4 bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />
      <div className=''>
      <p className='mb-2'>Relatórios:</p>
      <div className='p-2 ring-2 rounded-lg ring-neutral-200 mb-2 max-w-[250px]'>
        <p>Gerar relatório de todas as entregas:</p>
        <button onClick={() => handleExport()} className='p-2 bg-rose-300 text-white rounded-lg w-full hover:bg-rose-400'>
          Exportar entregas
        </button>
      </div>
      <div className='p-2 ring-2 rounded-lg ring-neutral-200 mb-2 max-w-[250px]'>
        <p>Gerar relatório de entregas por período:</p>
        <p>Início:</p>
        <input value={periodStart} onChange={e => setPeriodStart(e.target.value)} type='date' className='p-2 w-full mb-2 ring-2 rounded-lg ring-neutral-200' />
        <p>Fim:</p>
        <input value={periodEnd} onChange={e => setPeriodEnd(e.target.value)} type='date' className='p-2 w-full mb-2 ring-2 rounded-lg ring-neutral-200' />
        <button onClick={() => handleExportByPeriod(periodStart, periodEnd)} className='p-2 bg-rose-300 text-white rounded-lg w-full hover:bg-rose-400'>
          Exportar entregas
        </button>
      </div>
      </div>
    </div>
      )
}


export default Relatorios;