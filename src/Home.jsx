import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './menu'


function Home() {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [limit, setLimit] = useState(8)
    const [regione, setRegione] = useState('')
    const [btn, setBtn] = useState();

    const [paginations, setPaginations] = useState(6)
    const [nextPagination, setNextPagination] = useState();
    const [paginationsMap, setPaginationsMap] = useState(Array.from(Array(paginations).keys()))

    useEffect(() => {
        getDate(regione)
    }, [])

    async function getDate(region, skip, name) {

        try {
            const res = await axios.get(`http://13.51.196.53:8080/countries?limit=${limit}&skip=${skip} &region=${region}&search=${name ? name : ''}`)
            const data = await res.data;
            setData(data)
            setRegione(region)
            setNextPagination(Math.ceil(data.total / limit));
        } catch (error) {
            console.log(error);
        }
    }

    function clearPages() {
        let a = -1;
        const cleared = paginationsMap.map(p => {
            a++
            return p = a;
        })
        setPaginationsMap(cleared);
    }



    function paginate(e) {

        if (btn) {
            btn.target.classList.remove('bg-green-700')
            btn.target.classList.add('bg-green-300')
        }
        let a = (+e.target.value) * limit;
        getDate(regione, a)
        e.target.classList.remove('bg-green-300')
        e.target.classList.add('bg-green-700')
        setBtn(e)

        paginationControl(e)
    }





    function paginationControl(e) {
        setPaginationsMap(
            paginationsMap.map(element => {
                if (paginationsMap[0] + 1 == 0) {
                    return element;
                }
                if (+e.target.value > 0 && +e.target.value < paginationsMap[3]) {
                    return element - 1
                } else {
                    if (element + 1 != nextPagination) {
                        return element + 1
                    } else {
                        return element.target.disabled;
                    }
                }
            })
        );
    }




    return (
        <div className={`w-[100%] md:h-[100vh]  pb-5  dark:bg-[#202C36]`}>
            <Navbar />

            <div className="container p-5 md:px-16 dark:bg-[#202C36] pt-5">
                <div className="grid  md:grid-cols-2 mt-5 mb-5">
                    <input type="text" className={`shadow px-5 py-3 rounded-md  outline-none dark:bg-[#2B3844] dark:text-white`} onChange={(e) => getDate(regione, 0, e.target.value)} placeholder="Search for a country…" />
                    <div className="text-end">
                        <select className={`p-3 border shadow rounded-md dark:bg-[#2B3844] dark:text-white cursor-pointer border-none`} onChange={e => { clearPages(), getDate(e.target.value) }}>
                            <option value="" className="pt-5 rounded-lg cursor-pointer">{regione ? 'All' : 'Filter by Region'} </option>
                            <option value="Africa">Africa</option>
                            <option disabled value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                </div>
                {
                    data.data?.length ?
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 h-full cursor-pointer">
                            {data.data.map((post, ind) => {
                                return (
                                    <div onClick={() => navigate(`/single/${post.name.slug}`)} key={ind} className={`h-full  shadow rounded-md dark:bg-[#2B3844] dark:text-white`}>
                                        <img src={post.flags.png} className='h-[50%] w-full mb-3' alt="" />
                                        <div className="p-2">
                                            <h2 className="text-2xl font-bold">{post.name.common}</h2>
                                            <p>Population :  {post.population}</p>
                                            <p>Regione : {post.region}</p>
                                            <p>Capital : {post.capital}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className=" h-[100vh]">
                            <h1 className='text-5xl dark:text-white'>Not found...</h1>
                        </div>

                }

                <div className="flex items-center justify-center gap-2 mt-8">
                    {
                        paginationsMap.map(p => <button key={p} value={p} onClick={(e) => paginate(e)} className='btn bg-green-300 text-white border-none p-[5px_10px] rounded-lg'>{p + 1}</button>)
                    }
                </div>
            </div >
        </div >
    )
}

export default Home