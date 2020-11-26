import React from "react";
import DetailCard from "../DetailCard/DetailCard";

export default function About() {

    return (
        <div className="card-container">
            <div className="card-holder">
                <h2>Welcome To Vegemon!</h2>
                <DetailCard>
                    <p>
                        This is app is designed to help you broaden your veggie horizons!

                        Log your veggie intake, challenge your friends, and watch you
                        and your community get stronger and healthier!

                        Having a whole foods, plant-based diet is key to living a
                        long and healthy life. Eating a diverse array of vegetables
                        gives you a nutrient-rich diet and promotes positive gut
                        health. Eating a largely plant-based diet also lowers your
                        chances of preventable illness.

                        To begin, log into your account and select 'Start a Challenge'. 
                        You can search for a friend, family member, or choose randomly from the VegIn community.
                        Each challenge will last for one week.  During this period, log each of the vegetables or fruit in your meals in the app.
                        To check your status, navigate to the home page to review your stats and see your current score.

                        How is the winner chosen?
                        At the end of the week-long challenge period the final points will be calculated and compared.  
                        Scoring is based on:

                        Unique Veggies/Fruits
                        Each unique plant will be worth 10 points.

                        Total Veggies/Fruits
                        Each plant will be worth 1 point each time logged, with a maximum of 3 points per plant.  This is to help promote diversity in your diet!

                        Consistency Bonus Multiplier
                        Did you have at least 3 plants for 12 or more meals? Thats a 3X bonus.
                        5 plants? 5X.
                        7 plants?!? That's right, 7X bonus.  
                        
                        Now get out there and eat some plants!!!

                        This application was developed by Chad Laflamme, Tiffany Brand,
                        Keith Tharp, Rachel Campbell, and Marc Langlois.

                        UNH Coding Bootcamp 2020
            </p>
                </DetailCard>
            </div>
        </div>
    )
}