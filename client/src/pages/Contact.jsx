import React from 'react'
import NewLetterBox from '../components/NewLetterBox'
import contact from '../assets/contact.jpg'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-b from-[#0c2025] via-[#0f2a31] to-[#141414] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 overflow-x-hidden gap-12 sm:gap-16'>
      <div className='w-full max-w-6xl mx-auto flex flex-col items-center'>
        <Title text1={'CONTACT'} text2={'US'} />
        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-14 my-8'>
          <div className='w-full md:w-1/2 flex items-center justify-center'>
            <img
              src={contact}
              alt="Contact Maa Vindhyavasini Sweets"
              className='w-full max-w-md lg:max-w-lg h-auto max-h-[460px] object-cover rounded-3xl border border-[#a5faf7]/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]'
            />
          </div>
          <div className='w-full md:w-1/2 flex flex-col gap-6 text-gray-300 bg-[#0e272e]/40 p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#a5faf7]/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]'>
            <p className='text-xl sm:text-2xl font-bold tracking-wide text-blue-100 flex items-center gap-2'>
              Our Store
            </p>
            <div className='flex flex-col gap-1 text-gray-300 text-sm sm:text-base font-light'>
              <p>Main Market, Vindhyachal</p>
              <p>Mirzapur, Uttar Pradesh, India</p>
            </div>
            <div className='flex flex-col gap-1 text-gray-300 text-sm sm:text-base font-light'>
              <p>Tel: +91-9585774749</p>
              <p>Email: contact@sweets.com</p>
            </div>

            <div className='flex flex-col items-start gap-2 pt-2 border-t border-[#a5faf7]/15'>
              <p className='text-base sm:text-lg font-semibold tracking-wide text-[#a5faf7]'>
                Careers at Maa Vindhyavasini Sweets
              </p>
              <p className='text-gray-300 text-xs sm:text-sm font-light leading-relaxed'>
                Learn more about our teams and jobs openings.
              </p>
              <button className='mt-2 px-6 py-2.5 rounded-full border border-[#a5faf7]/40 bg-[#0c2025] text-[#a5faf7] text-xs sm:text-sm font-medium tracking-wide hover:bg-[#a5faf7] hover:text-[#08181c] hover:shadow-[0_0_20px_rgba(165,250,247,0.3)] transition-all duration-300 active:scale-95 cursor-pointer'>
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewLetterBox />
    </div>
  )
}

export default Contact
