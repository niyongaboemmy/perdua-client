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
      <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c2f2b40e52f15d7"
      />
    </div>
  );
};

export default SocialMediaShare;
