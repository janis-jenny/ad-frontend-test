import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-700 py-16">
      <div className="flex justify-center">
        <Link href="/">
          <Image 
            src="/images/apply-digital-logo.png" 
            alt="Apply Digital" 
            width={170} 
            height={44} 
            priority={false}
          />
        </Link>
      </div>
    </footer>
  );
}