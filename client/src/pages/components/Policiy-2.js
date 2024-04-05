import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Form from "./Form";

export default function Policy2({account,webApi}) {
    console.log(account+"sdfaf")
    return (
      <>
        <div className="w-5/6 m-auto">
          <p className="md:mt-2 md:text-4xl xs:text-base text-center text-2xl text-orange-900 mt-4 font-bold">2nd POLICY (6 MONTHS)</p>
          <div className="xs:flex-col md:flex-col flex justify-between mt-5">
            <div className="md:w-11/12 md:ml-4 md:mt-5 xs:scale-50 -ml-6 w-2/5 xs:text-2xl inline-block"> 
              <p className="xs:text-2xl md:text-3xl text-center text-xl font-bold p-1 text-stone-600 ml-10">Policy view</p>
              <table className="md:text-xl text-lg">
                <thead>
                  <tr className="bg-blue-100 ">
                    <th className="w-2/5 border-2 border-black p-4">Months</th>
                    <th className="w-2/5 p-4 border-2 border-black text-base">
                      EMI (monthly) (in INRT) (per month) 
                    </th>
                    <th className="w-2/5 p-4 border-2 border-black ">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-800">
                  <tr>
                    <td className="border-2 border-black w-2/5 p-4">1st month</td>
                    <td className="border-2 border-black w-2/5 p-4">9000</td>
                    <td className="border-2 border-black w-2/5 p-4">[1day-30day]</td>
                  </tr>
                  <tr className="bg-neutral-300">
                    <td className="border-2 border-black w-2/5 p-4">2nd month</td>
                    <td className="border-2 border-black w-2/5 p-4">9000</td>
                    <td className="border-2 border-black w-2/5 p-4">[31day-60day]</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black w-2/5 p-4">3rd month</td>
                    <td className="border-2 border-black w-2/5 p-4">9000</td>
                    <td className="border-2 border-black w-2/5 p-4">[61day-90day]</td>
                  </tr>
                  <tr className="bg-neutral-300">
                    <td className="border-2 border-black w-2/5 p-4">4th month</td>
                    <td className="border-2 border-black w-2/5 p-4">9000</td>
                    <td className="border-2 border-black w-2/5 p-4">[91day-120day]</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black w-2/5 p-4">5th month</td>
                    <td className="border-2 border-black w-2/5 p-4">9000</td>
                    <td className="border-2 border-black w-2/5 p-4">[121day-150day]</td>
                  </tr>
                  <tr className="bg-neutral-300">
                    <td className="border-2 border-black w-2/5 p-4">6th month</td>
                    <td className="border-2 border-black w-2/5 p-4">9000</td>
                    <td className="border-2 border-black w-2/5 p-4">[151day-180day]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="md:w-11/12 md:ml-4 md:mt-5 xs:scale-50 mr-10 w-2/5 xs:text-2xl inline-block">
              <p className="md:mt-2 md:text-3xl xs:text-2xl text-center text-xl font-bold p-1 text-stone-600 ml-16">
                Claim Settlement
              </p>
              <table className="md:text-xl text-lg w-full">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="w-2/5 p-4 border-2 border-black ">
                      Windspeed (per hour)
                    </th>
                    <th className="w-2/5 p-4 border-2 border-black ">
                      Rainfall (in mm)
                    </th>
                    <th className="w-2/5 p-4 border-2 border-black ">
                      Status (in INRT)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-800">
                  <tr>
                    <td className="border-2 border-black w-2/5 p-4">Less than 45km</td>
                    <td className="border-2 border-black w-2/5 p-4">
                      Less than 300-400 mm
                    </td>
                    <td className="border-2 border-black w-2/5 p-4">NULL</td>
                  </tr>
                  <tr className="bg-neutral-300">
                    <td className="border-2 border-black w-2/5 p-4">46km-87km </td>
                    <td className="border-2 border-black w-2/5 p-4">401mm-500mm</td>
                    <td className="border-2 border-black w-2/5 p-4">108000</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black w-2/5 p-4">88km-102km</td>
                    <td className="border-2 border-black w-2/5 p-4">501mm-600mm </td>
                    <td className="border-2 border-black w-2/5 p-4">121500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Popup
          trigger={
            <button className="text-lg p-4 border-2 border-black w-full block m-auto my-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mt-10 mb-10">
              Register
            </button>
          } 
          modal nested
        >{
            close=>(<Form account={account} webApi={webApi} months={6}/>)
        }

        </Popup>
        </div>
      </>
    );
  }