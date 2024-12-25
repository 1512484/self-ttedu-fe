import { useEffect, useState } from "react";

const CategorySelect = ({
    cateList,
    activeCate,
    setActiveCate,
    isCollapsed,
    setCollapsed,
    isTab = false
}) => {
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (!activeCate || !cateList?.length) return;

        let activeIndex = cateList.findIndex(cate => cate.id === activeCate.id);

        setTabIndex(activeIndex);
    }, [activeCate, cateList]);

    return (
        <>
            <div className="cate-list d-none d-md-flex flex-column">
                {
                    isTab &&
                    <div
                        className="tab-bg"
                        key={-1}
                        style={{
                            width: `calc((100% - 16px) / ${cateList?.length || 1})`,
                            left: `calc((100% - 16px) * ${tabIndex} / ${cateList?.length || 1} + 8px)`
                        }}
                    ></div>
                }
                {
                    cateList?.map?.(cate => (
                        <div
                            className={`cate-item ${cate.id === activeCate?.id ? 'active' : ''}`}
                            key={cate.id}
                            onClick={() => setActiveCate(cate)}
                            style={{
                                width: isTab ? `calc((100% - 16px) / ${cateList?.length || 1})` : "100%"
                            }}
                        >
                            <span className="cate-title">{cate.title}</span>
                            {
                                !isTab &&
                                <img
                                    width={20}
                                    height={20}
                                    src="/assets/img/home/caret-right.png"
                                    title="Caret Right Icon"
                                    alt="Caret Right Icon"
                                />
                            }
                        </div>
                    ))
                }
            </div>
            <div
                className={`cate-collapse d-block d-md-none ${isCollapsed ? 'collapsed' : ''}`}
                onClick={() => setCollapsed(!isCollapsed)}
            >
                <div className="cate-collapse-top">
                    <span className="cate-collapse-active">{activeCate?.title}</span>
                    <img
                        width={20}
                        height={20}
                        src="/assets/img/home/caret-right.png"
                        title="Caret Right Icon"
                        alt="Caret Right Icon"
                        className="caret"
                    />
                </div>
                <div className="cate-collapse-content">
                    {
                        cateList?.filter?.(cate => cate.id !== activeCate?.id)?.map(cate => (
                            <div
                                className="cate-collapse-item"
                                key={cate.id}
                                onClick={() => setActiveCate(cate)}
                            >
                                {cate.title}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CategorySelect;