import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import Audience from './components/Audience';
import Waitlist from './components/Waitlist';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('shopkeeper');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Audience />
      <Waitlist 
        email={email} 
        setEmail={setEmail} 
        phone={phone} 
        setPhone={setPhone}
        userType={userType}
        setUserType={setUserType}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;