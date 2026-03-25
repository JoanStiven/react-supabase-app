import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('') // 👈 nuevo estado

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('test')
      .select('*')

    if (!error) setData(data)
    setLoading(false)
  }

  // 🚀 INSERTAR DATO
async function insertData() {
  if (!name) return

  const { data, error } = await supabase
    .from('test')
    .insert([{ name }])

  console.log('INSERT DATA:', data)
  console.log('INSERT ERROR:', error)

  if (error) {
    console.error(error)
  } else {
    setName('')
    fetchData()
  }
}

  return (
    <div>
      <h1>Prueba Supabase 🚀</h1>

      {/* 🧠 INPUT */}
      <input
        type="text"
        placeholder="Escribe algo..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 🔥 BOTÓN */}
      <button onClick={insertData}>
        Agregar dato
      </button>

      {loading && <p>Cargando...</p>}
      {!loading && data.length === 0 && <p>No hay datos</p>}

      {data.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}

export default App