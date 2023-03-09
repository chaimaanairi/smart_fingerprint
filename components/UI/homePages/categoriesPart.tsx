

/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { data } from './categoriesData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function CategoriesPart() {

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    if (slider) slider.scrollLeft = slider.scrollLeft - 500;

  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    if (slider) slider.scrollLeft = slider.scrollLeft + 500;
  };

    return (
<div id="categoriesPart" className='m-5 rounded-3xl mt-10 mb-10 py-10 bg-Lightorange'>
    
    <h1 className='mb-10 text-4xl font-bold text-center text-black'>Categories</h1>

    <div className=' flex items-center'>
    <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
    <div
        id='slider'
        className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
    >
        {data.map((item) => (
        <div className=" bg-orangeHover mx-1 rounded-3xl inline-block p-2 cursor-pointer ease-in-out duration-300 hover:scale-105">
        <img
            className='w-[220px] rounded-3xl h-[220px] object-cover'
            src={item.img}
            alt='img'
        />
        <p className='text-center font-bold my-1'>{item.text}</p>
        </div>
        ))}
    </div>
    <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
    </div>
</div>
    );
}

export default CategoriesPart;


