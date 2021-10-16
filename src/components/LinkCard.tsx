/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import Link from 'next/link'
import React, { VFC } from 'react'
import breakPoints from 'styles/breakPoints'
import colors from 'styles/colors'

type Props = {
  href: string
  title: string
  desc: string
  src: string
  alt: string
  siteName: string
}

const LinkCard: VFC<Props> = ({ href, title, desc, src, alt, siteName }) => {
  return (
    <Link href={href}>
      <a css={link}>
        <div css={wrapper}>
          <div css={siteInfo}>
            <div css={linkTitle}>{title}</div>
            <div css={linkDesc}>{desc}</div>
            <div css={linkSiteName}>{siteName}</div>
          </div>

          <figure css={imageWrapper}>
            <img css={image} src={src ?? '/noImage.jpg'} alt={alt} />
          </figure>
        </div>
      </a>
    </Link>
  )
}

export default LinkCard

const link = css`
  text-decoration: none;
  cursor: pointer;
`

const wrapper = css`
  height: 120px;
  display: flex;
  justify-content: space-between;
  border: 2px solid ${colors.gray100};
  border-radius: 8px;
  color: ${colors.black80};
  padding: 8px;
  box-sizing: border-box;
  gap: 8px;
  background-color: ${colors.blue10};
  transition: 0.2s;

  &:hover {
    background-color: ${colors.blue100}66;
  }
`

const linkTitle = css`
  font-weight: 600;
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`

const linkDesc = css`
  font-size: 0.8rem;
  flex-grow: 1;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`

const siteInfo = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`

const linkSiteName = css`
  font-size: 0.8rem;
  color: ${colors.blue400};
`

const imageWrapper = css`
  flex-shrink: 0;
  width: 160px;

  @media screen and (max-width: ${breakPoints.lg}) {
    width: 120px;
  }
`

const image = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
