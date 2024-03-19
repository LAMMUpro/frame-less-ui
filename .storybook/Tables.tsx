import TableInfo from './TableInfo.tsx';
import { tableInfoList } from '../src/utils/storybook.ts';

export default function TablesInfo({ meta }): React.ReactElement {
  return (
    <>
      <h2 class="css-jy82ux">组件文档</h2>
      <section className="tables">
        {
          tableInfoList
            .filter(info=> meta.tableInfo[info.name]?.length)
            .map(info => 
              <TableInfo 
                setting={info}
                list={meta.tableInfo[info.name]}
              ></TableInfo>
            )
        }
      </section>
    </>
  )
}