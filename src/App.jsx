import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import './app.css'

function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const fetchBookData = async () => {
    if (query === '') {
      alert("Enter Book name to search")
      return;
    }
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=40&key=${import.meta.env.VITE_API_KEY}`)
      if (response.data.items === undefined) {
        alert("No Books Found!")
        setBooks([])
      }
      else {
        setBooks(response.data.items)
      }
    } catch (error) {
      alert(error.message)
      alert("Try again later! Error on Google API")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchBookData()
    }
  }

  return (
    <div className="container-fixed d-flex flex-column align-items-center my-5 justify-content-center gap-3">
      <h1 className='text-danger fw-bold'>Google Books</h1>
      <div className='row w-50 justify-content-center gap-2' style={{ minWidth: "350px" }}>
        <div className='col-8 mb-2' style={{ minWidth: "250px" }}><input className='form-control fw-semibold input_box' type="text" value={query} placeholder='Search Books from Google API' onChange={handleQueryChange} onKeyDown={handleKeyPress} /></div>
        <div className='col-3' style={{ minWidth: "100px" }}><button className='btn btn-outline-danger w-100 fw-bold' onClick={fetchBookData}>Search</button></div>
      </div>
      {books.length > 0 ? <div className="container-fluid row d-flex flex-wrap mx-5 gap-4 justify-content-center">
        {books.map((item, index) => {
          const { title, imageLinks, authors, publisher, publishedDate, categories } = item.volumeInfo;
          return (
            <div className='card p-3 align-items-center bg-light text-center d-flex rounded-4 content' key={index} style={{ maxWidth: "300px", cursor: "pointer" }}>
              {title && <h5 className='fw-bold justify-content-center mb-3'>{title}</h5>}
              <img src={imageLinks?.thumbnail} alt="Thumbnail unavailable" className='mb-2' width={120} height={180} />
              {authors && <p className="fw-semibold m-1">Authors: {authors.join(", ")} </p>}
              {publisher && <p className='m-1'>Publisher: {publisher} </p>}
              {publishedDate && <p className='m-1'>published Date: {publishedDate} </p>}
              {categories && <p className='m-1'>categories: {categories.join(", ")}</p>}
            </div>
          )
        })}
      </div> :
        <div>
          <h4 className='text-danger'>No Books Found</h4>
          <p className='text-muted'>Try searching with a different keyword.</p>
        </div>}
    </div>
  )
}

export default App