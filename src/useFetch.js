import { useState, useEffect } from 'react'

export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        fetch(url, {signal: abortController.signal})
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => {
                if(error.name === 'AbortError'){
                    console.log('Request Cancelled');
                }else {
                    setError(error)
                }
            })
            .finally(() => setLoading(false));

        return () => abortController.abort();
    }, []);

    const handleCancelRequest = () => {
        if(controller){
            controller.abort();
            setError('Request Cancelled')
        }
        
    }
    return { data, loading, error, handleCancelRequest }
}


// import { useFetch } from './useFetch'
// import './App.css'

// function App() {

//   const { data, loading, error,handleCancelRequest } = useFetch('https://jsonplaceholder.typicode.com/users')

//   return (
//     <>
//       <div>
//         <h1>Fetch like a PRO</h1>
//         <button onClick={handleCancelRequest}>Cancel request</button>
//         <div className='card'>
//           <ul>
//             {error && <li>Error: {error}</li>}
//             {loading && <li>Loading...</li>}
//             {data?.map((user) => (
//               <li key={user.id}>{user.name}</li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App