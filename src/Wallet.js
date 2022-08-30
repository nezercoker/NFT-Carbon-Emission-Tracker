import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import { Rings } from 'react-loader-spinner'



//0x884998a2238cd2dc5e501b3b8251ceda888d79a1 token address

//0x7ca00e345e42557575f84de74dab33f93fe43dfe wallet address

//115422540 token id

function Wallet({history}) {
    const [details, setDetails] = useState(null)
    const [loading, setLoader] = useState(true)

    let { walletId } = useParams()
    const minting_cost = 18.05
    const sales_cost = 51


    const fetchPage =  async () => {
        try {
            let { data } = await Axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletId}&order_direction=desc&offset=0&include_orders=false`)
            const assets = data.assets
            if(!assets.length)  {
                setLoader(false) 
                return;
            }
            let total_sales = 0
            for(let i=0; i< assets.length; i++) {
                total_sales += +assets[0].num_sales
            }
            let carbon_sales = total_sales * sales_cost 
            let total_miniting_cost = minting_cost * assets.length
            let carbon_total = carbon_sales + total_miniting_cost


            setDetails({
                owner: assets[0].owner,
                carbon_sales,
                total_miniting_cost,
                carbon_total,
                asset_count: assets.length,
                total_sales
            })
            setLoader(false)
            console.log(assets)
        } catch(e) {
            console.log(e)
            setLoader(false)

        }
    }

    useEffect(() =>{
        console.log(walletId)
        fetchPage()
    },[])

    return (
      <div>
        {
            loading &&
            <Rings
            height="80"
            width="80"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />

        }
        {
            !loading &&
            <div>
                <header className='header'>
                    <div className='cont'>
                        <Link to="/">Go Home</Link>
                    </div>
                </header>
                <main className='cont'>
                    {
                        !details &&
                        <div className='banner'>
                            <h1>
                                This user has no assets
                            </h1>
                        </div>
                        
                    }
                    {
                        details &&
                        <div className='banner'>
                            <p>
                                Owner: {details.owner.user ?  details.owner.user.username : details.owner.address}
                            </p>
                            <p>
                                Total Carbon Emission: { details.carbon_total}
                            </p>
                            <p>
                                Total Miniting Cost: { details.total_miniting_cost }
                            </p>
                            <p>
                                Total Sales Cost: { details.carbon_sales}
                            </p>
                            <p>
                                Asset Count: { details.asset_count}
                            </p>
                            <p>
                                Total Sales: { details.total_sales}
                            </p>

                        </div>
                        
                    }
                </main>
            </div>
        }

      </div>
    );
  }
  
  export default Wallet;


  