import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import Script from "next/script";

const SocialMediaShare = (props: {
  title: string;
  share_title: string;
  link: string;
}) => {
  return (
    <div className="my-4">
      <div className="text-lg font-normal mb-2">{props.title}</div>
      <div className="addthis_inline_share_toolbox_2be3"></div>
      {/* <div className="flex flex-row items-center gap-3 w-full">
        <FacebookShareButton
          url={props.link}
          title={props.share_title}
          quote={props.share_title}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton url={props.link} title={props.share_title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={props.link} title={props.share_title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton url={props.link} title={props.share_title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <PinterestShareButton
          media="networkLink"
          url={props.link}
          title={props.share_title}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <RedditShareButton url={props.link} title={props.share_title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div> */}
      <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c2f2b40e52f15d7"
      />
    </div>
  );
};

export default SocialMediaShare;
