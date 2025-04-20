import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=40`)
      setBooks(response.data.items)
    } catch (e) {
      setBooks([])
    }
  }
  return (
    <div className="container-fixed d-flex flex-column align-items-center mt-5 justify-content-center gap-3">
      <h1 className='text-danger'>Google Books</h1>
      <div className='row w-50 justify-content-center gap-2' style={{ minWidth: "350px" }}>
        <div className='col-8' style={{ minWidth: "250px" }}><input className='form-control fw-semibold' type="text" value={query} placeholder='Enter book name...' onChange={handleQueryChange} /></div>
        <div className='col-3' style={{ minWidth: "100px" }}><button className='btn btn-outline-primary w-100 fw-bold' onClick={fetchBookData}>Search</button></div>
      </div>
      {books && <div className="container-fluid d-flex flex-row flex-wrap mx-5 gap-4 align-items-center justify-content-center">
        {books.map((item, index) => (
          <div className='card col-3 p-3 align-items-center bg-light' key={index}>
            <h5>{item.volumeInfo.title}</h5>
            <img src={item.volumeInfo.imageLinks?.thumbnail} alt={item.volumeInfo.title} width={120} height={180} />
          </div>
        ))}
      </div>}
    </div>
  )
}

export default App
