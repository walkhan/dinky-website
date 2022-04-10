import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useIsBrowser from '@docusaurus/useIsBrowser';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <span style={{ fontSize: '16px' }}>
          一站式 FlinkSQL & SQL DataOps <br />
          基于 Apache Flink 二次开发，无侵入，开箱即用<br />
          实时即未来，批流为一体<br /><br />
        </span>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{ borderRadius: '2rem', border: '1px solid #42b983' }}
            to="https://github.com/DataLinkDC/dlink">
            GitHub
          </Link>
          &nbsp;&nbsp;
          <Link
            className="button button--secondary button--lg"
            style={{ borderRadius: '2rem', border: '1px solid #42b983' }}
            to="https://gitee.com/mirrors/Dlink">
            Gitee
          </Link>
          &nbsp;&nbsp;
          <Link
            className="button button--secondary button--lg"
            style={{ backgroundColor: '#42b983', borderRadius: '2rem', border: '1px solid #42b983' }}
            to="/docs/intro">
            Quick Start
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const isBrowser = useIsBrowser();
  const {siteConfig} = useDocusaurusContext();

  const pathname = isBrowser && location.pathname

  useEffect(() => {
    if (isBrowser) {
      const nav = document.getElementsByTagName('nav')[0];
      const classList = nav &&  nav.classList;
      if(!classList) return;
      if (pathname === '/' ) {
        classList.add('index-nav');
      } else {
        classList.remove('index-nav');
      }
    }
  }, [isBrowser, pathname])


  return (
    <Layout
      title={`${siteConfig.title}`}
      description="为 Apache Flink 而生，让 Flink SQL 纵享丝滑 <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
