import { ct } from "../src/utils";


export default function TableInfo({ list, setting }): React.ReactElement {
  return (
    <>
      <h3>{ setting.nameCh }</h3>
      <table style={{
        width: '100%'
      }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            {
              setting.columns?.map(column => 
                <th><span className="_fs14_">{ column.name }</span></th>
              )
            }     
          </tr>
        </thead>
        <tbody className="fs14">
          {
            list.map(item => 
              <tr>
                {
                  setting.columns?.map(column => 
                    <td><span className={ct('_fs14_', {
                      required: setting.name === 'props' && column.key === 'name' && item.required,
                      highlight_default: item[column.key] && ['default'].includes(column.key),
                      highlight_name: item[column.key] && ['name'].includes(column.key),
                    })}>{item[column.key]}</span></td>
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