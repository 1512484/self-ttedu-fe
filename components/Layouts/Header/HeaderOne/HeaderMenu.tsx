import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IMenu } from '../../../../interfaces/menu';

const HeaderMenu = () => {
    const [menus, setMenus] = useState([])
    const [childMenus, setChildMenus] = useState([])
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/menu/by-category?type=Header_Style_1`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => {
                setMenus(response.items.parentMenus);
                setChildMenus(response.items.childMenus);
            })
            .catch(err => console.error(err))
    }, [])

    return typeof menus.length !== 'undefined' ? (
        <>
            {menus.length && menus.length != 0 && (
                <ul>
                    {menus && menus.map( (menu: IMenu, index: number) => (
                    <li key={index} className={`${childMenus[menu.id] ? "menu-item-has-children" : ""}`}><Link href={menu.url ?? "#"} legacyBehavior><a>{menu.title}</a></Link>
                        {childMenus[menu.id] && (
                        <ul className="sub-menu">
                            {childMenus[menu.id].map( (childMenu: IMenu, childIndex: number) => (
                                (menu.id ==  childMenu.parent_id) && (
                                <li key={childIndex}><Link href={childMenu.url ?? "#"} legacyBehavior><a>{childMenu.title}</a></Link></li>
                                )
                            ))}
                        </ul>
                        )}
                    </li>
                     ))}
                </ul>
            )}
        </>
    ): null;
};

export default HeaderMenu;