import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import Skeleton from "react-loading-skeleton";





function Cardloader() {
    

    return (
        <div>
           <ul className="list" >
          {Array(9)
            .fill({ start : 0 , end : 100})
            .map((item, index) => (
              <li className="card" key={index} style={{padding:'20px'}}>
                {/* <Skeleton height={180} /> */}
                <h4 className="card-title">
                {/* <Skeleton circle={true} height={50} width={50} />   */}
                  <Skeleton height={20} width={`50%`} />
                </h4>
                <p className="card-channel" style={{textAlign:'center'}}>
                  <Skeleton width={`60%`} height={20} />
                </p>
                <h4 className="card-title">
                {/* <Skeleton circle={true} height={50} width={50} />   */}
                  <Skeleton height={20} width={`50%`} />
                </h4>
                <div className="card-metrics" >
                  <Skeleton width={`100%` } height={30} />
                </div>
              </li>
            ))}
        </ul>
        </div>
    )
}

export default Cardloader
