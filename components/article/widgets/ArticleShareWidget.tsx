import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import ShareSVG from '../../../assets/svgs/share.svg';
import {
  shareToFacebook,
  shareToReddit,
  shareToTwitter,
  shareToWhatsApp,
} from '../../../utils/share';
import { Button } from '../../Button';
import { Dropdown } from '../../Dropdown';
import { DropdownItem } from '../../DropdownItem';
import { Input } from '../../Input';
import { InputGroup } from '../../InputGroup';

interface IShareDropdownItems {
  id: string;
  name: string;
  onClick: () => void;
}

interface Props {
  id: string;
  title: string;
  slug: string;
}

export function ArticleShareWidget(props: Props) {
  const { id, title, slug } = props;

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const articleUrl = `oxen.io${router.asPath}`;

  const dropdownItems: Array<IShareDropdownItems> = [
    {
      id: 'share-to-facebook',
      name: 'Facebook',
      onClick: () => shareToFacebook(title, slug),
    },
    {
      id: 'share-to-twitter',
      name: 'Twitter',
      onClick: () => shareToTwitter(title, slug),
    },
    {
      id: 'share-to-whatsapp',
      name: 'WhatsApp',
      onClick: () => shareToWhatsApp(title, slug),
    },
    {
      id: 'share-to-reddit',
      name: 'Reddit',
      onClick: () => shareToReddit(title, slug),
    },
  ];

  return (
    <div className="flex justify-center w-full z-10">
      <div
        style={{ width: 'fit-content' }}
        className="flex bg-soft cursor-pointer rounded-md text-primary my-4"
      >
        <div
          className="flex flex-1 items-center cursor-pointer px-2 py-1 space-x-1 hover:bg-subtle-2 font-medium rounded-r-md"
          onClick={() => setIsDropdownOpen(true)}
        >
          {/* <ShareSVG className="h-8" /> */}
          <span>Share</span>
        </div>

        <Dropdown
          isOpen={isDropdownOpen}
          onClickAway={() => setIsDropdownOpen(false)}
          pull="center"
          offsetX={-50}
          offsetY={25}
        >
          <>
            <div className="px-3 pt-1 pb-2">
              <InputGroup className="w-full rounded-sm bg-secondary bg-opacity-25">
                <Input
                  style={{ minWidth: '9rem' }}
                  border="none"
                  readonly
                  value={articleUrl}
                />

                <Button type="text" size="small" color="primary">
                  COPY
                </Button>
              </InputGroup>
            </div>

            {dropdownItems.map(item => (
              <DropdownItem key={item.id} id={item.id} onSelect={item.onClick}>
                <div className="w-full text-center">{item.name}</div>
              </DropdownItem>
            ))}
          </>
        </Dropdown>
      </div>
    </div>
  );
}
