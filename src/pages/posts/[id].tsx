/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import Contents from 'components/AsideCards/Contents'
import ContentsLayout from 'components/layouts/ContentsLayout'
import CodeBlock from 'components/md/CodeBlock'
import ShareIcons from 'components/ShareIcons'
import Tag from 'components/Tag'
import 'github-markdown-css'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/src/ast-to-react'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'created' | 'updated' | 'title' | 'visual' | 'tags'> & {
  mdBody: string
}

const h2: HeadingComponent = ({ node, ...props }) => {
  return <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
}

const h3: HeadingComponent = ({ node, ...props }) => {
  return <h3 id={node.position?.start.line.toString()}>{props.children}</h3>
}

const Post: VFC<Props> = ({ title, created, updated, visual, tags, mdBody }) => {
  const router = useRouter()
  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:type" content="article" key="ogtype" />
        <meta property="og:description" content={mdBody.substring(0, 200)} key="ogdesc" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_OGP_URL}/${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fogp.owlcode.net%2Fimages%2F${visual}.png`}
          key="ogimage"
        />
        <title>{title}</title>
      </Head>
      <ContentsLayout
        asideCards={
          <>
            <Contents mdBody={mdBody} />
            <ShareIcons title={title} />
          </>
        }
        sticky
      >
        <div css={container}>
          <h1 css={articleTitle}>{title}</h1>
          <ul css={tagsContainer}>
            {tags.map((tag) => (
              <li key={tag}>
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
          <p css={date}>
            公開日：{created}
            {updated && `${'　　'}更新日：${updated}`}
          </p>
          <article className="markdown-body">
            <ReactMarkdown
              children={mdBody}
              components={{
                h2: h2,
                h3: h3,
                code: CodeBlock,
              }}
            />
          </article>
        </div>
      </ContentsLayout>
    </React.Fragment>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostIds = getAllPostIds()

  return {
    paths: allPostIds.map((postId) => {
      return {
        params: {
          id: postId,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined) return { notFound: true }
  const postData = await getPostData(params.id as string)
  return {
    props: {
      title: postData?.title ?? '',
      created: postData?.created ?? '',
      updated: postData?.updated ?? '',
      visual: postData?.visual ?? '',
      tags: postData?.tags ?? [],
      mdBody: postData?.mdBody ?? '',
    },
  }
}

const container = css`
  width: 100%;
  padding: 0px 28px 40px 0px;
  box-sizing: border-box;
`

const date = css`
  font-size: 1rem;
  color: ${colors.gray200};
  margin: 12px 0px 40px;
`

const articleTitle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 8px;
`

const tagsContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 8px;
  margin: 12px 0px 0px 0px;
`
