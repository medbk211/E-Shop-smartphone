import React from 'react'
import Aboutcomp from "../componnet/About";
import StatisticsCards from '../componnet/StatisticsCards';
import TeamCard from '../componnet/TeamCard'
import FeaturesSection from '../componnet/FeaturesSection';
export default function About() {
  return (
    <div>
     
      <Aboutcomp/>
      <StatisticsCards/>
      <TeamCard/>
      <FeaturesSection/>
    </div>
  )
}
