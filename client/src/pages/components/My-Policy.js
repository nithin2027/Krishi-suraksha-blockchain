import { useState, useEffect } from "react";
import Abi from "../../abi/mintToken.json";
import { ethers } from "ethers";
import { Contract_Address } from "../../config.js";
import Popup from "reactjs-popup";
import ChainAbi from "../../abi/chainLinkWeatherData.json";

export default function MyPolicy({ webApi ,setSelect}) {
  const [allData, setAllData] = useState([]);
  const [account, setAccount] = useState("");
  const [load,setLoad]=useState(true)
  const [process,setProcess]=useState(0)
  const [first,setFirst]=useState("Processing") 
  const [second,setSecond]=useState("Processing") 

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { signer, contract } = webApi;
    if (signer == null) {
      alert("Connect your wallet");
      setSelect(0)
      return;
    }
    const address = await signer.getAddress();
    setAccount(address);
    const dataIds = await contract.getUserInsurances();
    const insuranceIds = dataIds.map((ele) => {
      return ele.toNumber();
    });
    const dataArray = [];
    for (let i of insuranceIds) {
      let data = await contract.getInsuranceDetails(i);
      const installment = (await contract.getPaidInstallments(i)) + 1;
      dataArray.push({ data: data, id: i, installment: installment });
    }
    setAllData(dataArray);
    setLoad(false)
    console.log(dataArray);
  }

  async function payInstallment(data) {
    try{
      const { signer, contract } = webApi;
      setLoad(true);
      setProcess(1)

    console.log(Contract_Address);
    const contractAddress = "0xC1A187BC545E8846Ef332F1C6607f5FDCC3165b1";
    const tokenContract = await new ethers.Contract(
      contractAddress,
      Abi.abi,
      signer
    );
    const approve = await tokenContract.approve(
      Contract_Address,
      data.data.Amount
    );
    await approve.wait();
    setFirst("Completed")

    const address = await signer.getAddress();
    const transaction = await contract.payInstallment(
      "0xC1A187BC545E8846Ef332F1C6607f5FDCC3165b1",
      data.id
    );
    await transaction.wait();
    setSecond("Completed")
    setProcess(0)
    }catch(e){
      console.log(e);
      setLoad(false)
      setProcess(0)
      alert("Payment failed");
      return;
    }
    // console.log(allData[i].data.maturityDate.toNumber())
    // console.log(allData[i].data.startDate.toNumber())
    // console.log(Date.now())
    // console.log("fii")
    setLoad(false);
    setProcess(0)
    fetchData();
  }
  function tprocess(){
    if(process==0)
    return<></>
    return (
      <div>
        <h1 className="text-4xl  text-black p-6 text-center mt-10 border-2"> First transaction {first}</h1>
        <h1 className="text-4xl  text-black p-6 text-center  border-2"> Second transaction {second}</h1>
      </div>
    )
  }
  if(load){
    return (
      <>
      <h1 className="text-4xl  text-black p-6 text-center mt-20 border-2"> Wait for a minute.......</h1>
      {
        tprocess()
      }
      </>
    )
  }
  if(allData.length==0){
    return (
      <h1 className="text-4xl  text-black p-6 text-center mt-20 border-2"> You have no Policy.......</h1>
    )
  }


  return (
    <div  className=" xs:scale-50 md:scale-75  xs:relative ">
      <table className=" xs:scale-50 md:scale-75 md:-translate-x-56 md:-translate-y-96   xs:absolute xs:-translate-x-80 xs:-translate-y-96 w-3/4 m-auto mt-14 text-lg border-green-300">
        <thead>
          <tr className=" text-slate-800 bg-blue-100 border-2 rounded-lg">
            <th className="border-2 p-3 xs:p-0 border-black">Sr. No.</th>
            <th className="border-2 p-3 xs:p-0 border-black">Account</th>
            <th className="border-2 p-3 xs:p-0 border-black">Policy</th>
            <th className="border-2 p-3 xs:p-0 border-black">Seeds Data</th>
            <th className="border-2 p-3 xs:p-0 border-black">EMI's</th>
            <th className="border-2 p-3 xs:p-0 border-black">Claim</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((ele, i) => {
            // console.log(ele.periodTime)
            return <TableData key={i} data={ele} index={i} />;
          })}
        </tbody>
      </table>
    </div>
  );

  function TableData({ data, index }) {
    return (
      <tr className="bg-gray-300 font-mono">
        <td className="border-2 p-3 border-black">{index + 1}.</td>
        <td className="border-2 p-3 border-black">
          {data.data.userWalletAddress}
        </td>
        <td className="border-2 p-3 border-black">
          {data.data.periodTime.toNumber()}
        </td>
        <td className="border-2 p-3 border-black">{data.data.seedsData}</td>
        <td className="border-2 p-3 border-black p-3 ">
          {data.data.Amount.toNumber()*(data.installment-1)} (paid) <br />
          <h1 className="inline-block p-2 border-2 border-black mt-2">
            {data.installment} No. Installment
          </h1>
          <button
            className="p-2 border-2 border-black mt-2"
            onClick={() => {
              payInstallment(data);
            }}
          >
            Pay
          </button>
        </td>
        <td className="border-2 border-black">
          <Popup
            trigger={
              <button className="border-2 border-black text-lg mx-4 px-8 py-2">
                Claim
              </button>
            }
            modal
            nested
          >
            {(close) => <UserInput data={data} webApi={webApi} />}
          </Popup>
        </td>
      </tr>
    );
  }

  function UserInput({ data, webApi }) {
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [load,setLoad]=useState(0);
    const [lastData,setLastData]=useState("")
    const [current,setCurrent]=useState(null)
    const [nprocess,setnProcess]=useState(0)
    const [first,setFirst]=useState("Processing") 
    const [second,setSecond]=useState("Processing") 

    useEffect(() => {
      latLong();
    }, []);

    function latLong() {
      setLat(data.data.lat);
      setLong(data.data.long);
    }

    async function submit(e) {
      e.preventDefault();
      try{
      const { contract,signer } = webApi;
      const contractAddress="0x531502E81438B8D6f689546E9969F0E4ED2d67A6"
      const chainContract=await new ethers.Contract(contractAddress,ChainAbi.abi,signer);
      setLoad(1);
        setnProcess(1);
      const transaction=await chainContract.requestWeatherData(lat,long,date,time);
      await transaction.wait();
      setFirst("Completed")

      const myTimeout = setTimeout(myGreeting, 20000);

      async function myGreeting() {
        try{
          const ntransaction=await contract.claim(
            '0xC1A187BC545E8846Ef332F1C6607f5FDCC3165b1',
            data.id,
            "",
            current
          )
          const transactionData=await ntransaction.wait();
          // console.log(ntransaction);
          setLastData(transactionData.events[0].args.massage)
          console.log(transactionData.events[0].args.massage)
          setSecond("Completed")
          setLoad(2)

        }catch(e){
          console.log(e);
          alert("Unsuccesful");
        }
      }
    }catch(e){
      console.log(e);
      alert("Claim operation failed");
      return;
    }
      
    }

    function tcprocess(){
      if(nprocess==0)
    return<></>
    return (
      <div>
        <h1 className="xs:text-lg text-xl  text-center p-4 bg-slate-400"> First transaction {first}</h1>
        <h1 className="text-xl xs:text-lg text-center p-4 bg-slate-400"> Second transaction {second}</h1>
      </div>
    )
    }
    if(load==2){
      return (
        <h1 className="text-xl border-2 border-black text-center p-4 bg-slate-400">{lastData} claimed</h1>
      )
    }else if(load==1){
      return (
        <div className="bg-slat-400 border-2 border-black">
        <h1 className="text-xl xs:text-lg  text-center p-4 bg-slate-400">Wait for a minute......</h1>
        {
          tcprocess()
        }
        </div>
      )
    }

    return (
      <div className="xs:scale-150 md:scale-150  xs:mx-2 border-4 text-gray-700 flex justify-center font-mono align-center text-lg border-green-500 rounded-lg bg-gray-100">
        <form action="" method="post" className="text-xl" onSubmit={submit}>
          <div>
            <h1 className=" xs:scale-75 xs:w-2/4 xs:p-1 xs:text-lg text-center border-2  p-4 w-1/3  border-black m-auto mt-2">
              Location:{" "}
            </h1>
            <div className="text-center">
              <h1 className="xs:scale-50 xs:p-1 inline-block border-2 border-black p-4 mt-2 ">
                lat: {lat}
              </h1>
              <h1 className=" xs:scale-50 xs:p-1  inline-block border-2 border-black p-4 mt-2 ">
                long: {long}
              </h1>
            </div>
          </div>
          <div className="xs:scale-75 md:scale-110 xs:p-1  text-center border-2 border-black w-3/5 p-4 m-auto mt-2">
            <label htmlFor="time">Enter the date and time: </label>
            <input
              type="datetime-local"
              id="time"
              name="time"
              className="xs:scale-50 md:scale-75 md:-translate-x-9 xs:-translate-x-14 border-2 border-black"
              required
              onChange={(e) => {
                let dateTime = e.target.value;
                console.log(dateTime);
                // const maturityTimestamp = Math.floor(new Date(nDate).getTime() / 1000);
                console.log(new Date(dateTime).getTime()/1000);
                setCurrent(new Date(dateTime).getTime()/1000)
                let arr = dateTime.split("T");
                setDate(arr[0]);
                console.log(arr[0]);
                let narr = arr[1].split(":");
                setTime(narr[0]);
                console.log(narr[0]);
              }}
            ></input>
          </div>

          <button
            type="submit"
            className="xs:p-0 md:text-2xl border-2 text-xl border-black mt-2 block w-1/3 p-2 m-auto mb-2  text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg  px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  function Process(){
    return(
      <div className="w-1/2 border-2 border-black  text-blue-900">
        <div className="w-4/5 m-auto text-center">
        <p className="inline-block border border-blue-900 rounded-full h-5 w-5 text-center text-xs">1</p>
        <div className="h-1 bg-blue-900 w-1/4 inline-block mb-0.5"></div>
        <p className="inline-block border border-blue-900 rounded-full h-5 w-5 text-center text-xs">2</p>
        <div className="h-1 bg-blue-900 w-1/4 inline-block mb-0.5"></div>
        <p className="inline-block border border-blue-900 rounded-full h-5 w-5 text-center text-xs">3</p>
        <div className="h-1 bg-blue-900 w-1/4 inline-block mb-0.5"></div>
        <p className="inline-block border border-blue-900 rounded-full h-5 w-5 text-center text-xs">4</p>
        </div>
        <div className="w-3/4 text-xs flex justify-between m-auto">
        <p>Initializing</p>
        <p>First Transaction</p>
        <p>Second Transaction</p>
        <p>Complete</p>
        </div>
        <p className="text-black text-center text-xl p-8">Transaction Processing</p>
        <button className="block w-1/3 bg-blue-600 text-white m-auto p-2 rounded-lg">Close</button>
      </div>
    )
  }
}
