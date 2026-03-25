import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('test')
      .select('*')

    if (error) {
      console.error('Error:', error)
    } else {
      setData(data)
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Prueba Supabase 🚀</h1>

      {loading && <p>Cargando...</p>}

      {!loading && data.length === 0 && <p>No hay datos</p>}

      {data.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}

export default App