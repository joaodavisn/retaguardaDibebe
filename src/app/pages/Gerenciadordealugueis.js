'use client'
import Image from 'next/image'
import { useEffect, useState, useSyncExternalStore } from 'react';

const Gerenciadordealugueis = () => {
  const [itemCode, setItemCode] = useState('');
  const [cpf, setCpf] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [method, setMethod] = useState('pix');
  const [installments, setInstallments] = useState('1');
  const [notes, setNotes] = useState('');
  const [period, setPeriod] = useState('');
  const [value, setValue] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState('');
  const [itemStatus, setItemStatus] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [itemCode_update, setItemCode_update] = useState('');
  const [returnItemCode, setReturnItemCode] = useState('');
  const [updateItemCode, setUpdateItemCode] = useState('');
  const [admin, setAdmin] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnNotes, setReturnNotes] = useState('');
  const [returnItemStatus, setReturnItemStatus] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  async function rentItem(cpf, code, value, currency, period, method, address, startDate, endDate, notes, installments) {
    const userId = await getUserId(cpf);
    const itemId = await getItemId(code);

    if (userId && itemId) {
      const url = `https://api.dibebe.net/functions.php?rentItem&userId=${userId}&itemId=${itemId}&value=${value}&currency=${currency}&period=${period}&method=${method}&shippingAddress=${encodeURIComponent(address)}&startingDate=${startDate}&endingDate=${endDate}&notes=${encodeURIComponent(notes)}&installments=${installments}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setModalMessage('Nao foi possivel alugar');
      } else {
        setModalMessage('Item alugado com sucesso');
      }
      setModalVisible(true);

    } else {
      console.error('Error: Failed to get user ID or item ID.');
    }
  }

  async function confirmItem(code) {
    const itemId = await getItemId(code);
    if (itemId) {
      const url = `https://api.dibebe.net/functions.php?updateRented&itemId=${itemId}&rented=1`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.error('Error: ', data.error);
      } else {
        console.log('Success: ', data);
      }
    } else {
      console.error('Error: Não foi possível atualizar este item')
    }
  }

  async function markAsDelivered(deliveryId) {
    const response = await fetch(`https://api.dibebe.net/functions.php?deliverItem&deliveryId=${deliveryId}`);
    const data = await response.text();
    if (data) {
      return data;
    } else {
      console.error('Error: Failed to mark item as delivered.');
    }
  }

  async function returnItem(code, status, admin, returnDate, notes) {
    const itemId = await getItemId(code);
    if (itemId) {
      const url = `https://api.dibebe.net/functions.php?returnItem&itemId=${itemId}&status=${status}&date=${returnDate}&receiver=${admin}&notes=${notes}`
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.error('Error: ', data.error);
      } else {
        console.log('Success: ', data);
      }
    } else {
      console.error('Error: Não foi possível atualizar este item')
    }
  }

  async function updateItem(code, status) {
    const itemId = await getItemId(code);
    if (itemId) {
      const url = `https://api.dibebe.net/functions.php?updateStatus&itemId=${itemId}&status=${status}`
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.error('Error: ', data.error);
      } else {
        console.log('Success: ', data);
      }
    } else {
      console.error('Error: Não foi possível atualizar este item')
    }
  }

  async function getUserId(cpf) {
    const response = await fetch(`https://api.dibebe.net/functions.php?getIdByCPF&cpf=${cpf}`);
    const data = await response.text();

    if (data) {
      return data;
    } else {
      console.error('Error: Failed to get user ID.');
    }
  }

  async function getItemId(code) {
    const response = await fetch(`https://api.dibebe.net/functions.php?getIdByCode&code=${code}`);
    const data = await response.text();

    if (data) {
      return data;
    } else {
      console.error('Error: Failed to get item ID.');
    }
  }
  async function getDeliveries() {
    const response = await fetch('https://api.dibebe.net/functions.php?getDeliveries');
    const data = await response.json();

    if (data.message) {
      return [];
    }

    return data;
  }


  useEffect(() => {
    getDeliveries().then(data => setDeliveries(data));
  }, []);


  const handleDeliveredClick = async (deliveryId) => {
    await markAsDelivered(deliveryId);
    const data = await getDeliveries();
    setDeliveries(data);
  };

  const handleButtonClick = async () => {
    const data = await getDeliveries();
    setDeliveries(data);
  };


  return (
    <main className="flex flex-row items-start justify-start gap-4">
      <div className='h-[900px] w-[2px] bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />
      
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      {modalVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {modalMessage}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className='p-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400' onClick={() => setModalVisible(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <p>1. Reservar</p>
        <input value={itemCode} onChange={e => setItemCode(e.target.value)} placeholder='código do item' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <input value={cpf} onChange={e => setCpf(e.target.value)} placeholder='CPF do cliente' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Período:</p>
          <select value={period} onChange={e => setPeriod(e.target.value)} className='p-2 w-full ring-2 rounded-lg ring-neutral-200'>
            <option value="" disabled selected>Escolha um período</option>
            <option value="daily">Diária</option>
            <option value="fortnightly">Quinzenal</option>
            <option value="monthly">Mensal</option>
            <option value="quarterly">Trimestral</option>
          </select>
        </div>
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Data de início:</p>
          <input value={startDate} onChange={e => setStartDate(e.target.value)} type='date' className='p-2 w-full ring-2 rounded-lg ring-neutral-200' />
        </div>
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Data de fim:</p>
          <input value={endDate} onChange={e => setEndDate(e.target.value)} type='date' className='p-2 w-full ring-2 rounded-lg ring-neutral-200' />
        </div>
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Moeda:</p>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className='p-2 ring-2 w-full rounded-lg ring-neutral-200'>
            <option value="" disabled selected>Defina a moeda</option>
            <option value="BRL">🇺🇸 BRL</option>
            <option value="USD">🇺🇸 USD</option>
          </select>
        </div>
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Método:</p>
          <select value={method} onChange={handleMethodChange} className='p-2 ring-2 w-full rounded-lg ring-neutral-200'>
            <option value="pix">Pix</option>
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </div>
        {method == "credito" && <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Parcelas:</p>
          <select value={installments} onChange={e => setInstallments(e.target.value)} className='p-2 w-full ring-2 rounded-lg ring-neutral-200'>
            <option value="1">1x</option>
            <option value="2">2x</option>
            <option value="3">3x</option>
            <option value="4">4x</option>
            <option value="5">5x</option>
            <option value="6">6x</option>
            <option value="7">7x</option>
            <option value="8">8x</option>
            <option value="9">9x</option>
            <option value="10">10x</option>
            <option value="11">11x</option>
            <option value="12">12x</option>
          </select>
        </div>}
        <input value={value} onChange={e => setValue(e.target.value)} placeholder='Valor pago' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Retirada:</p>
          <select value={delivery} onChange={e => setDelivery(e.target.value)} className='p-2 ring-2 w-full rounded-lg ring-neutral-200'>
            <option value="retirada">Retirar em loja</option>
            <option value="entrega">Entrega</option>
          </select>
        </div>
        {delivery == "entrega" &&
          <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
            <p>Endereço de entrega:</p>
            <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder='Endereço do cliente' className='p-2 ring-2 rounded-lg ring-neutral-200' />
          </div>
        }
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder='notas' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <button onClick={() => rentItem(cpf, itemCode, value, currency, period, method, address, startDate, endDate, notes, installments)} className='p-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400'>
          Reservar
        </button>
      </div>
      <div className='h-[900px] w-[2px] bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />

      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div className='flex flex-col gap-2'>
        <p>2. Confirmar aluguel</p>
        <input value={itemCode_update} onChange={e => setItemCode_update(e.target.value)} placeholder='código do item' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <button onClick={() => confirmItem(itemCode_update)} className='p-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400'>
          Confirmar
        </button>
      </div>
      <div className='h-[900px] w-[2px] bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />

      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div className='flex flex-col gap-2'>
        <p>3. Retornar item</p>
        <input value={returnItemCode} onChange={e => setReturnItemCode(e.target.value)} placeholder='código do item' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Status:</p>
          <select value={returnItemStatus} onChange={e => setReturnItemStatus(e.target.value)} className='p-2 w-full ring-2 rounded-lg ring-neutral-200'>
            <option value="" disabled selected>Defina o status</option>
            <option value="2">Em limpeza</option>
            <option value="3">Em conserto</option>
            <option value="4">Substituir</option>
            <option value="5">Tratativa</option>
          </select>
        </div>
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Data de retorno:</p>
          <input value={returnDate} onChange={e => setReturnDate(e.target.value)} type='date' className='p-2 w-full ring-2 rounded-lg ring-neutral-200' />
        </div>
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Admin:</p>
          <select value={admin} onChange={e => setAdmin(e.target.value)} className='p-2 ring-2 w-full rounded-lg ring-neutral-200'>
            <option value="" disabled selected>Quem está recebendo</option>
            <option value="1">Djamila</option>
            <option value="2">Thayla</option>
            <option value="3">Day</option>
          </select>
        </div>
        <textarea placeholder='notas' value={returnNotes} onChange={e => setReturnNotes(e.target.value)} className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <button onClick={() => returnItem(returnItemCode, returnItemStatus, admin, returnDate, returnNotes)} className='p-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400'>
          Retornar
        </button>
      </div>
      <div className='h-[900px] w-[2px] bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />

      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div className='flex flex-col gap-2'>
        <p>4. Atualizar item</p>
        <input value={updateItemCode} onChange={e => setUpdateItemCode(e.target.value)} placeholder='código do item' className='p-2 ring-2 rounded-lg ring-neutral-200' />
        <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
          <p>Status:</p>
          <select value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)} className='p-2 w-full ring-2 rounded-lg ring-neutral-200'>
            <option value="" disabled selected>Defina o status</option>
            <option value="1">Pronto</option>
            <option value="2">Em limpeza</option>
            <option value="3">Em conserto</option>
            <option value="4">Substituir</option>
            <option value="5">Tratativa</option>
            <option value="6">Alugado</option>
          </select>
        </div>
        <button onClick={() => updateItem(updateItemCode, statusUpdate)} className='p-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400'>
          Atualizar
        </button>
      </div>
      <div className='h-[900px] w-[2px] bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />

      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div>
        <div className='flex flex-row items-center content-center mb-3 gap-2'>
          <p className='mb-2'>Entregas de items:</p>
          <button onClick={handleButtonClick} className='py-1 px-3 bg-rose-300 text-white rounded-lg w-fit hover:bg-rose-400'>
            Ѻ
          </button>
        </div>
        {deliveries.length > 0 ? (
          deliveries.map(delivery => (
            <div key={delivery.id} className='flex flex-col gap-2 bg-yellow-50 min-w-[250px] max-w-[300px] mb-2'>
              <div className='p-2 ring-2 rounded-lg ring-neutral-200'>
                <div className='flex flex-row gap-1'>
                  <hr className='my-1' />
                  <p>Data: </p><p><b>{delivery.deliveryDate}</b></p>
                </div>
                <hr className='my-1' />
                <div className='flex flex-row gap-1'>
                  <p>Item: </p><p><b>{delivery.itemName}</b></p>
                </div>
                <hr className='my-1' />

                <div className='flex flex-row gap-1'>
                  <p>Cliente: </p><p><b>{delivery.userName}</b></p>
                </div>
                <hr className='my-1' />

                <div className='flex flex-col gap-1'>
                  <p>Endereço: </p><p><b>{delivery.address}</b></p>
                </div>
                <hr className='my-4' />
                <div className='flex flex-col gap-1'>
                  <p>Notas: </p><p className="max-w-[250px] font-bold">{delivery.notes}</p>
                </div>
                <hr className='my-4' />
                <button onClick={() => handleDeliveredClick(delivery.id)} className='p-2 bg-rose-300 text-white rounded-lg w-full hover:bg-rose-400'>
                  Entregue
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma entrega pendente.</p>
        )}
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div className='h-[900px] w-[2px] bg-gradient-to-b from-neutral-200 to-transparent rounded-lg' />
    </main>
  )
}

export default Gerenciadordealugueis;