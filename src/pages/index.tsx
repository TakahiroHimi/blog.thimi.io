import { css } from '@emotion/react'
import Header from 'components/layouts/Header'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import colors from 'styles/colors'
import { getSortedPostsData } from '../lib/posts'

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string
    created: string
    updated: string
    title: string
    visual: string
    tags: string[]
  }[]
}) {
  return (
    <React.Fragment>
      <Head>
        <title>blog.thimi.io</title>
      </Head>
      <Header />
      <main css={container}>
        <section>
          <ul>
            {allPostsData.map(({ id, created, title }) => (
              <li key={id} css={listItem}>
                <p css={createdAt}>{created}</p>
                <Link href={`/posts/${id}`}>
                  <a css={titleText}>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <nav></nav>
      </main>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

const container = css`
  margin: 32px auto 64px;
  width: 90%;
  max-width: 960px;
`

const listItem = css`
  margin-bottom: 32px;
`

const createdAt = css`
  font-size: 18px;
  color: ${colors.gray200};
  margin-bottom: 8px;
`

const titleText = css`
  font-size: 24px;
  color: ${colors.blue400};
  text-decoration: none;
  cursor: pointer;
`
