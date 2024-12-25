import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const DropdownCategory = () => {

    const [data, setData] = useState([])
    const [lavelTwoCats, setLavelTwoCats] = useState([])

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/categories/type?type=Course`,
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
                setLavelTwoCats(response.data);
            })
            .catch(err => console.error(err))
    }, [])

    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            <nav>
                {data.length && (
                    <ul>
                        {data.map((cat, index: number) => (
                            <li key={`parent-${index}`} className="item-has-children"><Link href={cat.title ?? "/"} legacyBehavior><a>{cat.title}</a></Link>
                                {lavelTwoCats[cat.id] && lavelTwoCats[cat.id].length && (
                                    <ul className="category-submenu">
                                        {lavelTwoCats[cat.id].map((childCat, childIndex: number) => (
                                            <li key={childIndex}><Link href={childCat.title ?? "/"} legacyBehavior><a>{childCat.id}</a></Link></li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </>
    ) : null
};

export default DropdownCategory;