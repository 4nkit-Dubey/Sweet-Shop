import React from 'react'
import Title from '../components/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../components/NewLetterBox'

const About = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-b from-[#0c2025] via-[#0f2a31] to-[#141414] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 overflow-x-hidden gap-12 sm:gap-16'>
      <div className='w-full max-w-6xl mx-auto flex flex-col items-center'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-14'>
        <div className='w-full md:w-1/2 flex items-center justify-center'>
          <img
            src={about}
            alt="About Maa Vindhyavasini Sweets"
            className='w-full max-w-md lg:max-w-lg h-auto max-h-[460px] object-cover rounded-3xl border border-[#a5faf7]/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]'
          />
        </div>
        <div className='w-full md:w-1/2 flex flex-col gap-5 text-gray-300 text-sm sm:text-base leading-relaxed bg-[#0e272e]/40 p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#a5faf7]/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]'>
          <p className='text-gray-300 font-light leading-relaxed'>
            Welcome to <span className='text-white font-medium'>Maa Vindhyavasini Sweets</span>, where tradition meets uncompromised purity. Born out of a deep passion for authentic Indian confectionery, we take immense pride in crafting timeless recipes, rich flavours, and traditional sweets that bring warmth to every family celebration.
          </p>
          <p className='text-gray-300 font-light leading-relaxed'>
            Every sweet and savoury delicacy is handcrafted using 100% pure desi ghee, premium nuts, and hand-selected natural ingredients. We honor time-tested artisan techniques passed down through generations while strictly maintaining modern hygiene and food safety standards.
          </p>
          <p className='text-xl sm:text-2xl font-bold tracking-wide text-[#a5faf7] pt-2'>
            Our Mission
          </p>
          <p className='text-gray-300 font-light leading-relaxed'>
            Our mission is to bring the genuine taste and heritage of Indian sweets to every home. We strive to provide unparalleled freshness, authentic taste, and delightful customer service, ensuring that your every festival, celebration, and cherished moment is filled with pure sweetness.
          </p>
        </div>
      </div>

      <div className='w-full max-w-6xl mx-auto flex flex-col items-center mt-4 sm:mt-6'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full mt-8'>
          {/* 3box */}
          <div className='group flex flex-col gap-3 p-6 sm:p-8 rounded-2xl bg-[#0e272e]/40 border border-[#a5faf7]/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#a5faf7]/50 hover:shadow-[0_0_25px_rgba(165,250,247,0.15)]'>
            <b className='text-base sm:text-lg font-semibold tracking-wider text-blue-100 uppercase group-hover:text-[#a5faf7] transition-colors duration-300'>
              QUALITY ASSURANCE
            </b>
            <p className='text-gray-400 text-xs sm:text-sm leading-relaxed font-light'>
              We use 100% pure desi ghee, premium ingredients, and authentic recipes with zero artificial preservatives to guarantee unmatched purity and authentic flavor.
            </p>
          </div>

          <div className='group flex flex-col gap-3 p-6 sm:p-8 rounded-2xl bg-[#0e272e]/40 border border-[#a5faf7]/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#a5faf7]/50 hover:shadow-[0_0_25px_rgba(165,250,247,0.15)]'>
            <b className='text-base sm:text-lg font-semibold tracking-wider text-blue-100 uppercase group-hover:text-[#a5faf7] transition-colors duration-300'>
              FRESH & HYGIENIC PACKAGING
            </b>
            <p className='text-gray-400 text-xs sm:text-sm leading-relaxed font-light'>
              Prepared fresh daily and sealed in airtight, food-grade tamper-proof boxes so your sweets reach you in pristine, bakery-fresh condition every single time.
            </p>
          </div>

          <div className='group flex flex-col gap-3 p-6 sm:p-8 rounded-2xl bg-[#0e272e]/40 border border-[#a5faf7]/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#a5faf7]/50 hover:shadow-[0_0_25px_rgba(165,250,247,0.15)]'>
            <b className='text-base sm:text-lg font-semibold tracking-wider text-blue-100 uppercase group-hover:text-[#a5faf7] transition-colors duration-300'>
              CUSTOMER DELIGHT & CARE
            </b>
            <p className='text-gray-400 text-xs sm:text-sm leading-relaxed font-light'>
              Whether it's festive gift hampers, customized wedding boxes, or bulk orders, our customer support team is always dedicated to making your celebrations seamless.
            </p>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default About
