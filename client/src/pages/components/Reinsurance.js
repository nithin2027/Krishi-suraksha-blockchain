import { useState, useEffect } from "react";

export default function Reinsurance({ setSelect, webApi }) {
  const [allData, setAllData] = useState([]);
  const [account, setAccount] = useState("");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { signer, contract } = webApi;
    if (signer == null) {
      alert("Connect your wallet");
      setSelect(0);
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
      if(data.maturityDate.toNumber()<Math.floor(Date.now() / 1000))
      dataArray.push(data);
    }
    setAllData(dataArray);
    setLoad(false);
    console.log(dataArray);  
  }
  if(load){
    return (
      <h1 className="xs:text:3xl text-4xl  text-black p-6 text-center mt-20 border-2"> Wait for a minute.......</h1>
    )
  }

  if (allData.length!=0) {
    return (
      <div>
        {
            allData.map((data,i)=>{
                return <RePolicy key={i} data={data} webApi={webApi}/>
            })

        }
      </div>
    );
  }
  return (
    <div className=" xs:scale-75 xs:w-full w-2/3 m-auto">
      <h1 className="border-2 border-black text-4xl text-teal-950 bg-slate-300 text-center p-14 py-20">
        Sorry You have no mature policy
      </h1>
      <button
        className="xs:mt-2 w-full border-2 border-black m-auto block p-2  rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-xl"
        onClick={() => {
          setSelect(0);
        }}
      >
        Buy New Policy
      </button>
    </div>
  );
}

function RePolicy({ data,webApi }) {
    const date = new Date();
    const currentDate =
      date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    let month = date.getMonth() +data.periodTime.toNumber();
    let year = date.getFullYear();
    if (month > 12) {
      month = month - 12;
      year = year + 1;
    }
  
    const maturityDate = date.getDate() + "." + month + "." + year;
  
    async function submit() {
        const nDate = month + "." + date.getDate() + "." + year;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const maturityTimestamp = Math.floor(new Date(nDate).getTime() / 1000);
    
        const { signer, contract } = webApi;
        try {
          const transaction = await contract.insuranceRegister([
            data.userWalletAddress,
            currentTimestamp,
            maturityTimestamp,
            data.periodTime,
            data.areaOfLand,
            data.seedsData,
            data.seedQuantity,
            data.image,
            data.yourAddress,
            data.Amount,
            data.lat,
            data.long
          ]);
          await transaction.wait();
        } catch (e) {
          console.log(e)
          alert("Sorry some error occured, register again");
        }
      }


  return (
    <div className=" border-4 border-green-800 rounded-lg overflow-x-auto  bg-slate-200 p-2 shadow-2xl shadow-slate-700 h-auto w-2/3 my-10 m-auto">
        <div className="  border-2 rounded-lg  ">
          <div className=" flex justify-center font-mono text-xl text-slate-700 ">
            <h4 className="inline-block border-2 border-black p-2  w-1/3 ">
              Start Date: {currentDate}
            </h4>
            <h4 className="inline-block border-2 border-black p-2  w-1/3 ">
              Period of Time: {data.periodTime.toNumber()} months
            </h4>
            <h4 className="inline-block border-2 border-black p-2 w-1/3 ">
              Maturity Date: {maturityDate}
            </h4>
          </div>
          <div className=" flex justify-center font-mono text-xl text-slate-700 ">
            <h4 className="inline-block border-2 border-black p-2  w-1/3 ">
              Area of Land (in sq. feet): {data.areaOfLand.toNumber()}
            </h4>
            <h4 className="inline-block border-2 border-black p-2  w-1/3 ">
              Seeds Data: {data.seedsData}
            </h4>
            <h4 className="inline-block border-2 border-black p-2 w-1/3 ">
              Seeds QTY. (in quintal) (after production): {data.seedQuantity.toNumber()}
            </h4>
          </div>

          <div className="">
            <div className=" border-2 border-black w-full inline-block font-mono text-xl text-slate-700 p-2 ">
              <h3 className="">Address: {data.yourAddress}</h3>
            </div>
          </div>

          <button
            className="w-5/6 border-2 border-black m-auto block p-2 my-2 rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={submit}
          >
            Submit
          </button>
        </div>
    </div>
  );
}
