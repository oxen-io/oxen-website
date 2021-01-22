import React from 'react';
// import OxenLogo from '../../assets/svgs/brand.svg';
// import EmailLogoSVG from '../../assets/svgs/hot.svg';
import { ModalInstance } from '../../state/navigation';
import { Button } from '../Button';
import { Modal } from '../Modal';

interface Props {
  isOpen: boolean;
  close?: () => void;
}

export function LoginModal(props: Props) {
  return (
    <Modal modalId={ModalInstance.LOGIN} {...props}>
      <div className="">
        <div className="flex flex-col items-center space-y-6 mb-32">
          {/* <OxenLogo className="fill-current h-6" /> */}

          <h1 className="font-roboto text-threexl mb-2">Hello!</h1>

          <Button
            type="outline"
            color="secondary"
            // prefix={<EmailLogoSVG className="h-6 w-8" />}
            suffix={<div className="w-6"></div>}
            onClick={() => alert('sdf')}
          >
            Continue with email
          </Button>
        </div>

        <div>
          By proceeding, you agree to our{' '}
          <a href="#" className="underline font-semibold">
            Terms of Use
          </a>
        </div>
      </div>
    </Modal>
  );
}
