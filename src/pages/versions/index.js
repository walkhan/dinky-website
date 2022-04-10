import React, { useState }  from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from "../versions/config.json";
import Layout from '@theme/Layout';
import './index.less';

export default function() {
    const isBrowser = useIsBrowser();

    const [p1Animation, setP1Animation] = useState(false);
    const [p2Animation, setP2Animation] = useState(false);

    const language = isBrowser && location.pathname.indexOf('/en/') === 0 ? 'en': 'zh-Hans';
    const dataSource = config?.[language];


    const getTableList = (dataSource) => {
        let list=null

        if(dataSource.table.size !== 0){

        }

        return list
    }


    return (
        <Layout>
            <div className="div-one"><br/>
                <h1>{dataSource.title}</h1>
                <h3>{dataSource.newVersion}</h3>
                <p>{dataSource.newVersionExplain}</p>
                <table>
                     {/* 此处只放最新版本  且需要更换下标值 */}

                    <tr>
                        <td>{dataSource.table.version[0].title}</td>
                        <td>
                            <a href={dataSource.table.version[0].link}>{dataSource.table.doc}</a>
                        </td>
                        <td>
                            <a href={dataSource.table.version[0].releaseUrl}>{dataSource.table.release}</a>
                        </td>
                        <td>
                            <a href={"https://github.com/DataLinkDC/dlink/archive/refs/tags/"+dataSource.table.version[0].title+".zip"}>{dataSource.table.source}</a>
                        </td>
                    </tr>
                </table>
                <br/>
                <h3>{dataSource.nextVersion}</h3>
                <p>{dataSource.nextVersionExplain}</p>
                <table>
                    <tr>
                        <td>Next</td>
                        <td>
                            <a href={dataSource.table.nextLink}>{dataSource.table.doc}</a>
                        </td>
                    </tr>
                </table>
                <br/>
                <h3>{dataSource.passVersion}</h3>
                <p>{dataSource.passVersionExplain}</p>
                <table>
                      {/* 每增加一个版本 需要在这里添加一组 tr  此处只放历史版本  且需要更换下标值 */}
                      <tr>
                        <td>{dataSource.table.version[1].title}</td>
                        <td>
                            <a href={dataSource.table.version[1].link}>{dataSource.table.doc}</a>
                        </td>
                        <td>
                            <a href={dataSource.table.version[1].releaseUrl}>{dataSource.table.release}</a>
                        </td>
                        <td>
                        <a href= {"https://github.com/DataLinkDC/dlink/archive/refs/tags/"+dataSource.table.version[1].title+".zip"}>{dataSource.table.source}</a>
                        </td>
                    </tr>
                </table>
            </div>
        </Layout>
    );
}