import React, { useContext, useEffect } from 'react'
import { GeneralLayout } from "../../layouts";
import { v4 as uuidv4 } from 'uuid';
import { BinTypes } from '../binMap/NewBinModal';
import { UserContext } from '../../provider/UserProvider';

function BinList(): JSX.Element {
  const { binList, setBinList } = useContext(UserContext)

  useEffect(() => {
    document.body.classList.add("bg-gray-100");
    getList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(binList);
  }, [binList]);

  function getList() {
    setBinList(JSON.parse(localStorage.getItem("bin-list") as string) as BinTypes[]);
  }

  return (
    <GeneralLayout title={"Bins List"} subTitle={"Watch details about bins."}>
      <div className="flex flex-wrap w-full">
        {
          binList.map((bin) =>
            <div
              key={uuidv4()}
              className="w-full sm:w-1/2 flex p-3"
            >
              <div className="flex flex-col flex-1 shadow rounded p-3 bg-white">
                <div className="flex my-1">
                  <span className="w-16 text-gray-700">
                    ID :
                  </span>
                  <span className="font-bold">{bin.binId}</span>
                </div>

                <div className="flex flex-col my-1">
                  <span>Bin Size</span>
                  <div className="flex">
                    <div className="w-1/3">
                      <span className="w-16 text-gray-700">Width : </span>
                      <span className="font-bold">{bin.width}</span>
                    </div>
                    <div className="w-1/3">
                      <span className="w-16 text-gray-700">Height : </span>
                      <span className="font-bold">{bin.height}</span>
                    </div>
                    <div className="w-1/3">
                      <span className="w-16 text-gray-700">Length : </span>
                      <span className="font-bold">{bin.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col my-1">
                  <span>Location</span>
                  <div className="flex">
                    <div className="w-1/2">
                      <span className="w-16 text-gray-700">Lat : </span>
                      <span className="font-bold">{bin.lat}</span>
                    </div>
                    <div className="w-1/2">
                      <span className="w-16 text-gray-700">Lng : </span>
                      <span className="font-bold">{bin.lng}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )
        }
      </div>
    </GeneralLayout >
  )
}

export default BinList
