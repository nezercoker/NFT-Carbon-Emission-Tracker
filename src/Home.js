import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skies from './skies.svg'

function Home() {
    const [address, setAddress] = useState('')
    let navigate = useNavigate()

    const changePage = () => {
        navigate(`/wallet/${address}`)
    }

    const changeValue = (e) => {
        let { value } = e.target
        setAddress(value)
    }
    return (
      <div className="App-header">
        <div className='cont App-cont'>
            <div className='App-img'>
                <img src={Skies} alt='skies' />
                <div className=''>
                    <input placeholder='Enter wallet Address' value={address} onChange={changeValue} className='App-input'/>
                    <button className='App-button' onClick={changePage}>Submit</button>
                </div>
                
            </div>
            <div className='App-text'>
                <h1 className='title'>Calculate NFT CO2 Emittion</h1>
                <p>A non-fungible token (NFT) is a digital or physical asset that is represented by a record on a blockchain (Mani et al. 2021).</p>
                <p>Over its lifespan, it is estimated that an average NFT will produce 211kg of carbon dioxide (CO2) into the atmosphere as a result of the process of creating and purchasing the digital artwork. A single tree can offset 60kg of CO2 on average, therefore it will take 3.52 trees to offset the life of an NFT (nftclub)</p>
            </div>
        </div>
      </div>
    );
  }
  
export default Home;