import React, {useState, useEffect} from 'react'
import api from './api'

const App = () => {
    const [transaction, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const fetchTransactions = async () => {
        const response = await api.get('/users/');
        setTransactions(response.data)
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
         ...formData,
         [event.target.name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/users/', formData);
        fetchTransactions();
        setFormData({
            username: '',
            password: ''
        });
    };

    return(
        <div>
            <nav className='navbar navbar-light bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>Trigonometry</a>
                </div>
            </nav>

            <div className='container'>
                <form onSubmit={handleFormSubmit} >
                    <div className='mb-3 mt-3'>
                        <label htmlFor='amount' className='form-label'>Username</label>
                        <input type='text' className='form-control' id='amount' name="Username" onChange={handleInputChange} value={formData.amount}/>
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='amount' className='form-label'>Password</label>
                        <input type='text' className='form-control' id='pw' name="pw" onChange={handleInputChange} value={formData.pw}/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )

}

export default App;

//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div>
//        <h1>Just Trig ! ! ! </h1>
//    </div>
//  );
//}
//

