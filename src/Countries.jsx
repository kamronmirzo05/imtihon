import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from './menu';
import axios from 'axios'

import { BiArrowBack } from 'react-icons/bi'

function SinglePost() {

    const slug = useParams();
    const navigate = useNavigate();


    const [country, setCountry] = useState({})


    useEffect(() => {
        getDAte()
    }, [])

    const getDAte = async () => {
        try {
            const res = await axios.get(`http://13.51.196.53:8080/countries/slug/${slug.id}`)
            const data = await res.data
            setCountry(data)
        } catch (error) {
            console.log(error);
        }
    }

    function toBorder(slug) {
        navigate(`/single/${slug}`)
        getDAte()
    }


    return (
        <>
            <Navbar />
            <div className={`w-100  p-10 bg-white dark:bg-[#202C36] dark:text-white'}`} style={{ margin: '0 auto' }}>
                <button onClick={() => navigate('/')} className={`bg-white dark:bg-[#2B3844] flex items-center gap-2 shadow dark:text-white px-7 rounded-md font-bold w-[10%]`}>
                    <BiArrowBack /> BACK
                </button>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 md:h-screen  dark:text-white">
                    <div className='p-5 text-center'>
                        <img src={country.flags?.png} className='w-auto h-auto md:w-[90%] md:h-96 rounded-md' alt="" />
                    </div>
                    <div className='pt-14'>
                        <h1 className='text-4xl font-bold mb-5'>{country.name?.common}</h1>
                        <div className='md:flex justify-between gap-5 '>
                            <div className="">
                                <p className='text-xl'>Native name : {country.name?.nativeName}</p>
                                <p className='text-xl'>Population : {country.population}</p>
                                <p className='text-xl'>Regione : {country.region}</p>
                                <p className='text-xl'>Subregion : {country.subregion}</p>
                                <p className='text-xl'>Capital : {country.capital}</p>
                            </div>
                            <div className="">
                                <p className='text-xl'>Top level Domain :  {country.tld}</p>
                                <p className='text-xl'>Currencies : {country.currencies?.map(p => <span key={p}>{p}</span>)}</p>
                                <div className='flex gap-5 text-xl'>
                                    <p>Languages : </p>
                                    <div className='flex gap-4'>{country.languages?.map(p => <span key={p}>{p}</span>)} </div>
                                </div>
                            </div>
                        </div>
                        {
                            country.borders?.length ?
                                <div className='flex gap-6 mt-5 '>
                                    <h3 className='font-bold'>Border Countries</h3>
                                    <div className=' grid grid-cols-3 md:grid-cols-4 gap-5 items-center text-center'>
                                        {country.borders.map(p => <span onClick={() => toBorder(p.slug)} className='shadow cursor-pointer dark:bg-[#2B3844] w-ma p-[5px_10px]' key={p.common}>{p.common} </span>)}
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost