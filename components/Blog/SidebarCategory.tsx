import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SidebarCategory = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/categories/type?type=Blog`,
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
                setData(response.data);
            })
            .catch(err => console.error(err))
    }, [])

    return typeof data !== 'undefined' && data !== null ? (
        <div className="sidebar__widget mb-30">
            <div className="sidebar__widget-head mb-35">
                <h4 className="sidebar__widget-title">Danh mục</h4>
            </div>
            <div className="sidebar__widget-content">
                <div className="sidebar__category">
                    <ul>
                        {data && data.map((category: any) => (
                            <li key={uuidv4()}><Link href={`/category/${category.slug}`} legacyBehavior><a>{category.title}</a></Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    ) : null
};

export default SidebarCategory;