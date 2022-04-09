import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <span style={{fontSize:'16px'}}>
        一站式 FlinkSQL & SQL DataOps <br/>
        基于 Apache Flink 二次开发，无侵入，开箱即用<br/>
        实时即未来，批流为一体<br/><br/>
        </span>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{borderRadius: '2rem' , border: '1px solid #42b983'}}
            to="https://github.com/DataLinkDC/dlink">
            GitHub
          </Link>
          &nbsp;
          &nbsp;
          &nbsp;
          <Link
            className="button button--secondary button--lg"
            style={{borderRadius: '2rem' , border: '1px solid #42b983'}}
            to="https://gitee.com/mirrors/Dlink">
            Gitee
          </Link>
          &nbsp;
          &nbsp;
          <Link
            className="button button--secondary button--lg"
            style={{ backgroundColor:'#42b983', borderRadius: '2rem' , border: '1px solid #42b983'}}
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Dinky 为 Apache Flink 而生，让 Flink SQL 纵享丝滑 <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
