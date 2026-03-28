import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center flex flex-col items-center gap-4">
        <Image src="/images/RupexaLogo.jpeg" alt="Rupexa Logo" width={80} height={80} className="mx-auto mb-2" />
        <p className="font-bold text-lg">Rupexa Private Limited</p>
        <p>Block No.101/102, Shriram Tower Next To NIT Kingsway Civil Lines, Sadar, Nagpur, Maharashtra 440001</p>
        <p>Contact No: <a href="tel:+919067488273" className="underline">+91 9067488273</a></p>
        <p>Email: <a href="mailto:care@rupexa.in" className="underline">care@rupexa.in</a>, <a href="mailto:info@rupexa.in" className="underline">info@rupexa.in</a></p>
        <div>
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a>
        </div>
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Rupexa Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;