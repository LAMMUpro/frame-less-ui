import { createRoot } from 'react-dom/client'
import { componentNameList } from '../node_modules/.cache/data.js';
/** 实际用的时候需要还需要手动引入iconfont.css!!! */
import "@/assets/iconfont/iconfont.css";

/**
 * 测试页面的侧边栏
 */
export default function AsideNav() {
  const pathname = window.location.pathname;
	return (
		<div style={{
      display: 'flex',
      flexDirection: 'column',
      lineHeight: '1.8em',
      padding: '2em 6px'
    }}>
      <div>
        <span style={{
          fontWeight: 800,
          color: '#333',
        }}>组件列表：</span>
      </div>
      {
        componentNameList.map((name, index) => {
          const href = `${location.origin}/src/components/${name}/` + 'demo/index.html';
          const isActive = pathname.includes(`/${name}/`);
          return (
          <span 
            key={index}
            style={{
              cursor: 'pointer',
              fontWeight: isActive ? 800: 400,
              fontSize: isActive ? '18px': '16px',
              color: isActive ? '#409EFF': '#555',
            }}
            onClick={() => window.location.href = href}
          >
            {name}
          </span>
          )
        })
      }
		</div>
	);
}

const dom = document.getElementById('aside-nav');
if (dom) createRoot(dom).render(<AsideNav />);