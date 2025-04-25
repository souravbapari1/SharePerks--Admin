import React from "react";
import { data } from "./data";

function page() {
  const formate = data.map((e) => {
    return Object.keys(e);
  });
  return (
    <div>
      <table className="table-auto w-full">
        <thead className="text-left">
          <tr className="border-b border-strokedark">
            {formate[0].map((e) => {
              return <th>{e}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr key={d.sku} className="border-b border-strokedark">
                {formate[0].map((e) => {
                  return <td>{`${d[e]}`}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default page;
