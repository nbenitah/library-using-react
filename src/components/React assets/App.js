import Footer from "./components/Footer;"
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Books";
import { books } from "./data";


function App ()
return (

    <Router>
        <div className="App">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books books={books} />} />
                <Route path="/books/:id" element={<BookInfo books={books} 
                addToCart={addToCart} cart={cart} />}/>
                <Route path="/cart" element={<Cart books={books} cart={cart} 
                changeQuantity={changeQuantity} removeFromCart={removeFromCart} />} />
            </Routes>
        </div>
    </Router>
);


    export default App;


