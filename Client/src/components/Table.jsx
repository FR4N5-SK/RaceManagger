export default function Table({data, titles}) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="w-full py-2">
          <div>
            <table className="w-full overflow-x-visible text-center text-sm font-light border border-gray-300">
              <thead className="border-b bg-azul-cielo bg-opacity-75 text-white font-medium">
                <tr className="border-b border-gray-300">
                  {titles.map((item, key) => (
                    <th key={key} scope="col" className=" px-6 py-4">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => (
                  <tr className="border-b border-gray-300 text-xs lg:text-sm">
                    <td
                      key={key}
                      className="whitespace-nowrap  px-6 py-4 font-medium"
                    >
                      {item.consumptionTime}
                    </td>
                    <td
                      key={key}
                      className="whitespace-nowrap  px-6 py-4 font-medium"
                    >
                      {item.mealName}
                    </td>
                    <td
                      key={key}
                      className="whitespace-nowrap  px-6 py-4 font-medium"
                    >
                      ${item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}