import { componentNameList } from '../node_modules/.cache/data.js';

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
      {
        componentNameList.map(name => {
          const href = `${location.origin}/src/components/${name}/` + 'index.test.html';
          const isActive = pathname.includes(`/${name}/`);
          return (
          <span 
            href={href}
            style={{
              cursor: 'pointer',
              fontWeight: isActive ? 800: 400,
              fontSize: isActive ? '16px': '14px',
              color: isActive ? '#409EFF': '#67abf2',
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