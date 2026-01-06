import React from 'react'
import Header from '../../components/Header/Header'
import CategoryList from '../../components/CategoryList/CategoryList'
import BannerProduct from '../../components/BannerProduct/BannerProduct'
import HorizontalCardProduct from '../../components/HorizontalCardProduct/HorizontalCardProduct'
import VerticalCardProduct from '../../components/VerticalCardProduct/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Earphones"}/>


      <VerticalCardProduct category={"mobiles"} heading={"Best Selling Mobiles"}/>
      <VerticalCardProduct category={"camera"} heading={"Top Rated Cameras"}/>
      <VerticalCardProduct category={"watches"} heading={"Best Selling Watches"}/>
      <VerticalCardProduct category={"mouse"} heading={"Best Quality Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Best Rated Trimmers"}/>
      <VerticalCardProduct category={"speakers"} heading={"Best Quality Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refridgerator"} heading={"Best Selling Refridgerators"}/>
      <VerticalCardProduct category={"processor"} heading={"Best Selling Processors"}/>
      <VerticalCardProduct category={"printers"} heading={"Best Selling Printers"}/>

          </div>
  )
}

export default Home