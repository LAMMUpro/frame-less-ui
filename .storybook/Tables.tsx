import TableInfo from './TableInfo';
import { tableInfoList } from '../src/utils/storybook';

export default function TablesInfo({ meta }): React.ReactElement {
  return (
    <>
      <h2 className="css-jy82ux">组件文档</h2>
      <section className="tables">
        {
          tableInfoList
            .filter(info=> meta.tableInfo[info.name]?.length)
            .map((info, index) => 
              <TableInfo 
                key={index}
                setting={info}
                list={meta.tableInfo[info.name]}
              ></TableInfo>
            )
        }
      </section>
    </>
  )
}