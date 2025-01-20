import { createRoot } from 'react-dom/client'
import { createApp } from 'vue';
import Vue3App from './index.vue';
import '@/styles/demo.scss';
import '@/renderAsideNav.tsx';
import FlScroll from '../wrap.react';

/**
 * react实例
 */
function ReactApp() {
	return (
		<div>
      <FlScroll height="300px">
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint, quidem necessitatibus consequuntur dicta veniam iste aliquam voluptatum deserunt rerum aspernatur quas fugiat vel labore ex ea amet sunt autem!</div>
      </FlScroll>
		</div>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');