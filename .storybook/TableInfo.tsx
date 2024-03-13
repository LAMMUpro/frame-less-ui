

export default function TableInfo({ list, setting }): React.ReactElement {
  return (
    <>
      <h3>{ setting.nameCh }</h3>
      <table style={{
        width: '100%'
      }}>
        <thead>
          <tr>
            {
              setting.columns?.map(column => 
                <th><span>{ column.name }</span></th>
              )
            }     
          </tr>
        </thead>
        <tbody>
          {
            list.map(item => 
              <tr>
                {
                  setting.columns?.map(column => 
                    <td><span>{item[column.key]}</span></td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}